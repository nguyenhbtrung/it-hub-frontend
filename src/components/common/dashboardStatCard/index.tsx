import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stat } from '@/types/dashboard';

interface DashboardStatCardProps {
  stat: Stat;
}

export default function DashboardStatCard({ stat }: DashboardStatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          {stat.title}
        </Typography>
        {stat.icon}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant='h4' sx={{ fontWeight: 700 }}>
          {stat.value}
        </Typography>
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
  );
}
