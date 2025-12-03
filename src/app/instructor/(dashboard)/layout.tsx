import { Box } from '@mui/material';
import Sidebar from '@/components/instructor/common/sidebar';
import Header from '@/components/instructor/common/header';

export default function InstructorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box
        sx={{ bgcolor: 'customBackground.4', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <Header />
        {children}
      </Box>
    </Box>
  );
}
