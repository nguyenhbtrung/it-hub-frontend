import { Box, Typography } from '@mui/material';
import { Suspense } from 'react';
import ActiveCourseTable from '@/components/admin/courses/activeCourseTable';

export default function IntructorRegistrationsPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={600} noWrap>
          Khoá học đang hoạt động
        </Typography>
      </Box>

      <Suspense>
        <ActiveCourseTable />
      </Suspense>
    </Box>
  );
}
