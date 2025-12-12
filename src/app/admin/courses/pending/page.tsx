import { Box, Typography } from '@mui/material';
import { Suspense } from 'react';
import PendingCourseTable from '@/components/admin/courses/pendingCourseTable';

export default function PendingCoursesPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={600} noWrap>
          Khoá học chờ duyệt
        </Typography>
      </Box>

      <Suspense>
        <PendingCourseTable />
      </Suspense>
    </Box>
  );
}
