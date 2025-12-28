import { Box, Typography, Button, Container } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import CourseTabs from '@/components/instructor/course/courseTabs';
import CourseList from '@/components/instructor/course/courseList';
import { Suspense } from 'react';

interface ManageCoursesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ManageCoursesPage({ searchParams }: ManageCoursesPageProps) {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 3 }}>
          <Box>
            <Typography variant='h4' sx={{ fontWeight: 700, mb: 1 }}>
              Quản lý Khóa học
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Xem, tạo mới, và quản lý tất cả các khóa học của bạn.
            </Typography>
          </Box>
          <Button
            variant='contained'
            startIcon={<AddCircle />}
            sx={{
              height: 40,
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            Thêm khóa học mới
          </Button>
        </Box>

        {/* Tabs */}
        <CourseTabs />

        {/* Course List */}
        <Suspense>
          <CourseList searchParams={searchParams} />
        </Suspense>
      </Container>
    </Box>
  );
}
