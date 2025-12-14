'use client';

import { Paper, Box, Typography, Chip, Button, Avatar, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    description: string;
    rating: number;
    reviewCount: number;
    image: string;
    tags: string[];
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
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
      <Avatar
        variant='rounded'
        src={course.image}
        alt={course.title}
        sx={{
          width: { xs: '100%', md: '33.33%' },
          height: { xs: 192, md: 'auto' },
          borderRadius: 1,
        }}
      />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h6' fontWeight={600} gutterBottom>
          {course.title}
        </Typography>

        <Typography variant='body2' color='text.secondary' gutterBottom>
          Giảng viên: {course.instructor}
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
          {course.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
            <Typography variant='body2' fontWeight={500} color='warning.main'>
              {course.rating}
            </Typography>
          </Box>
          <Typography variant='body2' color='text.secondary'>
            ({course.reviewCount.toLocaleString()} đánh giá)
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {course.tags.map((tag, index) => (
              <Chip
                key={tag}
                label={tag}
                size='small'
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: index === 0 ? 'hero.light' : 'action.selected',
                  color: index === 0 ? 'primary.main' : 'text.secondary',
                }}
              />
            ))}
          </Box>

          <Button
            size='small'
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                textDecoration: 'underline',
                backgroundColor: 'transparent',
              },
            }}
          >
            Xem chi tiết
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
