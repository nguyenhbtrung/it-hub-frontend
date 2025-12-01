'use client';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from 'react';

interface Props {
  children: React.ReactElement<{ elevation?: number; color?: string }>;
}

export function ElevationScrollWrapper(props: Props) {
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
