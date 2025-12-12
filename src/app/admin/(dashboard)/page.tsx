import { Box, Typography, Button, Paper } from '@mui/material';
import { Suspense } from 'react';
import TodayCard from '@/components/admin/dashboard/todayCard';
import Star from '@mui/icons-material/Star';
import CastForEducationOutlined from '@mui/icons-material/CastForEducationOutlined';
import ArticleOutlined from '@mui/icons-material/ArticleOutlined';
import MenuBookOutlined from '@mui/icons-material/MenuBookTwoTone';
import School from '@mui/icons-material/SchoolOutlined';
import DashboardStatCard from '@/components/common/dashboardStatCard';
import CourseEnrollmentTrendChart from '@/components/admin/dashboard/courseEnrollmentTrendChart';
import UserRegitrationTrendChart from '@/components/admin/dashboard/userRegitrationTrendChart';

const stats = [
  {
    title: 'Tổng số học viên',
    value: '12450',
    change: '+12% so với tháng trước',
    icon: (
      <Box sx={{ display: 'flex', bgcolor: '#eff6ff', borderRadius: 0.5, p: 0.5 }}>
        <School sx={{ color: '#137fec', fontSize: 24 }} />
      </Box>
    ),
    changeColor: 'success.main',
    // description: '+12% so với tháng trước',
  },
  {
    title: 'Tổng số khoá học',
    value: '345',
    change: '5 đang chờ phê duyệt',
    icon: (
      <Box sx={{ display: 'flex', bgcolor: '#fff7ed', borderRadius: 0.5, p: 0.5 }}>
        <MenuBookOutlined sx={{ color: '#f97316', fontSize: 24 }} />
      </Box>
    ),
    changeColor: 'error.main',
    // description: '5 đang chờ phê duyệt',
  },
  {
    title: 'Bài viết mới tháng này',
    value: '50',
    change: '+5 trong ngày hôm nay',
    icon: (
      <Box sx={{ display: 'flex', bgcolor: '#ecfdf5', borderRadius: 0.5, p: 0.5 }}>
        <ArticleOutlined sx={{ color: '#10b981', fontSize: 24 }} />
      </Box>
    ),
    changeColor: 'success.main',
    // description: '+15% tháng này',
  },
  {
    title: 'Giảng viên hoạt động',
    value: '89',
    change: '+0.1 so với tháng trước',
    icon: (
      <Box sx={{ display: 'flex', bgcolor: 'rgb(250 245 255)', borderRadius: 0.5, p: 0.5 }}>
        <CastForEducationOutlined sx={{ color: 'rgb(168 85 247)', fontSize: 24 }} />
      </Box>
    ),
    // description: '+0.1 so với tháng trước',
    changeColor: 'success.main',
  },
];

export default async function UserManagementPage() {
  return (
    <Box sx={{ p: 1, height: '80vh' }}>
      <Typography variant='h4' fontWeight={600} noWrap>
        Thống kê tổng quan
      </Typography>
      <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mb: 2 }}>
        <Typography variant='body1' color='text.secondary' noWrap>
          Chào mừng trở lại Admin. Dưới đây là những gì đang diễn ra trên hệ thống hôm nay.
        </Typography>

        <Suspense>
          <TodayCard />
        </Suspense>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {stats.map((stat, index) => (
            <DashboardStatCard stat={stat} key={index} />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3,
        }}
      >
        <CourseEnrollmentTrendChart />
        <UserRegitrationTrendChart />
      </Box>
    </Box>
  );
}
