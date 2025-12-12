'use client';

import { Paper, Box, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function EmptyState() {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 4,
        my: 4,
        borderRadius: 2,
        border: '1px dashed',
        borderColor: 'divider',
        backgroundColor: 'action.hover',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: '50%',
          backgroundColor: 'primary.light',
          color: 'primary.main',
          mb: 2,
        }}
      >
        <SearchOffIcon sx={{ fontSize: 40 }} />
      </Box>

      <Typography variant='h5' fontWeight={600} gutterBottom>
        Không tìm thấy kết quả
      </Typography>

      <Typography variant='body2' color='text.secondary' sx={{ maxWidth: 400, mb: 3 }}>
        Rất tiếc, không có khóa học nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại với từ khóa khác hoặc xóa bớt bộ
        lọc.
      </Typography>

      <Button
        variant='contained'
        sx={{
          fontWeight: 600,
          textTransform: 'none',
        }}
      >
        Xóa bộ lọc
      </Button>
    </Paper>
  );
}
