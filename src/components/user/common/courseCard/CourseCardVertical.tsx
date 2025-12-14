import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Chip,
  Button,
  Stack,
  Skeleton,
  Box,
  CardActionArea,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import { CourseCardProps } from '@/types/course';
import Link from '@/components/common/Link';
import Image from 'next/image';

export function CourseCardVertical({ course }: CourseCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 1,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        transition: 'transform 0.25s, box-shadow 0.25s',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        component='a'
        href={`/courses/${course.id}`}
        target='_blank'
        rel='noopener noreferrer'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 180,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Image src={course.image} alt={course.title} fill style={{ objectFit: 'cover' }} />
        </div>

        <CardContent
          sx={{
            pt: 3,
            pb: 1,
            px: 1,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant='subtitle1' fontWeight={600} gutterBottom>
              {course.title}
            </Typography>
            <Typography variant='subtitle2' fontWeight={400} color='text.secondary' gutterBottom>
              {course.instructor}
            </Typography>
          </Box>

          <Box sx={{ py: 1 }}>
            <Stack direction='row' gap={1} mb={2} sx={{ flexWrap: 'wrap' }}>
              <Chip label={course.category} size='small' color='secondary' sx={{ fontWeight: 500 }} />
              <Chip
                label={course.level}
                size='small'
                variant='outlined'
                sx={{
                  fontWeight: 500,
                  borderColor: 'divider',
                  color: 'text.secondary',
                }}
              />
            </Stack>
            <Stack direction='row' gap={2} alignItems='center' color='text.secondary' sx={{ flexWrap: 'wrap' }}>
              <Stack direction='row' alignItems='center' spacing={0.5} sx={{ flexShrink: 0 }}>
                <GroupIcon fontSize='small' />
                <Typography variant='body2'>{course.students.toLocaleString()}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={0.5} sx={{ flexShrink: 0 }}>
                <StarIcon fontSize='small' sx={{ color: '#FFD700', fill: '#FFD700' }} />
                <Typography variant='body2'>{course.rating}</Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={0.5} sx={{ flexShrink: 0 }}>
                <AccessTimeIcon fontSize='small' />
                <Typography variant='body2'>{course.duration}</Typography>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>

      {/* <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
                  variant='body2'
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  {course.price}
                </Typography>
        <Button
          component={Link}
          href={`/courses/${course.id}`}
          variant='contained'
          size='small'
          sx={{ whiteSpace: 'nowrap' }}
        >
          Xem chi tiết
        </Button>
      </CardActions> */}
    </Card>
  );
}

export function CourseCardSkeleton() {
  return (
    <Card
      elevation={0}
      sx={{
        p: 1,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      {/* Header / Image Skeleton */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 180,
            borderRadius: 0.5,
            overflow: 'hidden',
            bgcolor: 'grey.200',
          }}
        >
          <Skeleton variant='rectangular' width='100%' height={180} />
        </Box>

        <CardContent
          sx={{
            pt: 3,
            pb: 2,
            px: 1,
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            '&:last-child': {
              pb: 2,
            },
          }}
        >
          {/* Title */}
          <Box mb={1.4}>
            <Skeleton variant='text' width='80%' height={24} />
            <Skeleton variant='text' width='50%' height={24} />
          </Box>

          {/* Chips */}
          <Stack direction='row' gap={1} mb={1} sx={{ flexWrap: 'wrap' }}>
            <Skeleton variant='rounded' width={60} height={24} />
            <Skeleton variant='rounded' width={60} height={24} />
          </Stack>

          {/* Stats */}
          <Stack direction='row' gap={2} alignItems='center' color='text.secondary' sx={{ flexWrap: 'wrap', mt: 0.7 }}>
            <Skeleton variant='text' width={40} />
            <Skeleton variant='text' width={40} />
            <Skeleton variant='text' width={40} />
          </Stack>
        </CardContent>
      </Box>

      {/* Actions */}
      {/* <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Skeleton variant='rounded' width={100} height={38.75} />
      </CardActions> */}
    </Card>
  );
}
