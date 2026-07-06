import { Box, Typography, Button, Container } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import GrowthChart from '@/components/instructor/dashboard/growthChart';
import { Suspense } from 'react';
import { StatsCards, StatsCardsSkeleton } from '@/components/instructor/dashboard/statsCards';
import { RecentActivity, RecentActivitySkeleton } from '@/components/instructor/dashboard/recentActivity';

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
          {/* <Button
            variant='contained'
            startIcon={<AddCircle />}
            sx={{
              height: 40,
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            Tạo khóa học mới
          </Button> */}
        </Box>

        {/* Stats Cards */}
        <Box sx={{ mb: 4 }}>
          <Suspense fallback={<StatsCardsSkeleton />}>
            <StatsCards />
          </Suspense>
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
          <Suspense fallback={<RecentActivitySkeleton />}>
            <RecentActivity />
          </Suspense>
        </Box>
      </Container>
    </Box>
  );
}
