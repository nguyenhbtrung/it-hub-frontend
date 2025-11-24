import { Box, Typography, Button } from '@mui/material';
import UserTable from '@/components/admin/users/userTable';
import { Suspense } from 'react';
import AddIcon from '@mui/icons-material/Add';

export default async function UserManagementPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={600} noWrap>
          Quản lý người dùng
        </Typography>
        <Button startIcon={<AddIcon />} variant='contained'>
          Thêm người dùng
        </Button>
      </Box>

      <Suspense>
        <UserTable />
      </Suspense>
    </Box>
  );
}
