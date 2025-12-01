'use client';

import { useState } from 'react';
import { Drawer, Button, Box, Paper, IconButton } from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';

import MenuContent from './menuContent';

export default function MobileMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Box
        sx={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          height: { xs: 56, sm: 64 },
          width: '100%',
          bgcolor: 'background.default',
          px: 2,
          zIndex: 1000,
        }}
      >
        <IconButton onClick={handleToggleMenu}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
      <Box
        sx={{
          height: { xs: 56, sm: 64 },
        }}
      />
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
        <MenuContent />
      </Drawer>
    </Box>
  );
}
