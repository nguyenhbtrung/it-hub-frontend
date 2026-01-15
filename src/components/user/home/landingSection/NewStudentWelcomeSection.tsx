'use client';

import { Avatar, Box, Typography, Stack, Button, Card, useTheme, useMediaQuery, IconButton } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import MemoryIcon from '@mui/icons-material/Memory';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TopicCard } from './TopicCard';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { jwtPayload } from '@/types/jwt';

const topics = [
  {
    icon: <CodeIcon />,
    label: 'Lập trình Web',
    image: '/images/topics/webdev.png',
    href: '/categories/web-dev',
  },
  {
    icon: <DataObjectIcon />,
    label: 'Khoa học dữ liệu',
    image: '/images/topics/datascience.png',
    href: '/categories/data-science',
  },
  {
    icon: <MemoryIcon />,
    label: 'AI & Machine Learning',
    image: '/images/topics/ai.png',
    href: '/categories/data-science',
  },
  {
    icon: <BrushIcon />,
    label: 'UI/UX Design',
    image: '/images/topics/uiux.png',
    href: '/categories/design',
  },
];

interface NewStudentWelcomeSectionProps {
  user: any;
}

export default function NewStudentWelcomeSection({ user }: NewStudentWelcomeSectionProps) {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  const name = user?.name || user?.fullname || 'Sinh viên';

  const swiperConfig = {
    slidesPerView: isSmallMobile ? 1 : isMedium ? 2 : 3,
    spaceBetween: isSmallMobile ? 8 : 16,
    navigation: !isSmallMobile ? { prevEl: '.custom-prev-button', nextEl: '.custom-next-button' } : false,
    pagination: isSmallMobile
      ? {
          clickable: true,
          dynamicBullets: true,
        }
      : false,
    modules: [Navigation, Pagination],
  };

  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: { xs: 3, md: 4 },
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* LEFT - Welcome Section */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            textAlign: { xs: 'center', md: 'left' },
            width: '100%',
            maxWidth: { xs: '400px', md: 'none' },
          }}
        >
          <Stack
            direction='column'
            spacing={2}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
          >
            <Avatar
              src={user?.avatar?.url || null}
              sx={{
                width: { xs: 56, sm: 64, md: 64 },
                height: { xs: 56, sm: 64, md: 64 },
                // bgcolor: 'primary.main',
              }}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                variant='h4'
                fontWeight={700}
                sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}
              >
                Chào mừng, {name}!
              </Typography>
              <Typography mt={1} color='text.secondary' sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Chọn một chủ đề để bắt đầu hành trình công nghệ của bạn.
              </Typography>
            </Box>
          </Stack>

          {/* <Button
            variant='contained'
            size='large'
            startIcon={<ExploreIcon />}
            sx={{
              mt: 3,
              width: { xs: '100%', sm: 'auto' },
              px: { xs: 2, sm: 3 },
            }}
          >
            Khám phá tất cả khóa học
          </Button> */}
        </Box>

        {/* RIGHT  */}
        <Card
          sx={{
            flex: { xs: 'none', md: 2 },
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            width: '100%',
            maxWidth: { xs: '400px', sm: '600px', md: 'none' },
          }}
        >
          <Typography variant='h5' fontWeight={700} mb={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            Bắt đầu với một chủ đề
          </Typography>

          {/* Swiper Carousel */}
          <Box
            sx={{
              width: '100%',
              position: 'relative',
              '& .custom-prev-button, & .custom-next-button': {
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                zIndex: 10,
                padding: '10px',
                outline: 'none',
                userSelect: 'none',
                // WebkitUserSelect: 'none',
                // MozUserSelect: 'none',
                // msUserSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                // Tránh focus khi mouse down
                // '&:focus': { outline: 'none' },
                // '&:focus-visible': { outline: 'none' },
                // '&:active': { outline: 'none' },
              },
              '& .custom-prev-button': {
                left: 0,
              },
              '& .custom-next-button': {
                right: 0,
              },
            }}
          >
            <Swiper {...swiperConfig}>
              {topics.map((topic, index) => (
                <SwiperSlide key={index}>
                  <Box sx={{ p: 0.5 }}>
                    <TopicCard topic={topic} />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='custom-prev-button'>
              <IconButton
                sx={{
                  bgcolor: 'background.default',
                  display: { xs: 'none', sm: 'flex' },
                  '&:hover': {
                    bgcolor: 'customBackground.1',
                  },
                }}
              >
                <ArrowBackIosIcon style={{ color: 'background.contrastText' }} />
              </IconButton>
            </div>

            <div className='custom-next-button'>
              <IconButton
                sx={{
                  bgcolor: 'background.default',
                  display: { xs: 'none', sm: 'flex' },
                  '&:hover': {
                    bgcolor: 'customBackground.1',
                  },
                }}
              >
                <ArrowForwardIosIcon style={{ color: 'background.contrastText' }} />
              </IconButton>
            </div>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
