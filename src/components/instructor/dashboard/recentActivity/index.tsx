import { Box, Typography, Paper, Avatar } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getRecentActivitiesOfInstructor } from '@/features/dashboard';

export default async function RecentActivity() {
  const res = await getRecentActivitiesOfInstructor();
  const activities = res.success ? (res.data ?? []) : [];

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
        {activities.map((activity: any, index: number) => {
          const timeAgo = formatDistanceToNow(new Date(activity.createdAt), {
            addSuffix: true,
            locale: vi,
          });

          return (
            <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Avatar src={activity.avatar || undefined}>{activity.studentName?.charAt(0)}</Avatar>

              <Box>
                <Typography variant='body2' sx={{ mb: 0.5 }}>
                  <Typography component='span' sx={{ fontWeight: 700 }}>
                    {activity.studentName}
                  </Typography>{' '}
                  đã đăng ký khoá học &quot;
                  <Typography component='span' sx={{ fontWeight: 600 }}>
                    {activity.courseTitle}
                  </Typography>
                  &quot;
                </Typography>

                <Typography variant='caption' color='text.secondary'>
                  {timeAgo}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
