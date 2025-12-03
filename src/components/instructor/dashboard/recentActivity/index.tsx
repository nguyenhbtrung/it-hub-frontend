import { Box, Typography, Paper } from '@mui/material';
import { School, Quiz, Chat } from '@mui/icons-material';

const activities = [
  {
    icon: <School sx={{ color: 'primary.main' }} />,
    bgColor: 'primary.light',
    title: 'Trần Minh Anh vừa hoàn thành khóa học "Lập trình Python cơ bản".',
    time: '2 phút trước',
  },
  {
    icon: <Quiz sx={{ color: 'warning.main' }} />,
    bgColor: 'warning.light',
    title: 'Nguyễn Thị Bích đã nộp bài tập "Project cuối kỳ" cho khóa "ReactJS nâng cao".',
    time: '15 phút trước',
  },
  {
    icon: <Chat sx={{ color: 'success.main' }} />,
    bgColor: 'success.light',
    title: 'Phạm Văn Cường đã đặt một câu hỏi trong bài học "Setup môi trường".',
    time: '1 giờ trước',
  },
];

export default function RecentActivity() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant='h6' sx={{ fontWeight: 500 }}>
        Hoạt động gần đây
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {activities.map((activity, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: activity.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {activity.icon}
            </Box>
            <Box>
              <Typography variant='body2' sx={{ mb: 0.5 }}>
                <Typography component='span' sx={{ fontWeight: 700 }}>
                  {activity.title.split(' ')[0]} {activity.title.split(' ')[1]} {activity.title.split(' ')[2]}{' '}
                </Typography>
                {activity.title.split(' ').slice(3).join(' ')}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {activity.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
