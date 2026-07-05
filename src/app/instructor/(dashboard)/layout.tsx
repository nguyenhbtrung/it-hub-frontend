import { Box } from '@mui/material';
import Sidebar from '@/components/instructor/common/sidebar';
import Header from '@/components/instructor/common/header';
import { getMyProfile } from '@/features/user';
import { Suspense } from 'react';

export default function InstructorDashboardLayout({ children }: { children: React.ReactNode }) {
  const profilePromise = getMyProfile();
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Suspense>
        <Sidebar profilePromise={profilePromise} />
      </Suspense>
      <Box
        sx={{ bgcolor: 'customBackground.4', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <Header profilePromise={profilePromise} />
        {children}
      </Box>
    </Box>
  );
}
