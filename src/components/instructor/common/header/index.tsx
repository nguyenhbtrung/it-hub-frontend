'use client';

import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Button, InputBase, Box, Paper } from '@mui/material';
import { Search, Notifications, ChatBubble, School } from '@mui/icons-material';
import Link from '@/components/common/Link';

export default function Header() {
  const [search, setSearch] = useState('');

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        backgroundColor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(8px)',
        height: 64,
      }}
    >
      <Toolbar sx={{ px: 4, gap: 4 }}>
        {/* Search Bar */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 384,
              height: 40,
              px: 2,
              borderRadius: 1,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Search sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder='Tìm kiếm...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                flex: 1,
                fontSize: '0.875rem',
                '& input::placeholder': {
                  color: 'text.secondary',
                },
              }}
            />
          </Paper>
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            href={'/'}
            variant='outlined'
            startIcon={<School />}
            sx={{
              height: 40,
              borderColor: 'divider',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'divider',
                backgroundColor: 'action.hover',
              },
            }}
          >
            Trang học viên
          </Button>

          <IconButton
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'action.hover',
              '&:hover': { backgroundColor: 'action.selected' },
            }}
          >
            <Notifications sx={{ color: 'text.secondary', fontSize: 20 }} />
          </IconButton>

          <IconButton
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'action.hover',
              '&:hover': { backgroundColor: 'action.selected' },
            }}
          >
            <ChatBubble sx={{ color: 'text.secondary', fontSize: 20 }} />
          </IconButton>

          <Avatar
            alt='John Doe'
            // src='https://lh3.googleusercontent.com/aida-public/AB6AXuAcpKObBX9MmO5HCxOOmwfonrtISJcndXI4Dvj_BUqXF_PUUSHKIn0jqMgm2_6baEWi5GIceJNZyC2csc9MzlJfa06m-_CBZRezw94N1MUBcx_Z2KR8Amr4VPvFjEmFMqDigx8aZG7oSm1RgnGdFyc8INk--CZecEQTBmfogPnQ-3m0_NZMzpnXx6i1G54OBjT9t61olHdjF_10i9tuj5UdgywF0jDMc3xWsguWR4KmS0dC2ytGMpWxcsTlHTBTJ5E3LU1nC3Fxiyo'
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
