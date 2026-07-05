'use client';

import {
  Avatar,
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Grid,
  IconButton,
} from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { CourseCardHorizontal } from '../../common/courseCard/courseCardHorizontal';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';

import Link from '@/components/common/Link';

interface EnrolledWelcomeSectionProps {
  user: any;
  courses: any[];
}

export default function EnrolledWelcomeSection({ user, courses }: EnrolledWelcomeSectionProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const name = user?.name || user?.fullname || user?.email || 'Sinh viên';

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <Box sx={{ py: 6, px: { xs: 0, md: 4 } }}>
      {/* ======== ROW 1 ======== */}
      <Box
        sx={{
          py: { xs: 0, sm: 3 },
        }}
      >
        <Stack direction='row' spacing={{ xs: 0, sm: 2 }} alignItems='flex-start'>
          <Avatar
            src={user?.avatar?.url || null}
            sx={{ bgcolor: 'primary.main', width: 64, height: 64, display: { xs: 'none', sm: 'flex' } }}
          >
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
            Các khoá học bạn đang học
          </Typography>
          <Button LinkComponent={Link} href='/profile#course-list' variant='text'>
            Xem tất cả
          </Button>
        </Box>

        {/* DESKTOP*/}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid' },
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: '1fr ',
              lg: '1fr 1fr ',
            },
          }}
        >
          {/* {learning.map((course: courseProgress) => (
            <CourseProgressCard course={course} key={course.courseId} />
          ))} */}

          {courses.map((course: any) => (
            <CourseCardHorizontal key={course.id} course={course} />
          ))}
        </Box>

        {/* MOBILE */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'relative' }}>
          <IconButton
            onClick={() => swiper?.slidePrev()}
            disabled={isBeginning}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 40,
              height: 40,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 2,

              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            <ArrowBackIosNewIcon fontSize='small' />
          </IconButton>

          <IconButton
            onClick={() => swiper?.slideNext()}
            disabled={isEnd}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 40,
              height: 40,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 2,

              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            <ArrowForwardIosIcon fontSize='small' />
          </IconButton>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => {
              setSwiper(swiper);
              updateNavigationState(swiper);
            }}
            onSlideChange={(swiper) => {
              updateNavigationState(swiper);
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={false}
            spaceBetween={16}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1.2,
              },
              550: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2.2,
              },
            }}
          >
            {/* {items.map((item) => (
              <SwiperSlide key={item.productId}>
                {item.skeleton ? <ProductCardSkeleton /> : <ProductCard product={item} />}
              </SwiperSlide>
            ))} */}

            {courses.map((course: any) => (
              <SwiperSlide key={course.id}>
                <CourseCardHorizontal key={course.id} course={course} mobileVariant='compact' />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
}
