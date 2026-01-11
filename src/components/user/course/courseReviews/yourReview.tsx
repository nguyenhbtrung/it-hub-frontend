'use client';
import { createOrUpdateReview } from '@/services/course.service';
import { Card, Typography, Stack, Box, Rating, TextField, Button, Avatar, Divider } from '@mui/material';
import { useState } from 'react';

interface YourReviewProps {
  myReview: any;
  courseId: string;
}

export default function YourReview({ myReview: initialMyReview, courseId }: YourReviewProps) {
  const [myReview, setMyReview] = useState(initialMyReview || null);
  const [openInput, setOpenInput] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });

  const handleSubmit = async () => {
    const res = await createOrUpdateReview(courseId, newReview);
    if (res?.success && res?.data) {
      const r = res.data;
      setMyReview((prev: any) => ({ ...prev, rating: r.rating, comment: r.comment }));
      setOpenInput(false);
    }
  };
  return (
    <>
      {(!myReview || openInput) && (
        <Box sx={{ mb: 4, py: 3 }}>
          <Typography variant='h5' fontWeight={600} gutterBottom>
            Đánh giá của bạn về khoá học
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant='body2' gutterBottom>
                Cho mọi người biết ý kiến của bạn
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
              <Button variant='contained' disabled={!newReview.rating || !newReview.comment} onClick={handleSubmit}>
                Gửi đánh giá
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}

      {myReview && (
        <Box sx={{ mb: 4, py: 3 }}>
          <Typography variant='h5' fontWeight={600} gutterBottom>
            Đánh của tôi về khoá học
          </Typography>
          <Box pt={1}>
            <Stack direction='row' spacing={2} alignItems='flex-start'>
              <Avatar src={myReview?.user?.avatar?.url} sx={{ width: 56, height: 56 }}>
                {myReview?.user?.fullname?.charAt(0)}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                  <Typography variant='subtitle1' fontWeight={600}>
                    {myReview?.user?.fullname}
                  </Typography>
                </Stack>

                <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 1 }}>
                  <Rating value={myReview?.rating} size='small' readOnly />
                  <Typography variant='body2' color='text.secondary'>
                    {new Date(myReview?.createdAt).toLocaleDateString('vi-VN')}
                  </Typography>
                </Stack>

                <Typography variant='body1' sx={{ mb: 2, lineHeight: 1.6 }}>
                  {myReview?.comment}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Button onClick={() => setOpenInput((prev) => !prev)}>Chỉnh sửa đánh giá</Button>
        </Box>
      )}
    </>
  );
}
