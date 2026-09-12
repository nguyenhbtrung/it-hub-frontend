import { Box, Breadcrumbs, Container, Skeleton, Stack, Avatar } from '@mui/material';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import UpdateIcon from '@mui/icons-material/Update';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export function CourseHeaderSkeleton() {
  return (
    <Box
      sx={{
        bgcolor: 'hero.light',
        p: 4,
      }}
    >
      <Container maxWidth='lg'>
        <Box display='flex'>
          {/* =========================
              Main content
          ========================= */}
          <Box flex={1} minWidth={0}>
            {/* Breadcrumbs */}
            <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='small' />} sx={{ mb: 2 }}>
              <Skeleton variant='circular' width={40} height={40} sx={{ transform: 'none' }} />

              <Skeleton variant='text' width={90} height={24} sx={{ transform: 'none' }} />

              <Skeleton variant='text' width={110} height={24} sx={{ transform: 'none' }} />
            </Breadcrumbs>

            {/* Title */}
            <Skeleton
              variant='text'
              width='80%'
              height={60}
              sx={{
                transform: 'none',
                mb: 1,
              }}
            />

            {/* Short description */}
            <Stack spacing={0.5} sx={{ mb: 2 }}>
              <Skeleton variant='text' width='95%' height={26} sx={{ transform: 'none' }} />
              <Skeleton variant='text' width='75%' height={26} sx={{ transform: 'none' }} />
            </Stack>

            {/* Instructor */}
            <Stack direction='row' spacing={1} alignItems='center' mb={3}>
              <Skeleton variant='circular' width={32} height={32} sx={{ transform: 'none' }} />

              <Skeleton variant='text' width={75} height={24} sx={{ transform: 'none' }} />

              <Skeleton variant='text' width={130} height={24} sx={{ transform: 'none' }} />
            </Stack>

            {/* Course stats */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3 }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              flexWrap='wrap'
            >
              {/* Rating */}
              <Stack direction='row' spacing={1} alignItems='center'>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <StarIcon
                    sx={{
                      color: '#FFD700',
                      mr: 0.5,
                      opacity: 0.35,
                    }}
                  />

                  <Skeleton variant='text' width={28} height={24} sx={{ transform: 'none' }} />
                </Box>

                <Skeleton variant='text' width={80} height={22} sx={{ transform: 'none' }} />
              </Stack>

              {/* Students */}
              <Stack direction='row' spacing={1} alignItems='center'>
                <PersonIcon fontSize='small' sx={{ opacity: 0.35 }} />

                <Skeleton variant='text' width={100} height={22} sx={{ transform: 'none' }} />
              </Stack>

              {/* Updated date */}
              <Stack direction='row' spacing={1} alignItems='center'>
                <UpdateIcon fontSize='small' sx={{ opacity: 0.35 }} />

                <Skeleton variant='text' width={150} height={22} sx={{ transform: 'none' }} />
              </Stack>
            </Stack>

            {/* =========================
                Mobile promo video
            ========================= */}
            <Box my={4} display={{ xs: 'block', lg: 'none' }}>
              <Skeleton
                variant='rounded'
                width='100%'
                sx={{
                  height: 'auto',
                  aspectRatio: 2,
                  transform: 'none',
                  borderRadius: 2,
                }}
              />
            </Box>

            {/* =========================
                Mobile actions
            ========================= */}
            <Stack direction='row' display={{ xs: 'flex', lg: 'none' }} spacing={1} sx={{ my: 2 }}>
              <Skeleton
                variant='rounded'
                sx={{
                  width: {
                    xs: '100%',
                    sm: 200,
                  },
                  height: 42,
                  transform: 'none',
                  borderRadius: 1,
                }}
              />

              <Skeleton
                variant='rounded'
                width={42}
                height={42}
                sx={{
                  minWidth: 42,
                  transform: 'none',
                  borderRadius: 1,
                }}
              >
                <ShareIcon />
              </Skeleton>

              <Skeleton
                variant='rounded'
                width={42}
                height={42}
                sx={{
                  minWidth: 42,
                  transform: 'none',
                  borderRadius: 1,
                }}
              >
                <BookmarkBorderIcon />
              </Skeleton>
            </Stack>
          </Box>

          {/* =========================
              Desktop sidebar
          ========================= */}
          <Box width={350} position='relative' display={{ xs: 'none', lg: 'flex' }}>
            <Box position='absolute' width={350} top={104}>
              <CourseSidebarSkeleton />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/**
 * Skeleton cho SidebarEnrollCard
 */
function CourseSidebarSkeleton() {
  return (
    <Box>
      <Box
        sx={{
          borderRadius: 3,
          mb: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          boxShadow: 1,
        }}
      >
        {/* Promo video */}
        <Skeleton
          variant='rectangular'
          width='100%'
          height={200}
          sx={{
            transform: 'none',
          }}
        />

        <Box sx={{ p: 2 }}>
          {/* Actions */}
          <Stack direction='row' spacing={1} sx={{ my: 2 }}>
            <Skeleton
              variant='rounded'
              width='100%'
              height={42}
              sx={{
                transform: 'none',
                borderRadius: 1,
              }}
            />

            <Skeleton
              variant='rounded'
              width={42}
              height={42}
              sx={{
                minWidth: 42,
                transform: 'none',
                borderRadius: 1,
              }}
            />

            <Skeleton
              variant='rounded'
              width={42}
              height={42}
              sx={{
                minWidth: 42,
                transform: 'none',
                borderRadius: 1,
              }}
            />
          </Stack>

          {/* Course includes */}
          <Skeleton
            variant='text'
            width={150}
            height={32}
            sx={{
              transform: 'none',
              mb: 1,
            }}
          />

          <CourseIncludesSkeleton />
        </Box>
      </Box>
    </Box>
  );
}

/**
 * Skeleton cho CourseIncludes
 */
function CourseIncludesSkeleton() {
  return (
    <Stack spacing={0}>
      {/* Level */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
        }}
      >
        <Stack direction='row' spacing={1} alignItems='center'>
          <Skeleton variant='circular' width={20} height={20} sx={{ transform: 'none' }} />

          <Skeleton variant='text' width={75} height={22} sx={{ transform: 'none' }} />
        </Stack>

        <Skeleton variant='text' width={70} height={22} sx={{ transform: 'none' }} />
      </Box>

      {/* Divider */}
      <Skeleton variant='rectangular' width='100%' height={1} sx={{ transform: 'none' }} />

      {/* Duration */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
        }}
      >
        <Stack direction='row' spacing={1} alignItems='center'>
          <Skeleton variant='circular' width={20} height={20} sx={{ transform: 'none' }} />

          <Skeleton variant='text' width={85} height={22} sx={{ transform: 'none' }} />
        </Stack>

        <Skeleton variant='text' width={60} height={22} sx={{ transform: 'none' }} />
      </Box>

      {/* Divider */}
      <Skeleton variant='rectangular' width='100%' height={1} sx={{ transform: 'none' }} />

      {/* Lessons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
        }}
      >
        <Stack direction='row' spacing={1} alignItems='center'>
          <Skeleton variant='circular' width={20} height={20} sx={{ transform: 'none' }} />

          <Skeleton variant='text' width={75} height={22} sx={{ transform: 'none' }} />
        </Stack>

        <Skeleton variant='text' width={30} height={22} sx={{ transform: 'none' }} />
      </Box>

      {/* Divider */}
      <Skeleton variant='rectangular' width='100%' height={1} sx={{ transform: 'none' }} />

      {/* Materials */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
        }}
      >
        <Stack direction='row' spacing={1} alignItems='center'>
          <Skeleton variant='circular' width={20} height={20} sx={{ transform: 'none' }} />

          <Skeleton variant='text' width={125} height={22} sx={{ transform: 'none' }} />
        </Stack>

        <Skeleton variant='text' width={30} height={22} sx={{ transform: 'none' }} />
      </Box>
    </Stack>
  );
}
