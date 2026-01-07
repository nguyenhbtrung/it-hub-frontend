import { Box, Typography, Button } from '@mui/material';
import { Suspense } from 'react';
import { CourseList, CourseListSkeleton } from './courseList';

interface RecommendedCoursesProps {
  id: string;
}

export default function RecommendedCourses({ id }: RecommendedCoursesProps) {
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
        <CourseList id={id} />
      </Suspense>
    </Box>
  );
}
