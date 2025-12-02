'use client';

import { useEffect } from 'react';
import { useThemeConfig } from '@/contexts/uiConfigContext';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function ElevationScrollConfig() {
  const { setEnableElevationScroll } = useThemeConfig();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const pathname = usePathname();

  useEffect(() => {
    setEnableElevationScroll(!isMobile);
    return () => {
      setEnableElevationScroll(true);
    };
  }, [isMobile, pathname, setEnableElevationScroll]);

  return <Box key={pathname} />;
}
