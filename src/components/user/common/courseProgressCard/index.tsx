import { courseProgress } from '@/types/course';
import { Card, Box, Typography, LinearProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from '@/components/common/Link';

interface CourseProgressCardProps {
  course: courseProgress;
}

export default function CourseProgressCard({ course }: CourseProgressCardProps) {
  return (
    <Link href={`/courses/${course.courseId}`}>
      <Card
        sx={{
          p: 2,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          transition: 'transform 0.25s, box-shadow 0.25s',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: 6,
            cursor: 'pointer',
          },
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
    </Link>
  );
}
