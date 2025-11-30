'use client';
import { Card, Typography, Stack, Box, Rating, TextField, Button } from '@mui/material';
import { useState } from 'react';

export default function YourReview() {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  return (
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
          <Button variant='contained' disabled={!newReview.rating || !newReview.comment}>
            Gửi đánh giá
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
