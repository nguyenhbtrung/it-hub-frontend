'use client';
import { useState } from 'react';
import { Button, Box, Paper, Typography, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Link from '@/components/common/Link';
import LinkButton from '@mui/material/Link';
import { navItems } from '@/data/navigation/userNavItems';

const navButtonSx = {
  color: 'text.primary',
  fontWeight: 500,
  '&:hover': {
    color: 'primary.dark',
    backgroundColor: 'color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)',
    boxShadow: 'none',
  },
};

const megaMenuSx = {
  position: 'fixed',
  top: 64,
  left: 0,
  right: 0,
  zIndex: 1300,
  // background: 'white',
  borderTop: '1px solid',
  borderColor: 'divider',
  borderRadius: 0,
  boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
};

export default function NavbarLinks() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const isOpen = (label: string) => openMenu === label;

  // Hover delay open
  const openWithDelay = (label: string) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setOpenMenu(label), 120);
    setHoverTimer(timer);
  };

  // Hover delay close
  const closeWithDelay = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => setOpenMenu(null), 180);
    setHoverTimer(timer);
  };

  return (
    <>
      {/* NAVBAR */}
      <Box display='flex' gap={1} alignItems='center'>
        {navItems.map((item) => (
          <Box
            key={item.label}
            onMouseEnter={() => item.submenu && openWithDelay(item.label)}
            onMouseLeave={closeWithDelay}
          >
            {item.submenu ? (
              <Button endIcon={isOpen(item.label) ? <ExpandLessIcon /> : <ExpandMoreIcon />} sx={navButtonSx}>
                {item.label}
              </Button>
            ) : (
              <Button component={Link} href={item.href} sx={navButtonSx}>
                {item.label}
              </Button>
            )}
          </Box>
        ))}
        <Button component={Link} href='/login' variant='contained'>
          Đăng nhập
        </Button>
        <Button component={Link} href='/signup' variant='outlined' sx={{ display: { xs: 'none', lg: 'block' } }}>
          Đăng ký
        </Button>
      </Box>

      <Paper
        onMouseEnter={() => openMenu && openWithDelay(openMenu)}
        onMouseLeave={closeWithDelay}
        sx={{ display: openMenu ? 'block' : 'none', ...megaMenuSx }}
      >
        <Box maxWidth='1200px' mx='auto' p={4}>
          <Stack direction='row' gap={6} flexWrap='wrap'>
            {navItems
              .find((i) => i.label === openMenu)
              ?.submenu?.map((cat) => (
                <Box key={cat.label} minWidth={200}>
                  <Typography variant='body1' fontWeight='600' gutterBottom>
                    {cat.label}
                  </Typography>

                  <Stack spacing={1}>
                    {cat.submenu?.map((sub) => (
                      <Link key={sub.label} href={sub.href || '/'} passHref>
                        <LinkButton
                          component='span'
                          underline='hover'
                          sx={{
                            justifyContent: 'flex-start',
                            color: 'text.secondary',
                            fontSize: '0.9rem',
                            px: 0,
                            '&:hover': {
                              color: 'primary.main',
                            },
                          }}
                        >
                          {sub.label}
                        </LinkButton>
                      </Link>
                    ))}
                  </Stack>
                </Box>
              ))}
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
