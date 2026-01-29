import { Box } from '@mui/material';
import UserPageClient from './userPageClient';

export default async function UserManagementPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <UserPageClient />
    </Box>
  );
}
