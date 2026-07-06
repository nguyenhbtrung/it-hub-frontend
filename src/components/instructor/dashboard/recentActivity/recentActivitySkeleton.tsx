import { Box, Paper, Skeleton } from '@mui/material';

export function RecentActivitySkeleton() {
  const skeletonActivities = Array.from({ length: 3 });

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
      <Skeleton variant='text' width='180px' height={28} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {skeletonActivities.map((_, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Skeleton variant='circular' width={40} height={40} />

            <Box sx={{ flex: 1 }}>
              <Skeleton
                variant='text'
                width={index === 0 ? '85%' : index === 1 ? '70%' : '90%'}
                height={20}
                sx={{ mb: 0.5 }}
              />

              <Skeleton variant='text' width='80px' height={16} />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
