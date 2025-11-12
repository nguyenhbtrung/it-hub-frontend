import { Typography, Card, CardContent, CardHeader, CardActions, Chip, Button, Stack, Skeleton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import { CourseCardProps } from '@/types/course';
import Link from '@/components/common/Link';

export function CourseCard({ course }: CourseCardProps) {
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
      {/* Header / Image */}
      <CardHeader
        sx={{
          p: 0,
          bgcolor: 'primary.light',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
          fontSize: '3.5rem',
          borderRadius: 0.5,
        }}
        title={course.image}
      />

      <CardContent sx={{ py: 3, px: 1, flexGrow: 1 }}>
        <Stack direction='row' gap={1} justifyContent='space-between' mb={2} sx={{ flexWrap: 'wrap' }}>
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

        <Typography variant='subtitle1' fontWeight={600} gutterBottom sx={{ minHeight: 48 }}>
          {course.title}
        </Typography>

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
      </CardContent>

      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* <Typography
                  variant='body2'
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  {course.price}
                </Typography> */}
        <Button
          component={Link}
          href={`/course/${course.id}`}
          variant='contained'
          size='small'
          sx={{ whiteSpace: 'nowrap' }}
        >
          Xem chi tiết
        </Button>
      </CardActions>
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
      <CardHeader
        sx={{
          p: 0,
          bgcolor: 'grey.200',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
          borderRadius: 0.5,
        }}
        title={<Skeleton variant='rectangular' width='100%' height={180} />}
      />

      <CardContent sx={{ py: 3, px: 1, flexGrow: 1 }}>
        {/* Chips */}
        <Stack direction='row' gap={1} justifyContent='space-between' mb={2} sx={{ flexWrap: 'wrap' }}>
          <Skeleton variant='rounded' width={60} height={24} />
          <Skeleton variant='rounded' width={60} height={24} />
        </Stack>

        {/* Title */}
        <Skeleton variant='text' width='80%' height={24} />

        {/* Stats */}
        <Stack direction='row' gap={2} alignItems='center' color='text.secondary' sx={{ flexWrap: 'wrap', mt: 3 }}>
          <Skeleton variant='text' width={40} />
          <Skeleton variant='text' width={40} />
          <Skeleton variant='text' width={40} />
        </Stack>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Skeleton variant='rounded' width={100} height={38.75} />
      </CardActions>
    </Card>
  );
}
