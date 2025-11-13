import { Box, Typography, Button } from '@mui/material';
import { Suspense } from 'react';
import { UpcomingContestList, UpcomingContestListSkeleton } from './UpcomingContestList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function UpcomingContests() {
  return (
    <Box
      component='section'
      sx={{
        py: { xs: 4, md: 4 },
        px: { xs: 0, md: 4 },
        mx: { xs: -2, sm: -3, md: 8 },
        borderRadius: { xs: 0, md: 2 },
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        gap: 6,
      }}
    >
      {/* Header + Button */}
      <Box
        sx={{
          px: { xs: 2, md: 0 },
          flex: 1,
          textAlign: { xs: 'center', lg: 'left' },
        }}
      >
        <Typography variant='h4' fontWeight={700} gutterBottom>
          Cuộc thi sắp diễn ra
        </Typography>
        <Typography variant='body1' sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
          Thử thách bản thân và thể hiện kỹ năng của bạn trong các cuộc thi thực chiến
        </Typography>
        <Button
          variant='contained'
          size='large'
          color='secondary'
          endIcon={<ArrowForwardIcon />}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Khám phá các cuộc thi
        </Button>
      </Box>

      {/* List */}
      <Box sx={{ flex: 4, width: '100%' }}>
        <Suspense fallback={<UpcomingContestListSkeleton />}>
          <UpcomingContestList />
        </Suspense>
      </Box>
    </Box>
  );
}
