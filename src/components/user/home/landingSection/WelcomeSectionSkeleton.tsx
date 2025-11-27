import { Box, Stack, Card, Skeleton, Container } from '@mui/material';

export default function WelcomeSectionSkeleton() {
  return (
    <Container maxWidth='xl'>
      <Box
        component='section'
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            py: { xs: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: { xs: 3, md: 4 },
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            {/* LEFT - Welcome Section Skeleton */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                textAlign: { xs: 'center', md: 'left' },
                width: '100%',
                maxWidth: { xs: '400px', md: 'none' },
              }}
            >
              <Stack
                direction='column'
                spacing={2}
                alignItems={{ xs: 'center', md: 'flex-start' }}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                {/* Avatar Skeleton */}
                <Skeleton
                  variant='circular'
                  sx={{
                    width: { xs: 56, sm: 64, md: 64 },
                    height: { xs: 56, sm: 64, md: 64 },
                  }}
                />

                {/* Text Content Skeleton */}
                <Box sx={{ width: '100%' }}>
                  <Skeleton
                    variant='text'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
                      maxWidth: { xs: '200px', md: '300px' },
                      mx: { xs: 'auto', md: 0 },
                    }}
                  />
                  <Skeleton
                    variant='text'
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      maxWidth: { xs: '250px', md: '350px' },
                      mt: 1,
                      mx: { xs: 'auto', md: 0 },
                    }}
                  />
                </Box>
              </Stack>

              {/* Button Skeleton */}
              <Skeleton
                variant='rounded'
                sx={{
                  mt: 3,
                  height: 48,
                  width: { xs: '100%', sm: '200px' },
                  borderRadius: 1,
                  mx: { xs: 'auto', sm: 0 },
                }}
              />
            </Box>

            {/* RIGHT - Carousel/Content Skeleton */}
            <Card
              sx={{
                flex: { xs: 'none', md: 2 },
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                width: '100%',
                maxWidth: { xs: '400px', sm: '600px', md: 'none' },
              }}
            >
              {/* Section Title Skeleton */}
              <Skeleton
                variant='text'
                sx={{
                  fontSize: '1.5rem',
                  mb: 2,
                  maxWidth: '200px',
                  mx: { xs: 'auto', md: 0 },
                }}
              />

              {/* Cards Grid Skeleton */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: { xs: 2, sm: 2, md: 3 },
                }}
              >
                {[...Array(3)].map((_, index) => (
                  <Box key={index} sx={{ p: 0.5 }}>
                    {/* Card Image Skeleton */}
                    <Skeleton
                      variant='rounded'
                      sx={{
                        height: { xs: 160, sm: 140, md: 150 },
                        width: '100%',
                        borderRadius: 2,
                        mb: 1.5,
                      }}
                    />

                    {/* Card Content Skeleton */}
                    <Box sx={{ px: 1 }}>
                      <Skeleton variant='text' sx={{ fontSize: '1rem', mb: 1 }} />
                      <Skeleton variant='text' sx={{ fontSize: '0.875rem' }} />
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Navigation Arrows Skeleton (hidden on mobile) */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between', mt: 2 }}>
                <Skeleton variant='circular' sx={{ width: 40, height: 40 }} />
                <Skeleton variant='circular' sx={{ width: 40, height: 40 }} />
              </Box>
            </Card>
          </Box>

          {/* Additional Row for Enrolled Layout (hidden by default, maintains space) */}
          <Box sx={{ mt: 5, display: 'none' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Skeleton variant='text' sx={{ fontSize: '1.5rem', width: '200px' }} />
              <Skeleton variant='text' sx={{ fontSize: '1rem', width: '80px' }} />
            </Box>

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
              {[...Array(2)].map((_, index) => (
                <Skeleton key={index} variant='rounded' sx={{ height: 120, borderRadius: 3 }} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
