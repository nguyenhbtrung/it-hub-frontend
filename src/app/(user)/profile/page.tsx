'use client';
import {
  Box,
  Grid,
  Typography,
  Stack,
  LinearProgress,
  Chip,
  Card,
  CardContent,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  MilitaryTech,
  CheckCircle,
  Quiz,
  Forum,
  HotelClass,
  RocketLaunch,
  EmojiEvents,
  Terminal,
  School,
  Schedule,
} from '@mui/icons-material';

// Component Thẻ thống kê
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card
      variant='outlined'
      sx={{
        borderRadius: 2,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <CardContent>
        <Stack direction='row' alignItems='center' spacing={2} mb={2}>
          <Avatar
            sx={{
              bgcolor: `${color}20`,
              color,
              width: 40,
              height: 40,
            }}
          >
            {icon}
          </Avatar>
          <Typography variant='body2' color='text.secondary' fontWeight='medium'>
            {label}
          </Typography>
        </Stack>
        <Typography variant='h4' fontWeight='bold' sx={{ pl: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Component Huy hiệu
function BadgeCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Card
      variant='outlined'
      sx={{
        borderRadius: 2,
        borderColor: `${color}30`,
        bgcolor: `${color}10`,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: 4,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Avatar
        sx={{
          bgcolor: `${color}20`,
          color,
          width: 48,
          height: 48,
          mb: 2,
        }}
      >
        {icon}
      </Avatar>
      <Typography variant='body2' fontWeight='bold' gutterBottom>
        {title}
      </Typography>
      <Typography variant='caption' color='text.secondary' sx={{ lineHeight: 1.2 }}>
        {description}
      </Typography>
    </Card>
  );
}

export default function ProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Phần giới thiệu */}
      <Box>
        <Typography variant='h5' fontWeight='bold' gutterBottom>
          Tổng quan
        </Typography>
        <Typography variant='body1' color='text.secondary' component={'p'}>
          Xin chào! Mình là sinh viên năm 3 chuyên ngành Kỹ thuật Phần mềm. Mình có niềm đam mê lớn với lập trình Web
          Frontend và đang trong quá trình chinh phục ReactJS. Mục tiêu của mình là trở thành một Full-stack Developer
          trong tương lai. Rất vui được kết nối và học hỏi cùng mọi người trên TechEdu Hub.
        </Typography>
      </Box>

      {/* Cấp độ danh tiếng và cách tính điểm */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card
            variant='outlined'
            sx={{
              borderRadius: 2,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              boxShadow: 1,
              height: '100%',
            }}
          >
            <CardContent>
              <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
                <Typography variant='h6' fontWeight='bold'>
                  Cấp độ Danh tiếng
                </Typography>
                <Chip label='Thành viên Bạc' size='small' sx={{ bgcolor: 'grey.100', color: 'grey.800' }} />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems='center'>
                {/* Avatar cấp độ */}
                <Box sx={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'grey.100',
                      border: 4,
                      borderColor: 'background.paper',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    <MilitaryTech sx={{ fontSize: 40, color: 'grey.400' }} />
                  </Avatar>
                  <Chip
                    label='Bạc'
                    size='small'
                    sx={{
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: 'grey.600',
                      color: 'white',
                      fontSize: '0.625rem',
                      fontWeight: 'bold',
                      border: 2,
                      borderColor: 'background.paper',
                    }}
                  />
                </Box>

                {/* Thanh tiến trình */}
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                  <Stack direction='row' justifyContent='space-between' mb={1}>
                    <Typography variant='body2' fontWeight='bold'>
                      1,250{' '}
                      <Typography component='span' variant='body2' color='text.secondary' fontWeight='normal'>
                        pts
                      </Typography>
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Mục tiêu: 2,000
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant='determinate'
                    value={62.5}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      bgcolor: 'grey.100',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                        borderRadius: 6,
                      },
                    }}
                  />
                  <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
                    Thêm 750 điểm để đạt Vàng.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, xl: 6 }}>
          <Card
            variant='outlined'
            sx={{
              borderRadius: 2,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              boxShadow: 1,
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant='h6' fontWeight='bold' gutterBottom>
                Cách tính điểm
              </Typography>
              <Stack spacing={2}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <CheckCircle sx={{ color: 'success.main' }} />
                    <Typography variant='body2' color='text.secondary'>
                      Hoàn thành khóa học
                    </Typography>
                  </Stack>
                  <Typography variant='body2' fontWeight='bold' color='primary.main'>
                    +100 pts
                  </Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <Quiz sx={{ color: 'info.main' }} />
                    <Typography variant='body2' color='text.secondary'>
                      Điểm A bài kiểm tra
                    </Typography>
                  </Stack>
                  <Typography variant='body2' fontWeight='bold' color='primary.main'>
                    +50 pts
                  </Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <Forum sx={{ color: 'warning.main' }} />
                    <Typography variant='body2' color='text.secondary'>
                      Trả lời thảo luận
                    </Typography>
                  </Stack>
                  <Typography variant='body2' fontWeight='bold' color='primary.main'>
                    +10 pts
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Thống kê */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard icon={<School />} label='Khóa học hoàn thành' value='12' color='#3b82f6' />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard icon={<Schedule />} label='Giờ học tích lũy' value='340h' color='#10b981' />
        </Grid>
      </Grid>

      {/* Bộ sưu tập huy hiệu */}
      <Card
        variant='outlined'
        sx={{
          borderRadius: 2,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          boxShadow: 1,
        }}
      >
        <CardContent>
          <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
            <Stack direction='row' alignItems='center' spacing={1}>
              <HotelClass sx={{ color: 'warning.main' }} />
              <Typography variant='h6' fontWeight='bold'>
                Bộ sưu tập Huy hiệu
              </Typography>
            </Stack>
            <Typography variant='body2' color='text.secondary'>
              Đã đạt được (3)
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
              <BadgeCard
                icon={<RocketLaunch />}
                title='Khởi đầu mới'
                description='Hoàn thành khóa học đầu tiên'
                color='#3b82f6'
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
              <BadgeCard
                icon={<EmojiEvents />}
                title='Top 10 Coder'
                description='Hackathon Mùa Thu 2023'
                color='#f59e0b'
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
              <BadgeCard icon={<Terminal />} title='Bug Hunter' description='Phát hiện lỗi hệ thống' color='#10b981' />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
