import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

export default function UserInfoSkeleton() {
  return (
    <Box>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
        <Skeleton variant='circular' width={40} height={40} />

        <Box sx={{ flex: 1 }}>
          <Skeleton variant='text' width='60%' height={20} sx={{ mb: 1 }} />

          <Skeleton variant='text' width='40%' height={16} />
        </Box>
      </Box>
    </Box>
  );
}
