import { Box, Container, Grid, Typography, Avatar, Stack, Button, Card } from '@mui/material';
import { Person, School, Edit, GitHub, LinkedIn, Public } from '@mui/icons-material';
import { ReactNode, Suspense } from 'react';
import ProfileTabs from '@/components/user/profile/profileTabs';
import ProfileSidebar from '@/components/user/profile/profileSidebar';

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <Container maxWidth='xl' sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 12 }, bgcolor: 'customBackground.4' }}>
      <Grid container spacing={3}>
        {/* Cột bên trái - Thông tin cá nhân */}
        <Suspense>
          <ProfileSidebar />
        </Suspense>

        {/* Cột bên phải - Nội dung chính */}
        <Grid size={{ xs: 12, lg: 8, xl: 9 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Tabs - Client Component */}
            <ProfileTabs />

            {/* Nội dung trang con */}
            {children}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
