'use client';
import { useThemeConfig } from '@/contexts/uiConfigContext';
import { SxProps, Theme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React from 'react';

interface ChildProps {
  elevation?: number;
  color?: string;
  sx?: SxProps<Theme>;
  [key: string]: string | number | SxProps<Theme> | undefined;
}

interface Props {
  children: React.ReactElement<ChildProps>;
}

export function ElevationScrollWrapper(props: Props) {
  const { children } = props;
  const { enableElevationScroll } = useThemeConfig();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  if (!enableElevationScroll) {
    return React.cloneElement(children, {
      elevation: 0,
      color: 'inherit',
      sx: {
        borderBottom: '1px solid',
        borderColor: 'divider',
      },
    });
  }

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    color: trigger ? 'inherit' : 'transparent',
  });
}
