'use client';

import { alpha, useTheme } from '@mui/material/styles';
import { Overview } from './types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export default function StatsCards({ overview }: { overview: Overview }) {
  const theme = useTheme();
  const stats = [
    {
      label: 'Tổng học viên',
      value: overview.totalStudents,

      color: 'default',
    },
    {
      label: 'Đã nộp',
      value: overview.submittedStudents,
      badge: `${Math.round((overview.submittedStudents / overview.totalStudents) * 100)}% nộp bài`,
      color: 'success',
    },
    {
      label: 'Chưa chấm',
      value: overview.unscoredAttempts,
      badge: 'Ưu tiên',
      color: 'primary',
      highlight: true,
    },
    {
      label: 'Đã chấm',
      value: overview.scoredAttempts,
      badge: `AVG: ${overview.averageScore.toFixed(1)}`,
      color: 'default',
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((stat, idx) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={idx}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 1,
              border: '1px solid',
              borderColor: stat.highlight ? 'primary.light' : 'divider',
              ...(stat.highlight && {
                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
              }),
            }}
          >
            <Typography variant='caption' color='text.secondary' fontWeight='medium' gutterBottom>
              {stat.label.toUpperCase()}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <Typography variant='h3' fontWeight='bold'>
                {stat.value}
              </Typography>
              {stat.badge && (
                <Chip
                  label={stat.badge}
                  size='small'
                  color={stat.color as any}
                  variant={stat.color === 'default' ? 'outlined' : 'filled'}
                  sx={{ borderRadius: 0.5, fontSize: '0.7rem', fontWeight: 'medium' }}
                />
              )}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
