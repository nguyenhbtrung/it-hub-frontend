'use client';

import { Toolbar, Box, Skeleton } from '@mui/material';
import Logo from '@/components/common/Logo';

export default function NavbarContentSkeleton() {
  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box display='flex' alignItems='center' gap={{ xs: 1, lg: 2 }}>
        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <Skeleton variant='circular' width={40} height={40} />
        </Box>

        {/* Logo */}
        <Logo href='/' />

        <Box sx={{ width: { xs: 0, lg: 40 } }} />

        {/* Search */}
        <Skeleton
          variant='rounded'
          sx={{
            width: {
              xs: 230,
              lg: 300,
            },
            height: 40,
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Desktop Links */}
      <Box display='flex' alignItems='center' gap={1.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Skeleton variant='rounded' width={131} height={40} sx={{ borderRadius: 0.5 }} />

        <Skeleton variant='rounded' width={106} height={40} sx={{ borderRadius: 0.5 }} />

        <Skeleton variant='circular' width={40} height={40} />
      </Box>
    </Toolbar>
  );
}
