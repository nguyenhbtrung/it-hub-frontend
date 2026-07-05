'use client';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { TopBarProps } from '@/types/navigation.admin';
import { Suspense } from 'react';
import Link from '@/components/common/Link';
import AdminProfileMenu from './adminProfileMenu';

export default function TopBar({ onMenuClick, profilePromise }: TopBarProps) {
  return (
    <AppBar
      elevation={0}
      position='fixed'
      color='inherit'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        pl: 0,
      }}
    >
      <Toolbar>
        {/* Open menu button */}
        <IconButton color='inherit' aria-label='open drawer' onClick={onMenuClick} edge='start' sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Link href={'/admin'} passHref>
          <Typography variant='h6' fontWeight='700' color='primary' noWrap component='div'>
            IT Hub Admin
          </Typography>
        </Link>

        {/* Search bar */}
        {/* <Box
          display='flex'
          alignItems='center'
          bgcolor='search.main'
          borderRadius='3px'
          sx={{ display: { xs: 'none', md: 'flex' }, ml: { xs: 4, md: 6, lg: 12 } }}
        >
          <InputBase placeholder='Tìm kiếm...' sx={{ ml: 2, flex: 1 }} />
          <IconButton type='button' sx={{ p: 1 }}>
            <SearchOutlined />
          </IconButton>
        </Box> */}

        {/* Left buttons */}
        <Box display='flex' alignItems='center' gap={2} ml='auto'>
          {/* Toggle theme */}
          {/* <IconButton onClick={handleToggleTheme}>{darkMode ? <DarkModeOutlined /> : <LightModeOutlined />}</IconButton> */}

          {/* Notifications */}
          {/* <IconButton>
            <NotificationsOutlined />
          </IconButton> */}

          {/* Profile */}
          <Suspense>
            <AdminProfileMenu profilePromise={profilePromise} />
          </Suspense>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
