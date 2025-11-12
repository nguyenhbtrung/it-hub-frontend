import { Box, Typography, Button } from '@mui/material';
import Link from '@/components/common/Link';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function LearningAssistant() {
  return (
    <Box mt={8} textAlign='center'>
      <SmartToyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      <Typography variant='h5' fontWeight={600} gutterBottom>
        Trợ lý học tập thông minh
      </Typography>
      <Typography variant='body1' color='text.secondary' maxWidth='md' mx='auto' mb={3}>
        Đặt câu hỏi về tài liệu, nhận gợi ý học tập và lộ trình cá nhân hóa nhờ AI trợ lý học tập.
      </Typography>
      <Button component={Link} href='/assistant' variant='outlined'>
        Khám phá ngay
      </Button>
    </Box>
  );
}
