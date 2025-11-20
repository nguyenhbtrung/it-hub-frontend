'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  SearchOutlined,
  NotificationsOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  PersonOutline,
  SettingsOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import { TopBarProps } from '@/types/navigation.admin';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Link from '@/components/common/Link';

export default function TopBar({ onMenuClick }: TopBarProps) {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    // TODO: call context or props to toggle global theme mode
  };

  // State for menu profile
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Box
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
        </Box>

        {/* Left buttons */}
        <Box display='flex' alignItems='center' gap={2} ml='auto'>
          {/* Toggle theme */}
          <IconButton onClick={handleToggleTheme}>{darkMode ? <DarkModeOutlined /> : <LightModeOutlined />}</IconButton>

          {/* Notifications */}
          <IconButton>
            <NotificationsOutlined />
          </IconButton>

          {/* Profile */}
          <Box display='flex' alignItems='center' gap={1} sx={{ cursor: 'pointer' }} onClick={handleProfileClick}>
            <Avatar alt='Admin' src='/avatar.png' />
            <Typography variant='body1' noWrap>
              Admin
            </Typography>
          </Box>

          {/* Menu Profile */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            disableScrollLock
            slotProps={{
              paper: {
                sx: {
                  width: 150,
                  borderRadius: 0.5,
                },
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonOutline />
              </ListItemIcon>
              <ListItemText primary='Profile' slotProps={{ primary: { sx: { fontSize: '0.875rem' } } }} />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText primary='Settings' slotProps={{ primary: { sx: { fontSize: '0.875rem' } } }} />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary='Logout' slotProps={{ primary: { sx: { fontSize: '0.875rem' } } }} />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
