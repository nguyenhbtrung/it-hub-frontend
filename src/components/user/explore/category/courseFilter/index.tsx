// app/courses/components/CourseFilter.tsx
'use client';

import { Paper, Typography, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import { useState } from 'react';

export default function CourseFilter() {
  const [level, setLevel] = useState('all');
  const [duration, setDuration] = useState('all');
  const [rating, setRating] = useState('4');

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        position: 'sticky',
        top: 96,
      }}
    >
      <Typography variant='h6' fontWeight={600} gutterBottom>
        Bộ lọc
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl size='small' fullWidth>
          <InputLabel id='level-label'>Trình độ</InputLabel>
          <Select labelId='level-label' value={level} label='Trình độ' onChange={(e) => setLevel(e.target.value)}>
            <MenuItem value='all'>Tất cả</MenuItem>
            <MenuItem value='beginner'>Cơ bản</MenuItem>
            <MenuItem value='advanced'>Nâng cao</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' fullWidth>
          <InputLabel id='duration-label'>Thời lượng</InputLabel>
          <Select
            labelId='duration-label'
            value={duration}
            label='Thời lượng'
            onChange={(e) => setDuration(e.target.value)}
          >
            <MenuItem value='all'>Tất cả</MenuItem>
            <MenuItem value='under-1'>Dưới 1 giờ</MenuItem>
            <MenuItem value='1-3'>1-3 giờ</MenuItem>
            <MenuItem value='3-6'>3-6 giờ</MenuItem>
            <MenuItem value='over-6'>Trên 6 giờ</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' fullWidth>
          <InputLabel id='rating-label'>Đánh giá</InputLabel>
          <Select labelId='rating-label' value={rating} label='Đánh giá' onChange={(e) => setRating(e.target.value)}>
            <MenuItem value='4'>4 sao trở lên</MenuItem>
            <MenuItem value='3'>3 sao trở lên</MenuItem>
            <MenuItem value='all'>Tất cả</MenuItem>
          </Select>
        </FormControl>

        <Button variant='contained' fullWidth sx={{ mt: 1 }}>
          Áp dụng
        </Button>
      </Box>
    </Paper>
  );
}
