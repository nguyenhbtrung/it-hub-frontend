// components/user/course/courseReviews.tsx - Component mới
'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
  Rating,
  Button,
  TextField,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import SortIcon from '@mui/icons-material/Sort';
import { Review } from '@/types/course';
import { ReviewStats } from '.';

interface CourseReviewsContentProps {
  reviews: Review[];
  reviewStats: ReviewStats;
}

export default function CourseReviewsContent({ reviews, reviewStats }: CourseReviewsContentProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });

  const handleLike = (reviewId: string) => {
    const newLiked = new Set(likedReviews);
    if (newLiked.has(reviewId)) {
      newLiked.delete(reviewId);
    } else {
      newLiked.add(reviewId);
    }
    setLikedReviews(newLiked);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.likes - a.likes;
    }
  });

  const ratingDistribution = {
    5: Math.round((reviews.filter((r) => r.rating === 5).length / reviews.length) * 100),
    4: Math.round((reviews.filter((r) => r.rating === 4).length / reviews.length) * 100),
    3: Math.round((reviews.filter((r) => r.rating === 3).length / reviews.length) * 100),
    2: Math.round((reviews.filter((r) => r.rating === 2).length / reviews.length) * 100),
    1: Math.round((reviews.filter((r) => r.rating === 1).length / reviews.length) * 100),
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 4 }}>
        {/* Header với thống kê rating */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant='h5' fontWeight={700} gutterBottom>
              Đánh giá từ học viên
            </Typography>
            <Stack direction='row' spacing={3} alignItems='center'>
              <Box textAlign='center'>
                <Typography variant='h3' fontWeight={800} color='primary'>
                  {reviewStats.rating}
                </Typography>
                <Rating value={reviewStats.rating} precision={0.1} readOnly size='large' />
                <Typography variant='body2' color='text.secondary'>
                  {reviewStats.ratingCount} đánh giá
                </Typography>
              </Box>

              {/* Rating distribution */}
              <Box sx={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map((star) => (
                  <Stack key={star} direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                    <Typography variant='body2' sx={{ minWidth: 20 }}>
                      {star}
                    </Typography>
                    <Box
                      sx={{
                        flex: 1,
                        height: 8,
                        backgroundColor: 'grey.200',
                        borderRadius: 4,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${ratingDistribution[star as keyof typeof ratingDistribution]}%`,
                          height: '100%',
                          backgroundColor: 'primary.main',
                        }}
                      />
                    </Box>
                    <Typography variant='body2' color='text.secondary' sx={{ minWidth: 40 }}>
                      {ratingDistribution[star as keyof typeof ratingDistribution]}%
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Box>

          <Button variant='contained' size='large' onClick={() => setShowReviewForm(true)} sx={{ borderRadius: 2 }}>
            Viết đánh giá
          </Button>
        </Box>

        {/* Sort options */}
        <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 3 }}>
          <SortIcon color='action' />
          <Button
            variant={sortBy === 'recent' ? 'contained' : 'outlined'}
            size='small'
            onClick={() => setSortBy('recent')}
            sx={{ borderRadius: 2 }}
          >
            Mới nhất
          </Button>
          <Button
            variant={sortBy === 'helpful' ? 'contained' : 'outlined'}
            size='small'
            onClick={() => setSortBy('helpful')}
            sx={{ borderRadius: 2 }}
          >
            Hữu ích nhất
          </Button>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* Review Form */}
        {showReviewForm && (
          <Card sx={{ mb: 4, p: 3, backgroundColor: 'grey.50' }}>
            <Typography variant='h6' gutterBottom>
              Viết đánh giá của bạn
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant='body2' gutterBottom>
                  Đánh giá của bạn *
                </Typography>
                <Rating
                  value={newReview.rating}
                  onChange={(event, newValue) => {
                    setNewReview({ ...newReview, rating: newValue || 0 });
                  }}
                  size='large'
                />
              </Box>
              <TextField
                multiline
                rows={4}
                placeholder='Chia sẻ trải nghiệm của bạn với khóa học này...'
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                fullWidth
              />
              <Stack direction='row' spacing={2} justifyContent='flex-end'>
                <Button onClick={() => setShowReviewForm(false)}>Hủy</Button>
                <Button variant='contained' disabled={!newReview.rating || !newReview.comment}>
                  Gửi đánh giá
                </Button>
              </Stack>
            </Stack>
          </Card>
        )}

        {/* Reviews List */}
        <Stack spacing={4}>
          {sortedReviews.map((review) => (
            <Box key={review.id}>
              <Stack direction='row' spacing={2} alignItems='flex-start'>
                <Avatar src={review.user.avatar} sx={{ width: 56, height: 56 }}>
                  {review.user.name.charAt(0)}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                    <Typography variant='subtitle1' fontWeight={600}>
                      {review.user.name}
                    </Typography>
                    {review.isVerified && (
                      <Chip
                        icon={<VerifiedIcon />}
                        label='Đã xác thực'
                        size='small'
                        color='success'
                        variant='outlined'
                      />
                    )}
                  </Stack>

                  <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                    <Rating value={review.rating} size='small' readOnly />
                    <Typography variant='body2' color='text.secondary'>
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Stack>

                  <Typography variant='body1' sx={{ mb: 2, lineHeight: 1.6 }}>
                    {review.comment}
                  </Typography>

                  <Stack direction='row' spacing={2} alignItems='center'>
                    <IconButton
                      size='small'
                      onClick={() => handleLike(review.id)}
                      color={likedReviews.has(review.id) ? 'primary' : 'default'}
                    >
                      {likedReviews.has(review.id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                    </IconButton>
                    <Typography variant='body2' color='text.secondary'>
                      {review.likes + (likedReviews.has(review.id) ? 1 : 0)} người thấy hữu ích
                    </Typography>
                  </Stack>
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
      </CardContent>
    </Card>
  );
}
