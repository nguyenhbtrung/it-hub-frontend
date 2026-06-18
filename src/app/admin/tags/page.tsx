import { Box } from '@mui/material';
import TagPageClient from './client';

export default async function TagManagementPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <TagPageClient />
    </Box>
  );
}
