'use client';

import { useState } from 'react';
import { Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import TopBar from '../topbar';
import Sidebar from '../sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar onMenuClick={handleDrawerToggle} />
      <Sidebar open={open} onClose={handleDrawerClose} isMobile={isMobile} />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          // width: '100%',
          minHeight: '100vh',
          backgroundColor: 'customBackground.4',
          width: `calc(100% - ${open ? '240px' : `calc(${theme.spacing(7)} + 1px)`})`,
          // transition: theme.transitions.create('width', {
          //   easing: theme.transitions.easing.sharp,
          //   duration: theme.transitions.duration.leavingScreen,
          // }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
