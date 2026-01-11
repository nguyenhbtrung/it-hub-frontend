import React from 'react';
import { Box, Stack, Typography, Rating, LinearProgress } from '@mui/material';

type ReviewSummaryProps = {
  reviewStats: { avgRating: number; reviewCount: number };
  ratingDistribution: { [key: number]: number };
};

export default function ReviewStatistics({ reviewStats, ratingDistribution }: ReviewSummaryProps) {
  return (
    <Box sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
      <Box>
        <Typography variant='h5' fontWeight={600} gutterBottom>
          Đánh giá từ học viên
        </Typography>

        <Stack direction='row' spacing={3} alignItems='center'>
          <Box textAlign='center'>
            <Typography variant='h3' fontWeight={800} color='primary'>
              {reviewStats?.avgRating.toFixed(1)}
            </Typography>
            <Rating value={reviewStats.reviewCount} precision={0.1} readOnly size='large' />
            <Typography variant='body2' color='text.secondary'>
              {reviewStats.reviewCount} đánh giá
            </Typography>
          </Box>

          {/* Rating distribution */}
          <Box sx={{ flex: 1 }}>
            {[5, 4, 3, 2, 1].map((star) => {
              const value = ratingDistribution[star] ?? 0;
              const percent = Math.round(value); // đảm bảo là số nguyên
              return (
                <Stack key={star} direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                  <Typography variant='body2' sx={{ minWidth: 20 }}>
                    {star}
                  </Typography>

                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <LinearProgress
                      variant='determinate'
                      value={percent}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        flex: 1,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'primary.main',
                        },
                      }}
                      aria-label={`${star} sao`}
                    />
                  </Box>

                  <Typography variant='body2' color='text.secondary' sx={{ minWidth: 40, textAlign: 'right' }}>
                    {percent}%
                  </Typography>
                </Stack>
              );
            })}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
