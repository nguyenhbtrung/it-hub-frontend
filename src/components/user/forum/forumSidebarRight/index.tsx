'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Stack,
  Link,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useState } from 'react';

const topUsers = [
  {
    id: 1,
    name: 'Nguyễn Hoàng Nam',
    points: '2,140',
    avatar: 'https://picsum.photos/300?random=1',
    rank: 1,
  },
  {
    id: 2,
    name: 'Trần Thị Bích',
    points: '1,890',
    avatar: 'https://picsum.photos/300?random=2',
    rank: 2,
  },
  {
    id: 3,
    name: 'Lê Quốc Bảo',
    points: '1,540',
    avatar: 'https://picsum.photos/300?random=3',
    rank: 3,
  },
];

const hotTopics = ['#AI & MachineLearning', '#CyberSecurity', '#WebDev', '#CareerAdvice', '#Python'];

export default function ForumSidebarRight() {
  const [following, setFollowing] = useState<number[]>([]);

  const toggleFollow = (userId: number) => {
    setFollowing((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return { bgcolor: 'warning.main', color: 'warning.contrastText' };
      case 2:
        return { bgcolor: 'grey.400', color: 'grey.900' };
      case 3:
        return { bgcolor: 'secondary.dark', color: 'common.white' };
      default:
        return { bgcolor: 'grey.400', color: 'grey.900' };
    }
  };

  return (
    <Stack spacing={3} sx={{ position: 'sticky', top: 96 }}>
      {/* Top thành viên */}
      <Card
        sx={{
          p: 0,
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent>
          <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
            <Typography variant='h6' fontWeight='bold'>
              Top Thành viên Tuần
            </Typography>
            <Link
              href='#'
              underline='hover'
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                fontSize: '0.75rem',
              }}
            >
              Xem tất cả
            </Link>
          </Stack>

          <Stack spacing={2}>
            {topUsers.map((user) => (
              <Stack key={user.id} direction='row' alignItems='center' spacing={2}>
                <Box position='relative'>
                  <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      border: 2,
                      borderColor: 'common.white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.625rem',
                      fontWeight: 'bold',
                      ...getRankBadge(user.rank),
                    }}
                  >
                    {user.rank}
                  </Box>
                </Box>

                <Box flex={1}>
                  <Typography variant='body2' fontWeight='bold' noWrap>
                    {user.name}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {user.points} điểm
                  </Typography>
                </Box>

                <Tooltip title='Theo dõi'>
                  <IconButton
                    onClick={() => toggleFollow(user.id)}
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: following.includes(user.id) ? 'primary.main' : 'primary.lighter',
                      color: following.includes(user.id) ? 'common.white' : 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'common.white',
                      },
                    }}
                  >
                    <AddIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Chủ đề nóng */}
      <Card
        sx={{
          p: 0,
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent>
          <Typography variant='h6' fontWeight='bold' mb={2}>
            Chủ đề Nóng
          </Typography>

          <Stack gap={1} direction='row' flexWrap='wrap'>
            {hotTopics.map((topic, index) => (
              <Chip
                key={index}
                label={topic}
                component='a'
                href='#'
                clickable
                sx={{
                  justifyContent: 'flex-start',
                  height: 36,
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' },
                }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
