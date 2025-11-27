import { Avatar, Box, Typography, Stack, Card, CardContent, Button, LinearProgress, Grid } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { courseProgress } from '@/types/course';
import { jwtPayload } from '@/types/jwt';

function parseWeeks(duration: string | undefined) {
  if (!duration) return 0;
  const m = duration.match(/(\d+)\s*tuần|(\d+)\s*tuần/i);
  if (m) return Number(m[1] || m[2] || 0);
  // fallback: try to extract number
  const n = duration.match(/(\d+)/);
  return n ? Number(n[1]) : 0;
}

interface EnrolledWelcomeSectionProps {
  user: jwtPayload;
  learning: courseProgress[];
}

export default function EnrolledWelcomeSection({ user, learning }: EnrolledWelcomeSectionProps) {
  const name = user?.name || 'Sinh viên';

  const completedCount = learning.filter((c: courseProgress) => c.progress >= 100).length;
  const inProgressCount = learning.filter((c: courseProgress) => c.progress < 100).length;
  const avgProgress =
    learning.length > 0
      ? Math.round(learning.reduce((s: number, c: courseProgress) => s + (c.progress || 0), 0) / learning.length)
      : 0;
  const lastAccessDate = learning
    .map((c: courseProgress) => new Date(c.lastAccess))
    .filter(Boolean)
    .sort((a: Date, b: Date) => +b - +a)[0];
  const lastAccessStr = lastAccessDate ? lastAccessDate.toLocaleDateString() : 'Chưa có';
  const totalWeeks = learning.reduce((s: number, c: courseProgress) => s + parseWeeks(c.duration), 0);

  // Course to watch out for: course with lowest progress
  const nextCourse =
    learning.length > 0
      ? learning.slice().sort((a: courseProgress, b: courseProgress) => a.progress - b.progress)[0]
      : null;

  const overviewCards = [
    {
      icon: <TrendingUpIcon color='primary' />,
      value: learning.length,
      label: 'Khóa học đã tham gia',
    },
    {
      icon: <SchoolIcon color='secondary' />,
      value: inProgressCount,
      label: 'Đang học',
    },
    {
      icon: <DoneAllIcon color='success' />,
      value: completedCount,
      label: 'Khóa học hoàn thành',
    },
    {
      icon: <AccessTimeIcon color='action' />,
      value: `${avgProgress}%`,
      label: 'Tiến độ trung bình',
    },
    {
      icon: <EventIcon color='disabled' />,
      value: lastAccessStr,
      label: 'Lần truy cập gần nhất',
    },
    {
      icon: <AccessTimeIcon color='inherit' />,
      value: `${totalWeeks} tuần`,
      label: 'Tổng thời lượng ước tính',
    },
  ];

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 4 } }}>
      {/* ======== ROW 1 ======== */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 0, sm: 3 },
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack direction='row' spacing={2} alignItems='flex-start'>
            <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, display: { xs: 'none', sm: 'flex' } }}>
              {name.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography variant='h4' fontWeight={700}>
                Chào mừng trở lại, {name}!
              </Typography>
              <Typography mt={1} color='text.secondary'>
                Tiếp tục hành trình học tập tuyệt vời của bạn nào!
              </Typography>
            </Box>
          </Stack>

          <Stack direction='row' gap={2} mt={3} sx={{ flexWrap: 'wrap', display: { xs: 'none', sm: 'flex' } }}>
            <Button variant='contained' size='large' startIcon={<RocketLaunchIcon />}>
              Tiếp tục học
            </Button>

            <Button variant='outlined' size='large' startIcon={<SchoolIcon />}>
              Xem khóa học
            </Button>
          </Stack>
        </Box>

        {/* RIGHT - Overview */}
        <Card
          sx={{
            flexShrink: 0,
            flex: 1.5,
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant='h6' fontWeight={700} mb={2}>
              Tổng quan học tập
            </Typography>

            <Grid container spacing={2}>
              {overviewCards.map((card, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Stack direction='row' spacing={2} alignItems='center' sx={{ height: '100%' }}>
                    {card.icon}
                    <Box>
                      <Typography variant='h6' fontWeight={700}>
                        {card.value}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {card.label}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            {nextCourse && (
              <Box mt={2} p={2} sx={{ borderRadius: 2, bgcolor: 'background.default' }}>
                <Typography variant='subtitle2' fontWeight={600}>
                  Khóa cần chú ý: {nextCourse.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Hoàn thành {nextCourse.progress}% • {nextCourse.category}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* ======== ROW 2: Course progress ======== */}
      <Box mt={5}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' fontWeight={700}>
            Tiến độ học tập
          </Typography>
          <Button variant='text'>Xem tất cả</Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: '1fr ',
              lg: '1fr 1fr ',
            },
          }}
        >
          {learning.map((course: courseProgress) => (
            <Card
              key={course.courseId}
              sx={{
                p: 2,
                borderRadius: 3,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <Box
                component='img'
                src={course.image}
                alt={course.title}
                sx={{
                  width: { xs: '100%', sm: '30%' },
                  height: { xs: 'auto', sm: 'auto' },
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />

              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box>
                  <Box justifyContent='space-between' display='flex' flexDirection='row'>
                    <Typography variant='h6' fontWeight={600}>
                      {course.title}
                    </Typography>
                    <Box p={0.5} display={{ xs: 'none', sm: 'block' }}>
                      <ArrowForwardIcon />
                    </Box>
                  </Box>

                  <Typography variant='body2' color='text.secondary' mt={0.5}>
                    {course.category} • {course.level}
                  </Typography>

                  <Typography variant='body2' color='text.secondary' mt={0.5}>
                    Thời lượng: {course.duration}
                  </Typography>

                  <Typography variant='body2' color='text.secondary' mt={0.5}>
                    Lần truy cập cuối: {course.lastAccess}
                  </Typography>
                </Box>

                <Box sx={{ mt: { xs: 2, md: 1 } }}>
                  <Typography variant='body2' color='text.secondary'>
                    Hoàn thành {course.progress}%
                  </Typography>
                  <LinearProgress
                    variant='determinate'
                    value={course.progress}
                    sx={{ mt: 0.5, height: 8, borderRadius: 2 }}
                  />
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
