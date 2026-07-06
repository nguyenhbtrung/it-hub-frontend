'use client';

import { Box, Card, Skeleton } from '@mui/material';

export default function CourseCardSkeleton() {
  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Image */}
      <Skeleton variant='rectangular' width={128} height={80} sx={{ borderRadius: 1, mr: 3, flexShrink: 0 }} />

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Skeleton width='70%' height={28} />
          <Skeleton width='45%' height={20} />
        </Box>

        {/* Students */}
        <Box sx={{ width: 160 }}>
          <Skeleton width={110} height={24} />
        </Box>

        {/* Status */}
        <Box sx={{ width: 144, display: 'flex', justifyContent: 'center' }}>
          <Skeleton variant='rounded' width={90} height={24} sx={{ borderRadius: 10 }} />
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
        <Skeleton variant='circular' width={36} height={36} />
        <Skeleton variant='circular' width={36} height={36} />
        <Skeleton variant='circular' width={36} height={36} />
      </Box>
    </Card>
  );
}
