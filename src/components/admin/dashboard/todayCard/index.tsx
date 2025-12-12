'use client';

import { toShortLocaleDateString } from '@/lib/utils/formatDatetime';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function TodayCard() {
  const today = toShortLocaleDateString(new Date());
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <CalendarToday sx={{ color: 'text.secondary', mr: 1 }} />
      <Typography variant='body2' noWrap>
        Hôm nay, {today}
      </Typography>
    </Paper>
  );
}
