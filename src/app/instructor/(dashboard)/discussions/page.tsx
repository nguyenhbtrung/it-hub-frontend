import DiscussionHeader from '@/components/instructor/discussion/discussionHeader';
import DiscussionTable from '@/components/instructor/discussion/discussionTable';
import { Box, Container } from '@mui/material';

export default function DiscussionsPage() {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header Section */}
        <DiscussionHeader />

        {/* Discussion Table */}
        <Box sx={{ mt: 4 }}>
          <DiscussionTable />
        </Box>
      </Container>
    </Box>
  );
}
