'use client';

import { Box, Typography, Paper } from '@mui/material';

export function TopicCard({ topic }: any) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 280,
        borderRadius: 1,
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        p: 0,
        backgroundImage: `url(${topic.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Info Container - Khung chứa label và icon ở góc dưới */}
      <Paper
        sx={{
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          p: 2,
          m: 1.5,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          height: 50,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-2px)',
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 1.5,
            color: 'primary.main',
            fontSize: '1.5rem',
          }}
        >
          {topic.icon}
        </Box>

        {/* Label */}
        <Typography
          variant='body1'
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {topic.label}
        </Typography>
      </Paper>
    </Box>
  );
}
