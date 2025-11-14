'use client';
import { AppBar } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from 'react';

interface Props {
  children: React.ReactElement<{ elevation?: number; color?: string }>;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? 'inherit' : 'transparent',
  });
}

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ElevationScroll>
      <AppBar position='fixed' color='inherit' elevation={0}>
        {children}
      </AppBar>
    </ElevationScroll>
  );
}
