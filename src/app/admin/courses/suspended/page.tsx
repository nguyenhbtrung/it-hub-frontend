import { Box, Typography } from '@mui/material';
import { Suspense } from 'react';
import SuspendedCourseTable from '@/components/admin/courses/suspendedCourseTable';

export default function SuspendedCoursesPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={600} noWrap>
          Khoá học đã đình chỉ
        </Typography>
      </Box>

      <Suspense>
        <SuspendedCourseTable />
      </Suspense>
    </Box>
  );
}
