import EditPostForm from '@/components/user/forum/editPost/form';
import EditPostHeader from '@/components/user/forum/editPost/header';
import { Box, Container } from '@mui/material';

export default function NewPostPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <EditPostHeader />
      <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: 'background.default' }}>
        <Container maxWidth='lg' sx={{ py: 4, px: { xs: 2, md: 4 } }}>
          <EditPostForm />
        </Container>
      </Box>
    </Box>
  );
}
