'use client';
import { ElevationScrollWrapper } from '@/components/common/elevationScrollWrapper';
import { AppBar } from '@mui/material';
import React from 'react';

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ElevationScrollWrapper>
      <AppBar position='fixed' color='inherit' elevation={0}>
        {children}
      </AppBar>
    </ElevationScrollWrapper>
  );
}
