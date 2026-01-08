// app/courses/[id]/students/components/RegistrationApproval.tsx
'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Button, Avatar, Stack, Alert, Collapse } from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { Registration } from '../types';
import { useNotification } from '@/contexts/notificationContext';
import { deleteEnrollment, updateEnrollment } from '@/services/enrollment.service';

interface RegistrationApprovalProps {
  registrations: Registration[];
  courseId: string;
}

export default function RegistrationApproval({ registrations, courseId }: RegistrationApprovalProps) {
  const [open, setOpen] = useState(true);
  const [pendingRegistrations, setPendingRegistrations] = useState(registrations);
  const { notify } = useNotification();

  const handleApprove = async (userId: string) => {
    try {
      const res = await updateEnrollment(courseId, userId, { status: 'active' });
      if (res?.success) {
        notify('success', 'Đã duyệt học viên', { vertical: 'top', horizontal: 'right' });
        setPendingRegistrations((prev) => prev.filter((reg) => reg.id !== userId));
      } else {
        notify('success', 'Duyệt học viên thất bại, vui lòng thử lại', { vertical: 'top', horizontal: 'right' });
      }
    } catch (error) {
      notify('success', 'Đã có lỗi xảy ra, vui lòng thử lại sau', { vertical: 'top', horizontal: 'right' });
    }
  };

  const handleReject = async (userId: string) => {
    try {
      const res = await deleteEnrollment(courseId, { userId });
      if (res?.success) {
        notify('success', 'Đã từ chối', { vertical: 'top', horizontal: 'right' });
        setPendingRegistrations((prev) => prev.filter((reg) => reg.id !== userId));
      } else {
        notify('success', 'Từ chối thất bại, vui lòng thử lại', { vertical: 'top', horizontal: 'right' });
      }
    } catch (error) {
      notify('success', 'Đã có lỗi xảy ra, vui lòng thử lại sau', { vertical: 'top', horizontal: 'right' });
    }
  };

  if (pendingRegistrations.length === 0) return null;

  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: 'warning.light',
        bgcolor: 'warning.lighter',
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ cursor: 'pointer' }}
          onClick={() => setOpen(!open)}
        >
          <Stack direction='row' alignItems='center' spacing={1}>
            <PersonAddIcon color='primary' />
            <Typography variant='h6' component='h3'>
              Duyệt học viên đăng ký
            </Typography>
            <Box
              sx={{
                bgcolor: 'error.light',
                color: 'error.contrastText',
                px: 1,
                py: 0.5,
                borderRadius: 20,
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}
            >
              {pendingRegistrations.length}
            </Box>
          </Stack>
          <IconButton size='small'>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
        </Stack>

        <Collapse in={open}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {pendingRegistrations.map((registration) => (
              <Card
                key={registration.id}
                variant='outlined'
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Avatar src={registration.avatar || undefined} sx={{ width: 40, height: 40 }}>
                    {registration.fullname.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant='body1' fontWeight='medium'>
                      {registration.fullname}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {registration.email} • Đăng ký: 2 giờ trước
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  <Button
                    variant='outlined'
                    color='error'
                    startIcon={<CloseIcon />}
                    onClick={() => handleReject(registration.id)}
                    fullWidth={true}
                    sx={{
                      borderColor: 'grey.400',
                      '&:hover': {
                        borderColor: 'error.main',
                        bgcolor: 'error.lighter',
                      },
                    }}
                  >
                    Từ chối
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<CheckIcon />}
                    onClick={() => handleApprove(registration.id)}
                    fullWidth={true}
                  >
                    Duyệt ngay
                  </Button>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  );
}
