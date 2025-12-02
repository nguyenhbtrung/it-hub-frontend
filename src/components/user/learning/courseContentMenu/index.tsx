'use client';

import Sidebar from './sidebar';
import MobileMenu from './mobileMenu';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useThemeConfig } from '@/contexts/uiConfigContext';
import { usePathname } from 'next/navigation';

export default function CourseContentMenu() {
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

  return (
    <Box display='flex' key={pathname}>
      <Sidebar />
      <MobileMenu />
    </Box>
  );
}
