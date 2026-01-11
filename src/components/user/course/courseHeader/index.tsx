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
import NextLink from '@/components/common/Link';
import { getCourseDetail, getUserEnrollmentStatus } from '@/services/course.service';
import { toLocaleDateString } from '@/lib/utils/formatDatetime';
import { notFound } from 'next/navigation';
import CourseHeaderAction from './action';

export default async function CourseHeader({ courseId }: { courseId: string }) {
  const res = await getCourseDetail(courseId, 'student');
  if (!res.success) {
    notFound();
  }
  const course = res?.data;
  const enrollmentRes = await getUserEnrollmentStatus(courseId);
  const enrollmentStatus = enrollmentRes?.data;
  return (
    <Box
      sx={{
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
                href={`/category/${course?.category?.slug}`}
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                {course?.category?.name}
              </Link>
              <Link
                color='inherit'
                underline='hover'
                href={`/category/${course?.subCategory?.slug}`}
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                {course?.subCategory?.name}
              </Link>
            </Breadcrumbs>
            <Typography variant='h3' fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {course?.title}
            </Typography>

            <Typography variant='body1' sx={{ mb: 2, opacity: 0.9 }}>
              {course?.shortDescription}
            </Typography>

            <Stack direction='row' spacing={1} alignItems='center' mb={3}>
              <Avatar
                alt={course?.instructor?.fullname}
                src={course?.instructor?.avatarUrl || ''}
                sx={{ width: 32, height: 32 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body1'>Giảng viên: </Typography>
              </Box>
              <Typography variant='body1' sx={{ opacity: 0.9 }}>
                {course?.instructor?.fullname}
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
                    {course?.avgRating?.toFixed(1)}
                  </Typography>
                </Box>
                <Typography variant='body2' sx={{ opacity: 0.9 }}>
                  ({course?.reviewCount} đánh giá)
                </Typography>
              </Stack>

              <Stack direction='row' spacing={1} alignItems='center'>
                <PersonIcon fontSize='small' />
                <Typography variant='body2'>{course?.students.toLocaleString()} học viên</Typography>
              </Stack>

              <Stack direction='row' spacing={1} alignItems='center'>
                <UpdateIcon fontSize='small' />
                <Typography variant='body2'>Cập nhật: {toLocaleDateString(new Date(course?.updatedAt))}</Typography>
              </Stack>
            </Stack>

            <Box my={4} display={{ xs: 'block', lg: 'none' }}>
              <PromoVideo src={course?.promoVideo?.url} thumb={course?.promoVideo?.metadata?.thumbnails?.[0]} />
            </Box>

            <Stack direction='row' display={{ xs: 'flex', lg: 'none' }} spacing={1} sx={{ my: 2 }}>
              <CourseHeaderAction course={course} enrollmentStatus={enrollmentStatus} courseId={courseId} />
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
              <SidebarEnrollCard course={course} enrollmentStatus={enrollmentStatus} courseId={courseId} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
