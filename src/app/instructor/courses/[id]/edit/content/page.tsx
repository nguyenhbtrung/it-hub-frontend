import CourseContentPage from '@/components/instructor/course/edit/content/courseContentPage';
import { Suspense } from 'react';
import { Container, Box, Skeleton, Typography } from '@mui/material';

export default async function ContentPage() {
  return (
    <Suspense fallback={<ContentPageSkeleton />}>
      <CourseContentPage />
    </Suspense>
  );
}

function ContentPageSkeleton() {
  return (
    <Box>
      <Skeleton variant='rectangular' height={80} sx={{ mb: 2, borderRadius: 2 }} />
      <Skeleton variant='rectangular' height={200} sx={{ mb: 2, borderRadius: 2 }} />
      <Skeleton variant='rectangular' height={150} sx={{ borderRadius: 2 }} />
    </Box>
  );
}
