'use client';

import { Box, Typography, Button } from '@mui/material';
import { AddCircle, FilterList } from '@mui/icons-material';

export default function DiscussionHeader() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 3, mb: 4 }}>
      <Box>
        <Typography variant='h4' sx={{ fontWeight: 700, mb: 1 }}>
          Quản lý Thảo luận & Hỏi đáp
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Xem, trả lời và quản lý các câu hỏi từ học viên.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
          startIcon={<FilterList />}
          sx={{
            height: 40,
            borderColor: 'divider',
            color: 'text.secondary',
            '&:hover': {
              borderColor: 'divider',
              backgroundColor: 'action.hover',
            },
          }}
        >
          Lọc
        </Button>

        <Button
          variant='contained'
          startIcon={<AddCircle />}
          sx={{
            height: 40,
            fontWeight: 700,
            textTransform: 'none',
          }}
        >
          Tạo chủ đề mới
        </Button>
      </Box>
    </Box>
  );
}
