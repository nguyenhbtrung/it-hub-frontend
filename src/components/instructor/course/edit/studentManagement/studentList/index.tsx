// app/courses/[id]/students/components/StudentList.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  IconButton,
  Stack,
  Typography,
  Avatar,
  LinearProgress,
  Pagination,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Chat as ChatIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Student } from '../types';
import AppPagination from '@/components/common/pagination';

interface StudentListProps {
  students: Student[];
  total: number;
  page: number;
  limit: number;
  courseId: string;
}

export default function StudentList({ students, total, page, limit }: StudentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [progressFilter, setProgressFilter] = useState('all');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleProgressFilterChange = (event: SelectChangeEvent) => {
    setProgressFilter(event.target.value);
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 90) return 'success';
    if (percent >= 50) return 'primary';
    return 'warning';
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (progressFilter === 'completed') return matchesSearch && student.progressPercent >= 90;
    if (progressFilter === 'in-progress')
      return matchesSearch && student.progressPercent >= 20 && student.progressPercent < 90;
    if (progressFilter === 'not-started') return matchesSearch && student.progressPercent < 20;

    return matchesSearch;
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <TextField
          placeholder='Tìm kiếm theo tên hoặc email...'
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: { xs: '100%', sm: 300 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='action' />
              </InputAdornment>
            ),
          }}
          size='small'
        />

        <Stack direction='row' spacing={1}>
          <FormControl size='small' sx={{ minWidth: 150 }}>
            <Select value={progressFilter} onChange={handleProgressFilterChange} displayEmpty>
              <MenuItem value='all'>Tất cả tiến độ</MenuItem>
              <MenuItem value='completed'>Hoàn thành</MenuItem>
              <MenuItem value='in-progress'>Đang học</MenuItem>
              <MenuItem value='not-started'>Chưa bắt đầu</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant='outlined'
            startIcon={<FilterListIcon />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                bgcolor: 'action.hover',
              },
            }}
          >
            Bộ lọc khác
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper} variant='outlined'>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Học viên</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Ngày tham gia</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Tiến độ</TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <TableCell>
                  <Stack direction='row' alignItems='center' spacing={2}>
                    <Avatar src={student.avatar || undefined} sx={{ width: 40, height: 40 }}>
                      {student.fullname.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant='body1' fontWeight='medium'>
                        {student.fullname}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {student.email}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{new Date(student.enrolledAt).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell>
                  <Box sx={{ width: 120 }}>
                    <Stack direction='row' justifyContent='space-between' mb={0.5}>
                      <Typography variant='caption' fontWeight='medium'>
                        {student.progressPercent}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant='determinate'
                      value={student.progressPercent}
                      color={getProgressColor(student.progressPercent) as any}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  <Stack direction='row' spacing={0.5} justifyContent='flex-end'>
                    <IconButton size='small' title='Gửi tin nhắn' sx={{ color: 'text.secondary' }}>
                      <ChatIcon fontSize='small' />
                    </IconButton>
                    <IconButton size='small' title='Xem chi tiết hồ sơ' sx={{ color: 'text.secondary' }}>
                      <VisibilityIcon fontSize='small' />
                    </IconButton>
                    <IconButton size='small' title='Cập nhật tiến độ' sx={{ color: 'text.secondary' }}>
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        spacing={2}
        mt={2}
        p={2}
        sx={{ borderTop: 1, borderColor: 'divider' }}
      >
        <Typography variant='body2' color='text.secondary'>
          Hiển thị <b>{(page - 1) * limit + 1}</b> đến <b>{Math.min(page * limit, total)}</b> của <b>{total}</b> kết quả
        </Typography>

        <AppPagination count={totalPages} page={page} />
      </Stack>
    </Box>
  );
}
