// 'use client';

import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  LinearProgress,
  Avatar,
  Stack,
  Button,
  CardActionArea,
} from '@mui/material';
import {
  PlayCircle,
  AppRegistration,
  Verified,
  Equalizer,
  Timelapse,
  EventNote,
  MoreVert,
  Code,
  DataObject,
  DesignServices,
  Storage,
} from '@mui/icons-material';
import Link from 'next/link';
import { Course } from '../types';
import { getLevelLabel, getLevelColor } from '../data';
import Image from 'next/image';

interface CourseCardProps {
  course: Course;
  status: 'in-progress' | 'registered' | 'completed';
}

export default function CourseCard({ course, status }: CourseCardProps) {
  //   const theme = useTheme();

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      code: <Code />,
      data_object: <DataObject />,
      design_services: <DesignServices />,
      database: <Storage />,
    };
    return iconMap[iconName] || <Code />;
  };

  //   const getStatusIcon = () => {
  //     switch (status) {
  //       case 'in-progress':
  //         return <Timelapse sx={{ color: theme.palette.primary.main, fontSize: 20 }} />;
  //       case 'registered':
  //         return <EventNote sx={{ color: theme.palette.warning.main, fontSize: 20 }} />;
  //       case 'completed':
  //         return <Verified sx={{ color: theme.palette.success.main, fontSize: 20 }} />;
  //       default:
  //         return null;
  //     }
  //   };

  const getStatusContent = () => {
    switch (status) {
      case 'in-progress':
        return (
          <>
            <Stack direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
              <Stack direction='row' alignItems='center' gap={0.5}>
                <Timelapse sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant='caption' color='text.secondary'>
                  Đang học
                </Typography>
              </Stack>
              <Typography variant='caption' color='text.secondary' fontWeight='medium'>
                {course.progress}%
              </Typography>
            </Stack>
            <LinearProgress
              variant='determinate'
              value={course.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'grey.100',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                },
              }}
            />
          </>
        );

      case 'registered':
        return (
          <Stack
            direction='row'
            alignItems='center'
            gap={2}
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'grey.50',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <EventNote sx={{ color: 'warning.main', fontSize: 24 }} />
            <Box>
              <Typography variant='caption' color='text.secondary'>
                Ngày đăng ký:
              </Typography>
              <Typography variant='body2' fontWeight='medium'>
                {course.registrationDate}
              </Typography>
            </Box>
          </Stack>
        );

      case 'completed':
        return (
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'success.light',
              border: 1,
              borderColor: 'success.main',
            }}
          >
            <Stack direction='row' alignItems='center' gap={2}>
              <Verified sx={{ color: 'success.main', fontSize: 24 }} />
              <Typography variant='body2' fontWeight='medium' color='success.dark'>
                Đã hoàn thành
              </Typography>
            </Stack>
            <Typography variant='caption' color='success.dark'>
              {course.completedDate}
            </Typography>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, transform 0.2s',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
          opacity: 1,
        },
        opacity: status === 'completed' ? 0.8 : 1,
      }}
    >
      {/* Phần hình ảnh */}
      <Box
        sx={{
          width: { sm: 256 },
          height: { xs: 192, sm: 'auto' },
          flexShrink: 0,
          position: 'relative',
          background: course.color,
          overflow: 'hidden',
        }}
      >
        {/* Next Image (responsive fill) */}
        {course.image ? (
          <Box sx={{ position: 'absolute', inset: 0 }}>
            <Image
              src={course.image}
              alt={course.title || course.category || 'course image'}
              fill
              style={{ objectFit: 'cover' }}
              sizes='(max-width:600px) 100vw, 256px'
              priority={false}
            />
            {/* optional dark overlay to keep icon/labels readable */}
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.15)' }} />
          </Box>
        ) : (
          /* Fallback: icon centered when no image */
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            <Box sx={{ fontSize: 64 }}>{getIconComponent(course.icon)}</Box>
          </Box>
        )}

        {/* Badge category */}
        <Chip
          label={course.category}
          size='small'
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            color: 'white',
            fontSize: '0.625rem',
            fontWeight: 'bold',
            zIndex: 5,
          }}
        />

        {/* Badge completed */}
        {status === 'completed' && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 6,
            }}
          >
            <Box sx={{ bgcolor: 'success.main', color: 'white', p: 1, borderRadius: '50%', boxShadow: 3 }}>
              <Verified sx={{ fontSize: 32 }} />
            </Box>
          </Box>
        )}
      </Box>

      {/* Phần nội dung */}
      <CardContent sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start' sx={{ mb: 2 }}>
          <Link href={`/courses/${course.slug}`} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                },
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {course.title}
            </Typography>
          </Link>
          <Button size='small' sx={{ minWidth: 'auto', color: 'text.secondary' }}>
            <MoreVert />
          </Button>
        </Stack>

        {/* Thông tin giảng viên và level */}
        <Stack direction='row' alignItems='center' flexWrap='wrap' gap={2} sx={{ mb: 3 }}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Avatar src={`https://i.pravatar.cc/40?img=${course.instructor.id}`} sx={{ width: 24, height: 24 }} />
            <Typography variant='body2' color='text.secondary'>
              Giảng viên:{' '}
              <Typography component='span' variant='body2' fontWeight='medium'>
                {course.instructor.name}
              </Typography>
            </Typography>
          </Stack>

          <Chip
            icon={<Equalizer sx={{ fontSize: 16 }} />}
            label={getLevelLabel(course.level)}
            size='small'
            color={getLevelColor(course.level) as any}
            variant='outlined'
            sx={{ fontSize: '0.75rem' }}
          />
        </Stack>

        {/* Phần trạng thái */}
        <Box sx={{ mt: 'auto' }}>{getStatusContent()}</Box>
      </CardContent>
    </Card>
  );
}
