'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Typography, Box, Avatar, Stack, Rating, Button, Divider, Chip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import SortIcon from '@mui/icons-material/Sort';
import { Review } from '@/types/course';
import Section from '@/components/common/section';
import YourReview from './yourReview';
import ReviewStatistics from './reviewStatistics';
import { getCourseReviews } from '@/services/course.service';

interface CourseReviewsContentProps {
  initialReview: any;
  reviewStats: {
    avgRating: number;
    reviewCount: number;
    distribution: { rating: number; count: number; percentage: number }[];
  };
  courseId: string;
  enrollmentStatus: any;
  myReview: any;
}

export default function CourseReviewsContent({
  initialReview,
  reviewStats,
  courseId,
  enrollmentStatus,
  myReview,
}: CourseReviewsContentProps) {
  const [sortBy, setSortBy] = useState('createdAt');
  const [reviews, setReviews] = useState(initialReview || []);
  const ratingDistribution = reviewStats.distribution.reduce(
    (acc, item) => {
      acc[item.rating] = item.percentage;
      return acc;
    },
    {} as Record<number, number>
  );

  const handleChangeSortBy = async (sortBy: string) => {
    setSortBy(sortBy);
    const res = await getCourseReviews(courseId, { limit: 4, sortBy });
    setReviews(res?.data || []);
  };

  return (
    <Section id='reviews'>
      {(enrollmentStatus?.status === 'active' || enrollmentStatus?.status === 'completed') && (
        <YourReview myReview={myReview} courseId={courseId} />
      )}

      <Suspense>
        <ReviewStatistics reviewStats={reviewStats} ratingDistribution={ratingDistribution} />
      </Suspense>

      {/* Sort options */}
      <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
        <SortIcon color='action' />
        <Button
          variant={sortBy === 'createdAt' ? 'contained' : 'outlined'}
          size='small'
          onClick={() => handleChangeSortBy('createdAt')}
          sx={{ borderRadius: 2 }}
        >
          Mới nhất
        </Button>
        <Button
          variant={sortBy === 'rating' ? 'contained' : 'outlined'}
          size='small'
          onClick={() => handleChangeSortBy('rating')}
          sx={{ borderRadius: 2 }}
        >
          Đánh giá
        </Button>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Reviews List */}
      <Stack spacing={4}>
        {reviews?.length &&
          reviews.map((review: any, index: number) => (
            <Box key={index}>
              <Stack direction='row' spacing={2} alignItems='flex-start'>
                <Avatar src={review?.user?.avatar?.url} sx={{ width: 56, height: 56 }}>
                  {review?.user?.fullname?.charAt(0)}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                    <Typography variant='subtitle1' fontWeight={600}>
                      {review?.user?.fullname}
                    </Typography>
                  </Stack>

                  <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                    <Rating value={review?.rating} size='small' readOnly />
                    <Typography variant='body2' color='text.secondary'>
                      {new Date(review?.createdAt).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Stack>

                  <Typography variant='body1' sx={{ mb: 2, lineHeight: 1.6 }}>
                    {review?.comment}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ mt: 3 }} />
            </Box>
          ))}
      </Stack>

      {/* Load more button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant='outlined' sx={{ borderRadius: 2 }}>
          Xem thêm đánh giá
        </Button>
      </Box>
    </Section>
  );
}
