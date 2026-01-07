'use client';

import { Paper, Box, Typography, Chip, Avatar, Divider, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Link from '@/components/common/Link';
import { CourseCardProps } from './types';
import { levelLabelsMap } from '@/lib/const/course';
import { formatDuration } from '@/lib/utils/formatDatetime';

export function CourseCardHorizontal({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} target='_blank' style={{ textDecoration: 'none' }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          transition: 'all 0.3s',
          '&:hover': {
            boxShadow: 3,
            borderColor: 'primary.light',
          },
        }}
      >
        {/* <Avatar
          variant='rounded'
          src={course?.img?.url || null}
          alt={course?.title}
          sx={{
            width: { xs: '100%', md: '33.33%' },
            height: { xs: 192, md: 'auto' },
            borderRadius: 1,
          }}
        /> */}
        <Box
          component='img'
          src={course?.img?.url || null}
          alt={course?.title}
          // onError={handleImgError}
          sx={{
            width: { xs: '100%', md: '33.33%' },
            height: { xs: 192, md: 'auto' },
            borderRadius: 1,
            objectFit: 'cover',
            display: 'block',
            backgroundColor: '#f3f4f6',
          }}
        />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' fontWeight={600} gutterBottom>
            {course?.title}
          </Typography>

          <Typography variant='body2' color='text.secondary' gutterBottom>
            Giảng viên: {course?.instructor?.fullname}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {course?.shortDescription}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
              <Typography variant='body2' fontWeight={500} color='warning.main'>
                {(course?.avgRating || 0).toLocaleString()}
              </Typography>
            </Box>

            <Divider orientation='vertical' flexItem />

            <Typography variant='body2' color='text.secondary'>
              {(course?.reviewCount || 0).toLocaleString()} đánh giá
            </Typography>

            <Divider orientation='vertical' flexItem />

            <Typography variant='body2' color='text.secondary'>
              {course?._count?.enrollments} học viên
            </Typography>

            <Divider orientation='vertical' flexItem />

            <Typography variant='body2' color='text.secondary'>
              {formatDuration(course?.totalDuration || 0)}
            </Typography>
          </Box>

          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                key={course?.subCategory?.name}
                label={course?.subCategory?.name}
                size='small'
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: 'hero.light',
                  color: 'primary.main',
                }}
              />
              <Chip
                key={course?.level}
                label={levelLabelsMap[course?.level]}
                size='small'
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: 'action.selected',
                  color: 'text.secondary',
                }}
              />
            </Box>
            <IconButton>
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Link>
  );
}
