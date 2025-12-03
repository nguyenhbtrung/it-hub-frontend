import { Box, Typography, Paper } from '@mui/material';
import { Star } from '@mui/icons-material';

const stats = [
  {
    title: 'Học viên mới',
    value: '125',
    change: '+15.8%',
    changeColor: 'success.main',
    description: '',
  },
  {
    title: 'Số lượng khóa học',
    value: '24',
    description: 'Đang hoạt động',
  },
  {
    title: 'Bài tập đã nộp',
    value: '89',
    change: '-2%',
    changeColor: 'error.main',
    description: '',
  },
  {
    title: 'Điểm đánh giá trung bình',
    value: '4.8',
    icon: <Star sx={{ color: 'warning.main', fontSize: 28 }} />,
    description: '+0.1 so với tháng trước',
    changeColor: 'success.main',
  },
];

export default function StatsCards() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
      {stats.map((stat, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
            {stat.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant='h4' sx={{ fontWeight: 700 }}>
              {stat.value}
            </Typography>
            {stat.icon}
          </Box>

          {stat.change && (
            <Typography variant='body2' sx={{ color: stat.changeColor, fontWeight: 500 }}>
              {stat.change}
            </Typography>
          )}

          {stat.description && (
            <Typography variant='body2' color='text.secondary'>
              {stat.description}
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
}
