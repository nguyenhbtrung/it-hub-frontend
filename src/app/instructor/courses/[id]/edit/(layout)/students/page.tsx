// app/courses/[id]/students/page.tsx
import React from 'react';
import { Box, Alert, AlertTitle, Typography, Divider, Button, Stack } from '@mui/material';
import { Warning as WarningIcon, Download as DownloadIcon } from '@mui/icons-material';
import RegistrationApproval from '@/components/instructor/course/edit/studentManagement/registrationApproval';
import StudentList from '@/components/instructor/course/edit/studentManagement/studentList';
import { ApiResponse, Registration, Student } from '@/components/instructor/course/edit/studentManagement/types';
import { getRegistrationsByCourseId, getStudentsByCourseId } from '@/services/course.service';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function ManageStudentsPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const courseId = resolvedParams.id;
  const page = parseInt(resolvedSearchParams.page || '1');
  const limit = parseInt(resolvedSearchParams.limit || '10');

  let studentsResponse: ApiResponse<Student> | null = null;
  let registrationsResponse: ApiResponse<Registration> | null = null;

  studentsResponse = await getStudentsByCourseId(courseId, { page, limit });
  registrationsResponse = await getRegistrationsByCourseId(courseId, { page: 1, limit: 100 });

  const students = studentsResponse?.data || [];
  const registrations = registrationsResponse?.data || [];
  const totalStudents = studentsResponse?.meta?.total || 0;

  const showWarning = true;

  return (
    <Box>
      {showWarning && (
        <Alert
          severity='warning'
          icon={<WarningIcon />}
          sx={{
            mb: 3,
            border: '1px solid',
            borderColor: 'warning.light',
            bgcolor: 'warning.lighter',
            color: 'warning.dark',
            '& .MuiAlert-icon': {
              color: 'warning.main',
            },
          }}
        >
          Khóa học chưa được xuất bản. Bạn không thể thêm học viên mới hoặc duyệt yêu cầu cho đến khi xuất bản.
        </Alert>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant='h4' fontWeight='bold' gutterBottom>
            Danh sách học viên
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Theo dõi tiến độ, tương tác và quản lý học viên trong khóa học này.
          </Typography>
        </Box>

        <Button
          variant='contained'
          startIcon={<DownloadIcon />}
          sx={{
            fontWeight: 'bold',
            px: 3,
            py: 1,
          }}
        >
          Xuất báo cáo
        </Button>
      </Stack>

      {/* Registration Approval Section */}
      <RegistrationApproval registrations={registrations} courseId={courseId} />

      <Divider sx={{ my: 3 }} />

      {/* Student List Section */}
      <StudentList students={students} total={totalStudents} page={page} limit={limit} courseId={courseId} />
    </Box>
  );
}
