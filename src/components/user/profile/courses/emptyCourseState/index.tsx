import { Box, Typography, Button, Stack } from '@mui/material';
import { AutoStories, ArrowForward } from '@mui/icons-material';

export default function EmptyCourseState() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        px: 4,
        textAlign: 'center',
        border: 2,
        borderStyle: 'dashed',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'grey.50',
        mt: 4,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          bgcolor: 'background.paper',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          boxShadow: 1,
          border: 1,
          borderColor: 'divider',
          color: 'text.disabled',
        }}
      >
        <AutoStories sx={{ fontSize: 32 }} />
      </Box>
      <Typography variant='h6' fontWeight='bold' gutterBottom>
        Chưa có khóa học nào
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ maxWidth: 320, mx: 'auto', mb: 4 }}>
        Danh sách này đang trống. Hãy tìm kiếm khóa học phù hợp và bắt đầu hành trình ngay!
      </Typography>
      <Button variant='text' color='primary' endIcon={<ArrowForward />} sx={{ fontWeight: 'medium' }}>
        Khám phá khóa học
      </Button>
    </Box>
  );
}
