import { Box, Typography, Button } from '@mui/material';
import { Suspense } from 'react';
import AddIcon from '@mui/icons-material/Add';
import InstructorRegistrationTable from '@/components/admin/users/instructorRegistrationTable';

export default async function IntructorRegistrationsPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={600} noWrap>
          Danh sách đơn đăng ký làm giảng viên
        </Typography>
      </Box>

      <Suspense>
        <InstructorRegistrationTable />
      </Suspense>
    </Box>
  );
}
