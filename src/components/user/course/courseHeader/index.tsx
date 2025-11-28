import { Box, Breadcrumbs, Link, Typography, Stack, Container, Avatar, Button, IconButton } from '@mui/material';
import { CourseDetail } from '@/types/course';
import PersonIcon from '@mui/icons-material/Person';
import UpdateIcon from '@mui/icons-material/Update';
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SidebarEnrollCard from '../sidebarEnrollCard';
import PromoVideo from '../promoVideo';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function CourseHeader({ course }: { course: CourseDetail }) {
  return (
    <Box
      sx={{
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        bgcolor: 'hero.light',
        p: 4,
      }}
    >
      <Container maxWidth='lg'>
        <Box display='flex'>
          <Box flex={1}>
            <Breadcrumbs aria-label='breadcrumb' separator={<NavigateNextIcon fontSize='small' />} sx={{ mb: 2 }}>
              <Link color='inherit' href='/' sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}>
                <IconButton>
                  <HomeOutlinedIcon />
                </IconButton>
              </Link>
              <Link
                color='inherit'
                underline='hover'
                href={`/category/${course.category}`}
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                {course.category}
              </Link>
            </Breadcrumbs>
            <Typography variant='h3' fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {course.title}
            </Typography>

            <Typography variant='body1' sx={{ mb: 2, opacity: 0.9 }}>
              {course.shortDescription}
            </Typography>

            <Stack direction='row' spacing={1} alignItems='center' mb={3}>
              <Avatar
                alt={course.instructor.name}
                src={course.instructor.avatarUrl || ''}
                sx={{ width: 32, height: 32 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body1'>Giảng viên: </Typography>
              </Box>
              <Typography variant='body1' sx={{ opacity: 0.9 }}>
                {course.instructor.name}
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3 }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              flexWrap='wrap'
            >
              <Stack direction='row' spacing={1} alignItems='center'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ color: '#FFD700', mr: 0.5 }} />
                  <Typography variant='body1' fontWeight={600}>
                    {course.stats.rating}
                  </Typography>
                </Box>
                <Typography variant='body2' sx={{ opacity: 0.9 }}>
                  ({course.stats.ratingCount} đánh giá)
                </Typography>
              </Stack>

              <Stack direction='row' spacing={1} alignItems='center'>
                <PersonIcon fontSize='small' />
                <Typography variant='body2'>{course.stats.students.toLocaleString()} học viên</Typography>
              </Stack>

              <Stack direction='row' spacing={1} alignItems='center'>
                <UpdateIcon fontSize='small' />
                <Typography variant='body2'>Cập nhật: {course.stats.lastUpdated}</Typography>
              </Stack>
            </Stack>

            <Box my={4} display={{ xs: 'block', lg: 'none' }}>
              <PromoVideo />
            </Box>

            <Stack direction='row' display={{ xs: 'flex', lg: 'none' }} spacing={1} sx={{ my: 2 }}>
              <Button variant='contained' sx={{ width: { xs: '100%', sm: 200 } }}>
                Đăng ký
              </Button>
              <Button variant='outlined' sx={{ width: 42, height: 42, minWidth: 42, p: 0 }}>
                <ShareIcon />
              </Button>
              <Button variant='outlined' sx={{ width: 42, height: 42, minWidth: 42, p: 0 }}>
                <BookmarkBorderIcon />
              </Button>
            </Stack>
          </Box>
          <Box width={350} position='relative' display={{ xs: 'none', lg: 'flex' }}>
            <Box position='absolute' width={350} top={104}>
              <SidebarEnrollCard course={course} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
