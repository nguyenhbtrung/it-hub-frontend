'use client';

import {
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Avatar,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import ViewAllUsersDialog from '../viewAllUsersDialog';
import { User } from '../types';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';
import HowToRegOutlined from '@mui/icons-material/HowToRegOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PeopleIcon from '@mui/icons-material/People';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { getReputationColor, getReputationIcon } from '@/lib/utils/postBadged';
import { roleLabelsMap } from '@/lib/const/user';

interface FollowingUsersProps {
  users: User[];
  totalUsers: number;
}

export default function FollowingUsers({ users, totalUsers }: FollowingUsersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Simple mapping for reputation icons (extend as needed)
  const renderReputationIcon = (iconName?: string) => {
    switch (iconName) {
      case 'whatshot':
        return <WhatshotIcon sx={{ fontSize: 14 }} />;
      case 'thumb_up':
        return <ThumbUpIcon sx={{ fontSize: 14 }} />;
      case 'people':
        return <PeopleIcon sx={{ fontSize: 14 }} />;
      default:
        return <WhatshotIcon sx={{ fontSize: 14 }} />;
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          mb: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            p: 3,
            borderBottom: '1px solid',
            borderColor: 'divider',
            gap: 2,
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            Người dùng đang theo dõi
          </Typography>
          <TextField
            placeholder='Tìm người dùng...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size='small'
            sx={{ width: { xs: '100%', sm: 256 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon color='action' />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Users Grid */}
        <Stack direction='column'>
          {filteredUsers.map((user) => (
            <Stack
              key={user.id}
              direction='row'
              justifyContent='space-between'
              sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}
            >
              <Stack direction='row' gap={2}>
                <Avatar src={user.avatarUrl} sx={{ width: 50, height: 50 }} />
                <Stack gap={0.5} justifyContent={'center'}>
                  <Typography variant='body2' fontWeight={600}>
                    {user.name}
                  </Typography>
                  <Stack direction='row' alignItems={'center'} gap={1}>
                    <Chip
                      icon={<Box display={'flex'}>{getReputationIcon(user.reputationLevel)}</Box>}
                      label={user.reputation}
                      sx={{ height: 20, ...getReputationColor(user.reputationLevel) }}
                    />
                    <Typography variant='caption' color='text.secondary'>
                      •
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {roleLabelsMap[user.role]}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <IconButton
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'hero.main',
                  color: 'primary.main',
                }}
                title='Bỏ theo dõi'
              >
                <HowToRegOutlined />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        {/* View All Button */}
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Button
            onClick={() => setDialogOpen(true)}
            sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
          >
            Xem tất cả {totalUsers} người dùng
          </Button>
        </Box>
      </Paper>

      {/* Dialog */}
      <ViewAllUsersDialog open={dialogOpen} onClose={() => setDialogOpen(false)} totalUsers={totalUsers} />
    </>
  );
}
