import { Box, Typography, Button } from '@mui/material';
import { Suspense } from 'react';
import { FeaturedCourseList, FeaturedCourseListSkeleton } from './FeaturedCourseList';

export default function FeaturedCourses() {
  return (
    <Box
      component='section'
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Header */}
      <Box textAlign='center' mb={8} px={2}>
        <Typography variant='h4' fontWeight={700} gutterBottom>
          Khóa học nổi bật
        </Typography>
        <Typography variant='body1' color='text.secondary' maxWidth='700px' mx='auto'>
          Khám phá các khóa học chất lượng cao được thiết kế riêng cho sinh viên công nghệ thông tin
        </Typography>
      </Box>

      {/* List */}
      <Suspense fallback={<FeaturedCourseListSkeleton />}>
        <FeaturedCourseList />
      </Suspense>

      {/* Footer button */}
      <Box textAlign='center' mt={10}>
        <Button variant='outlined' size='large'>
          Xem tất cả khóa học
        </Button>
      </Box>
    </Box>
  );
}
