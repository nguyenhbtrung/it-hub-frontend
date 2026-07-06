import { Box, Stack, Card, Skeleton, Container, Button, Grid } from '@mui/material';
import { CourseCardHorizontalSkeleton } from '../../common/courseCard/courseCardHorizontal';

export default function WelcomeSectionSkeleton() {
  return (
    <Container maxWidth='xl'>
      <Box
        component='section'
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ py: 6, px: { xs: 0, md: 4 } }}>
          {/* Header */}
          <Box
            sx={{
              py: { xs: 0, sm: 3 },
            }}
          >
            <Stack direction='row' spacing={{ xs: 0, sm: 2 }} alignItems='flex-start'>
              <Skeleton variant='circular' width={64} height={64} sx={{ display: { xs: 'none', sm: 'block' } }} />

              <Box sx={{ flex: 1 }}>
                <Skeleton width={320} height={46} />
                <Skeleton width={240} height={28} />
              </Box>
            </Stack>
          </Box>

          {/* Course section */}
          <Box mt={5}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Skeleton width={280} height={40} />

              <Button disabled variant='text'>
                <Skeleton width={70} />
              </Button>
            </Box>

            {/* Desktop */}
            <Grid
              container
              spacing={2}
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {[1, 2].map((item) => (
                <Grid size={{ xs: 12, lg: 6 }} key={item}>
                  <CourseCardHorizontalSkeleton />
                </Grid>
              ))}
            </Grid>

            {/* Mobile */}
            <Box
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <CourseCardHorizontalSkeleton mobileVariant='compact' />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
