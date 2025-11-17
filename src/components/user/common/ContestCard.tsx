import { Typography, Card, CardContent, CardHeader, CardActions, Chip, Button, Stack, Skeleton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import Link from '@/components/common/Link';
import { ContestCardProps } from '@/types/contest';
import { getDiffTime, toLocaleDateString } from '@/lib/utils/formatDatetime';
import Image from 'next/image';

export function ContestCard({ contest }: ContestCardProps) {
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
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 180,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Image src={contest.image} alt={contest.title} fill style={{ objectFit: 'cover' }} />
      </div>

      <CardContent sx={{ py: 3, px: 1, flexGrow: 1 }}>
        <Stack direction='row' gap={1} justifyContent='space-between' mb={2} sx={{ flexWrap: 'wrap' }}>
          <Chip label={contest.status} size='small' sx={{ fontWeight: 500, bgcolor: '#dcfce7', color: '#008236' }} />
          <Chip
            label={contest.category}
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
          {contest.title}
        </Typography>

        <Stack direction='column' gap={2} color='text.secondary' sx={{ flexWrap: 'wrap' }}>
          <Stack direction='row' alignItems='center' spacing={0.5} sx={{ flexShrink: 0 }}>
            <GroupIcon fontSize='small' />
            <Typography variant='body2'>{contest.participants.toLocaleString()} người tham gia</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5} sx={{ flexShrink: 0 }}>
            <EventIcon fontSize='small' />
            <Typography variant='body2'>Bắt đầu: {toLocaleDateString(contest.startTime)}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={0.5} sx={{ flexShrink: 0 }}>
            <AccessTimeIcon fontSize='small' />
            <Typography variant='body2'>Thời lượng: {getDiffTime(contest.startTime, contest.endTime)}</Typography>
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
        <Button
          component={Link}
          href={`/contests/${contest.id}`}
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

export function ContestCardSkeleton() {
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
        <Stack direction='column' gap={1} color='text.secondary' sx={{ flexWrap: 'wrap', mt: 3 }}>
          <Skeleton variant='text' width={160} sx={{ mb: 0.5 }} />
          <Skeleton variant='text' width={160} sx={{ mb: 0.5 }} />
          <Skeleton variant='text' width={160} />
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
