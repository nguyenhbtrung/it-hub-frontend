'use client';

import { Box, Skeleton } from '@mui/material';
import CourseCardSkeleton from './courseCardSkeleton';

export function CourseListSkeleton() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </Box>

      <Box mt={2} display='flex' justifyContent='center'>
        <Skeleton variant='rounded' width={320} height={40} sx={{ borderRadius: 2 }} />
      </Box>
    </Box>
  );
}
