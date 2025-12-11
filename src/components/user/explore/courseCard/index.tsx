// app/courses/components/CourseCard.tsx
'use client';

import { Card, CardContent, Typography, Button, Box, Avatar, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowForward from '@mui/icons-material/ArrowForward';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Link from 'next/link';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    rating: number;
    reviewCount: number;
    price: string;
    image: string;
    isFree?: boolean;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(course.rating);
    const hasHalfStar = course.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} sx={{ fontSize: 16, color: 'warning.main' }} />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalfIcon key='half' sx={{ fontSize: 16, color: 'warning.main' }} />);
    }

    return stars;
  };

  return (
    <Link href={`/courses/${course.id}`} passHref>
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <Avatar
          variant='rounded'
          src={course.image}
          alt={course.title}
          sx={{
            width: { xs: '100%', sm: 192 },
            height: 144,
            borderRadius: 1,
          }}
        />

        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            {course.title}
          </Typography>

          <Typography variant='body2' color='text.secondary' gutterBottom>
            {course.instructor}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant='body2' fontWeight={600} color='warning.main'>
              {course.rating}
            </Typography>
            <Box sx={{ display: 'flex' }}>{renderStars()}</Box>
            <Typography variant='body2' color='text.secondary'>
              ({course.reviewCount.toLocaleString()})
            </Typography>
          </Box>

          <Box sx={{ mt: 'auto', pt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <Typography variant='h6' fontWeight={600} color={course.isFree ? 'success.main' : 'text.primary'}>
              {course.price}
            </Typography> */}
            <Box />

            <IconButton
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
              size='small'
            >
              <ArrowForward fontSize='small' />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
