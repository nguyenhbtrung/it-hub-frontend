import { Box, Grid, Skeleton, Stack } from '@mui/material';

export function LandingSectionSkeleton() {
  return (
    <Box
      component='section'
      sx={{
        width: '100%',
        pt: { xs: 16, md: 22 },
        pb: { xs: 8, md: 14 },
        position: 'relative',
      }}
    >
      <Grid
        container
        spacing={8}
        alignItems='center'
        justifyContent='center'
        sx={{
          px: { xs: 3, md: 10 },
          maxWidth: '1600px',
          mx: 'auto',
        }}
      >
        {/* LEFT CONTENT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            {/* Tag */}
            <Skeleton variant='rounded' width={320} height={38} sx={{ borderRadius: '999px' }} />

            {/* Heading */}
            <Box>
              <Skeleton width='90%' height={68} />
              <Skeleton width='70%' height={68} />
            </Box>

            {/* Subheading */}
            <Box>
              <Skeleton width='100%' height={28} />
              <Skeleton width='95%' height={28} />
              <Skeleton width='75%' height={28} />
            </Box>

            {/* Button */}
            <Skeleton variant='rounded' width={180} height={50} sx={{ borderRadius: 3 }} />

            {/* Stats (nếu sau này dùng) */}
            {/* <Stack direction="row" spacing={6}>
              {[1, 2, 3].map((item) => (
                <Box key={item}>
                  <Skeleton width={60} height={42} />
                  <Skeleton width={80} height={24} />
                </Box>
              ))}
            </Stack> */}
          </Stack>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Skeleton variant='rounded' height={380} sx={{ borderRadius: 4 }} />
        </Grid>
      </Grid>
    </Box>
  );
}
