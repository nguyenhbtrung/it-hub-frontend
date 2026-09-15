import { Avatar, Box, Skeleton, Stack } from '@mui/material';

import Section from '@/components/common/section';

export function InstructorCardSkeleton() {
  return (
    <Section id='instructor'>
      {/* =========================
          Section title
      ========================= */}
      <Skeleton
        variant='text'
        width={120}
        height={36}
        sx={{
          transform: 'none',
          mb: 1,
        }}
      />

      {/* =========================
          Instructor
      ========================= */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        alignItems={{
          xs: 'center',
          md: 'flex-start',
        }}
      >
        {/* Avatar */}
        <Skeleton
          variant='circular'
          width={120}
          height={120}
          sx={{
            flexShrink: 0,
            transform: 'none',
            border: '4px solid',
            borderColor: 'primary.light',
          }}
        />

        {/* Information */}
        <Box
          sx={{
            flex: 1,
            width: { xs: '100%', md: 'auto' },
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          {/* Name */}
          <Skeleton
            variant='text'
            width={180}
            height={32}
            sx={{
              transform: 'none',
              mx: {
                xs: 'auto',
                md: 0,
              },
            }}
          />

          {/* Specialized */}
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{
              mt: 2,
              mb: 1,
              justifyContent: {
                xs: 'center',
                md: 'flex-start',
              },
            }}
          >
            <Skeleton
              variant='circular'
              width={20}
              height={20}
              sx={{
                flexShrink: 0,
                transform: 'none',
              }}
            />

            <Skeleton
              variant='text'
              height={26}
              sx={{
                width: {
                  xs: 220,
                  md: 280,
                },
                transform: 'none',
              }}
            />
          </Stack>

          {/* School */}
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            sx={{
              mb: 2,
              justifyContent: {
                xs: 'center',
                md: 'flex-start',
              },
            }}
          >
            <Skeleton
              variant='circular'
              width={20}
              height={20}
              sx={{
                flexShrink: 0,
                transform: 'none',
              }}
            />

            <Skeleton
              variant='text'
              height={26}
              sx={{
                width: {
                  xs: 200,
                  md: 250,
                },
                transform: 'none',
              }}
            />
          </Stack>

          {/* Social links */}
          <Stack
            direction='row'
            spacing={1}
            justifyContent={{
              xs: 'center',
              md: 'flex-start',
            }}
          >
            <Skeleton
              variant='circular'
              width={40}
              height={40}
              sx={{
                transform: 'none',
              }}
            />

            <Skeleton
              variant='circular'
              width={40}
              height={40}
              sx={{
                transform: 'none',
              }}
            />

            <Skeleton
              variant='circular'
              width={40}
              height={40}
              sx={{
                transform: 'none',
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Section>
  );
}
