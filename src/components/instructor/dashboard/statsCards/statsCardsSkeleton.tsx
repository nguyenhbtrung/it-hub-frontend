import { Box, Paper, Skeleton } from '@mui/material';

export function StatsCardsSkeleton() {
  const skeletonArray = Array.from({ length: 4 });

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
        gap: 3,
      }}
    >
      {skeletonArray.map((_, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            minHeight: '138px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Skeleton variant='text' width='60%' height={20} sx={{ mb: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Skeleton variant='text' width={index === 3 ? '40%' : '50%'} height={40} />

            {index === 3 && <Skeleton variant='circular' width={28} height={28} />}
          </Box>

          {index === 1 ? <Skeleton variant='text' width='45%' height={20} /> : <Box sx={{ height: 20 }} />}
        </Paper>
      ))}
    </Box>
  );
}
