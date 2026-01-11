import { Box, Grid, Card, Typography, Button, Stack } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from '@/components/common/Link';
import { verifySession } from '@/lib/utils/dal';

const features = [
  {
    icon: <QuestionAnswerIcon color='primary' />,
    title: 'Hỏi đáp tức thì',
    description: 'Đặt câu hỏi về tài liệu và nhận giải đáp nhanh chóng',
  },
  {
    icon: <MenuBookIcon color='primary' />,
    title: 'Gợi ý học tập',
    description: 'Đề xuất phương pháp và tài nguyên phù hợp cho bạn',
  },
  {
    icon: <PsychologyIcon color='primary' />,
    title: 'Lộ trình cá nhân hóa',
    description: 'Xây dựng kế hoạch học tập thông minh dựa trên nhu cầu',
  },
];

export default async function LearningAssistant() {
  const session = await verifySession();
  if (session) return;

  return (
    <Box sx={{ py: 8, background: 'var(--mui-palette-gradient-learningAssistant)' }}>
      <Box maxWidth='lg' mx='auto' px={2}>
        <Grid container spacing={6} alignItems='center' flexDirection={{ xs: 'column-reverse', md: 'row' }}>
          {/* Left - Visual */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 3 }}>
              <Stack spacing={3}>
                <Box display='flex' alignItems='center' gap={2} p={2} bgcolor='blue.50' borderRadius={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <SmartToyIcon fontSize='small' />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Bạn
                    </Typography>
                    <Typography variant='body1'>Làm sao để kiểm tra số chẵn trong python?</Typography>
                  </Box>
                </Box>

                <Box display='flex' alignItems='flex-start' gap={2} p={2} bgcolor='secondary.50' borderRadius={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'secondary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <SmartToyIcon fontSize='small' />
                  </Box>
                  <Box>
                    <Typography variant='caption' color='text.secondary'>
                      Trợ lý học tập
                    </Typography>
                    <Typography variant='body1'>
                      Bạn có thể kiểm tra số chẵn bằng cách dùng toán tử chia lấy dư. Đây là ví dụ:
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: 'grey.900',
                        mt: 1,
                        p: 1.5,
                        borderRadius: 1,
                        color: 'success.light',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                      }}
                    >
                      if x % 2 == 0:
                      <br />
                      &nbsp;&nbsp;print(&quot;Số chẵn&quot;)
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Grid>

          {/* Right - Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Box
                display='inline-flex'
                alignItems='center'
                gap={1}
                px={2}
                py={1}
                borderRadius={5}
                bgcolor='secondary.light'
                // color='secondary.dark'
                fontSize='1rem'
              >
                <SmartToyIcon fontSize='small' />
                AI trợ lý học tập
              </Box>

              <Typography variant='h3' fontWeight={700} color='text.primary'>
                Trợ lý học tập{' '}
                <Box component='span' sx={{ color: 'secondary.main' }}>
                  thông minh
                </Box>
              </Typography>

              <Typography variant='body1' color='text.secondary'>
                Đặt câu hỏi về tài liệu, nhận gợi ý học tập và lộ trình cá nhân hóa nhờ AI trợ lý học tập.
              </Typography>

              <Stack spacing={2}>
                {features.map((feature, index) => (
                  <Box key={index} display='flex' gap={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: 'secondary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant='subtitle1' fontWeight={600}>
                        {feature.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              {/* <Button
                component={Link}
                href='/assistant'
                variant='contained'
                color='secondary'
                endIcon={<ArrowForwardIcon />}
                size='large'
                sx={{ width: 180 }}
              >
                Khám phá ngay
              </Button> */}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
