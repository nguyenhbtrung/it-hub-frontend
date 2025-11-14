import { Box } from '@mui/material';
import Navbar from '@/components/user/common/navbar';
import Footer from '@/components/user/common/Footer';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display='flex' flexDirection='column' minHeight='100vh'>
      <Navbar />
      <Box component='main' sx={{ flex: 1, mb: 6 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
