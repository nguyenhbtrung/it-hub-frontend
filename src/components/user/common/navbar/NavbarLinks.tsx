'use client';
import { useState } from 'react';
import {
  Button,
  Box,
  Paper,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Link from '@/components/common/Link';
import LinkButton from '@mui/material/Link';
import { NavItem } from '@/types/navigation.user';
import { Session } from 'next-auth';

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
  borderTop: '1px solid',
  borderColor: 'divider',
  borderRadius: 0,
  boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
};

function mergeNavItems(navItems: NavItem[], mergedLabel: string = 'Hoạt động'): NavItem[] {
  const withSubmenu: NavItem[] = [];
  const withoutSubmenu: NavItem[] = [];

  for (const item of navItems) {
    if (item.submenu && item.submenu.length > 0) {
      withSubmenu.push(item);
    } else {
      withoutSubmenu.push(item);
    }
  }

  if (withoutSubmenu.length > 0) {
    withSubmenu.push({
      label: mergedLabel,
      submenu: withoutSubmenu,
      menuType: 'small',
    });
  }

  return withSubmenu;
}

function SmallMenu({
  anchorEl,
  open,
  onClose,
  items,
}: {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose} MenuListProps={{ onMouseLeave: onClose }}>
      {items.map((sub) => (
        <MenuItem key={sub.label} onClick={onClose} component={Link} href={sub.href || '/'}>
          {sub.label}
        </MenuItem>
      ))}
    </Menu>
  );
}

interface NavbarLinksProps {
  navItems: NavItem[];
  session: Session | null;
}

export default function NavbarLinks({ navItems, session }: NavbarLinksProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarAnchor(event.currentTarget);
  };
  const handleAvatarClose = () => {
    setAvatarAnchor(null);
  };

  const isOpen = (label: string) => openMenu === label;

  const mdNavItems = mergeNavItems(navItems);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('lg'));

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, label: string) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(label);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const itemsToRender = isMd ? mdNavItems : navItems;
  const currentItem = itemsToRender.find((i) => i.label === openMenu);

  return (
    <>
      {/* NAVBAR */}
      <Box display='flex' gap={1} alignItems='center'>
        {itemsToRender.map((item) => (
          <Box
            key={item.label}
            onMouseEnter={() => item.submenu && item.menuType !== 'small' && openWithDelay(item.label)}
            onMouseLeave={item.menuType !== 'small' ? closeWithDelay : undefined}
          >
            {item.submenu ? (
              <Button
                endIcon={isOpen(item.label) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={navButtonSx}
                onClick={(e) => (item.menuType === 'small' ? handleClick(e, item.label) : undefined)}
              >
                {item.label}
              </Button>
            ) : (
              <Button component={Link} href={item.href} sx={navButtonSx}>
                {item.label}
              </Button>
            )}
          </Box>
        ))}
        {session ? (
          <>
            {' '}
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              {' '}
              <Avatar alt={session.user?.name || 'User'} src={session.user?.image || undefined} />{' '}
            </IconButton>{' '}
            <Menu anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={handleAvatarClose}>
              {' '}
              <MenuItem component={Link} href='/profile' onClick={handleAvatarClose}>
                {' '}
                Hồ sơ{' '}
              </MenuItem>{' '}
              <MenuItem component={Link} href='/settings' onClick={handleAvatarClose}>
                {' '}
                Cài đặt{' '}
              </MenuItem>{' '}
              <MenuItem component={Link} href='/auth/logout' onClick={handleAvatarClose}>
                {' '}
                Đăng xuất{' '}
              </MenuItem>{' '}
            </Menu>{' '}
          </>
        ) : (
          <>
            {' '}
            <Button component={Link} href='/auth/login' variant='contained'>
              {' '}
              Đăng nhập{' '}
            </Button>{' '}
            <Button
              component={Link}
              href='/auth/signup'
              variant='outlined'
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              {' '}
              Đăng ký{' '}
            </Button>{' '}
          </>
        )}
      </Box>

      {currentItem?.menuType === 'small' && currentItem.submenu && (
        <SmallMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} items={currentItem.submenu} />
      )}

      {currentItem?.menuType !== 'small' && currentItem?.submenu && (
        <Paper
          onMouseEnter={() => openMenu && openWithDelay(openMenu)}
          onMouseLeave={closeWithDelay}
          sx={{ display: openMenu ? 'block' : 'none', ...megaMenuSx }}
        >
          <Box maxWidth='1200px' mx='auto' p={4}>
            <Stack direction='row' gap={6} flexWrap='wrap'>
              {currentItem.submenu.map((cat) => (
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
                            '&:hover': { color: 'primary.main' },
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
      )}
    </>
  );
}
