import { Box } from '@mui/material';
import CategoryPageClient from './client';

export default async function CategoryManagementPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <CategoryPageClient />
    </Box>
  );
}
