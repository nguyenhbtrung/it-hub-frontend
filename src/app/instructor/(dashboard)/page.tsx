import { Box, Typography, Button, Container } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import StatsCards from '@/components/instructor/dashboard/statsCard';
import GrowthChart from '@/components/instructor/dashboard/growthChart';
import RecentActivity from '@/components/instructor/dashboard/recentActivity';

export default function InstructorDashboard() {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Welcome Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 3, mb: 4 }}>
          <Box>
            <Typography variant='h4' sx={{ fontWeight: 700, mb: 1 }}>
              Chào mừng trở lại, John Doe!
            </Typography>
            <Typography color='text.secondary'>Đây là tổng quan nhanh về hoạt động của bạn.</Typography>
          </Box>
          <Button
            variant='contained'
            startIcon={<AddCircle />}
            sx={{
              height: 40,
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            Tạo khóa học mới
          </Button>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ mb: 4 }}>
          <StatsCards />
        </Box>

        {/* Charts and Activity */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr 1fr' },
            gap: 3,
          }}
        >
          <GrowthChart />
          <RecentActivity />
        </Box>
      </Container>
    </Box>
  );
}
