import { Box, Typography, Button } from '@mui/material';
import { Suspense } from 'react';
import { CourseList, CourseListSkeleton } from './courseList';

export default function RecommendedCourses() {
  return (
    <Box
      component='section'
      sx={{
        pb: { xs: 4, md: 6 },
      }}
    >
      {/* Header */}
      <Box mb={2}>
        <Typography variant='h4' fontWeight={700} gutterBottom>
          Khoá học đề xuất cho bạn
        </Typography>
      </Box>

      {/* List */}
      <Suspense fallback={<CourseListSkeleton />}>
        <CourseList />
      </Suspense>
    </Box>
  );
}
