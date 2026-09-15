import { Box, Divider, Skeleton, Stack } from '@mui/material';
import Section from '@/components/common/section';

function YourReviewSkeleton() {
  return (
    <Box sx={{ mb: 4, py: 3 }}>
      {/* Title */}
      <Skeleton variant='text' width={260} height={36} sx={{ transform: 'none', mb: 1 }} />

      <Stack spacing={2}>
        {/* Description */}
        <Box>
          <Skeleton variant='text' width={240} height={24} sx={{ transform: 'none' }} />

          {/* Rating */}
          <Skeleton variant='rounded' width={160} height={40} sx={{ mt: 0.5, borderRadius: 1 }} />
        </Box>

        {/* Comment */}
        <Skeleton variant='rounded' width='100%' height={116} sx={{ borderRadius: 1 }} />

        {/* Submit */}
        <Stack direction='row' spacing={2} justifyContent='flex-end'>
          <Skeleton variant='rounded' width={120} height={36} sx={{ borderRadius: 2 }} />
        </Stack>
      </Stack>
    </Box>
  );
}

function ReviewStatisticsSkeleton() {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Title */}
      <Skeleton variant='text' width={220} height={36} sx={{ transform: 'none', mb: 1 }} />

      <Stack direction='row' spacing={3} alignItems='center'>
        {/* Rating summary */}
        <Box textAlign='center' sx={{ minWidth: 120 }}>
          <Skeleton
            variant='text'
            width={90}
            height={56}
            sx={{
              transform: 'none',
              mx: 'auto',
            }}
          />

          <Skeleton
            variant='rounded'
            width={130}
            height={28}
            sx={{
              borderRadius: 1,
              mx: 'auto',
            }}
          />

          <Skeleton
            variant='text'
            width={100}
            height={24}
            sx={{
              transform: 'none',
              mx: 'auto',
            }}
          />
        </Box>

        {/* Rating distribution */}
        <Box sx={{ flex: 1 }}>
          {[5, 4, 3, 2, 1].map((star) => (
            <Stack key={star} direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
              <Skeleton variant='text' width={20} height={24} sx={{ transform: 'none' }} />

              <Skeleton
                variant='rounded'
                height={8}
                sx={{
                  flex: 1,
                  borderRadius: 4,
                }}
              />

              <Skeleton
                variant='text'
                width={40}
                height={24}
                sx={{
                  transform: 'none',
                }}
              />
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

function ReviewItemSkeleton() {
  return (
    <Box>
      <Stack direction='row' spacing={2} alignItems='flex-start'>
        {/* Avatar */}
        <Skeleton variant='circular' width={56} height={56} sx={{ flexShrink: 0 }} />

        <Box sx={{ flex: 1 }}>
          {/* User name */}
          <Skeleton
            variant='text'
            width={150}
            height={26}
            sx={{
              transform: 'none',
              mb: 1,
            }}
          />

          {/* Rating + date */}
          <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
            <Skeleton variant='rounded' width={100} height={24} sx={{ borderRadius: 1 }} />

            <Skeleton variant='text' width={90} height={24} sx={{ transform: 'none' }} />
          </Stack>

          {/* Comment */}
          <Skeleton
            variant='text'
            width='95%'
            height={26}
            sx={{
              transform: 'none',
              mb: 0.5,
            }}
          />

          <Skeleton
            variant='text'
            width='75%'
            height={26}
            sx={{
              transform: 'none',
              mb: 2,
            }}
          />
        </Box>
      </Stack>

      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}

export function CourseReviewsSkeleton() {
  return (
    <Section id='reviews'>
      {/* YourReview */}
      <YourReviewSkeleton />

      {/* ReviewStatistics */}
      <ReviewStatisticsSkeleton />

      {/* Sort options */}
      <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
        {/* Sort icon */}
        <Skeleton variant='circular' width={24} height={24} />

        {/* Mới nhất */}
        <Skeleton variant='rounded' width={86} height={32} sx={{ borderRadius: 2 }} />

        {/* Đánh giá */}
        <Skeleton variant='rounded' width={82} height={32} sx={{ borderRadius: 2 }} />
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Reviews List */}
      <Stack spacing={4}>
        {Array.from({ length: 4 }).map((_, index) => (
          <ReviewItemSkeleton key={index} />
        ))}
      </Stack>

      {/* Load more */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Skeleton
          variant='rounded'
          width={160}
          height={40}
          sx={{
            borderRadius: 2,
            mx: 'auto',
          }}
        />
      </Box>
    </Section>
  );
}
