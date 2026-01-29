import ForumSidebarLeft from '@/components/user/forum/forumSidebarLeft';
import ForumSidebarRight from '@/components/user/forum/forumSidebarRight';
import { Box, Container, Grid } from '@mui/material';
import { Suspense } from 'react';

export default function ForumFeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ bgcolor: 'customBackground.4' }}>
      <Container maxWidth='xl' sx={{ py: 12 }}>
        <Box sx={{ px: 8 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: false, lg: 2.8 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Suspense>
                <ForumSidebarLeft />
              </Suspense>
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>{children}</Grid>

            <Grid size={{ xs: false, lg: 3 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <ForumSidebarRight />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
