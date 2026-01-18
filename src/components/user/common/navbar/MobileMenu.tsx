'use client';
import { useState, useEffect, use } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Stack,
  Button,
  Paper,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from '@/components/common/Link';
import { NavItem } from '@/types/navigation.user';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import Logo from '@/components/common/Logo';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

function MobileNavList({ items, onNavigate, level = 0 }: { items: NavItem[]; onNavigate: () => void; level?: number }) {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const indent = 2;

  const toggle = (label: string) => {
    setOpenMap((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <List>
      {items.map((item) => {
        const hasSubmenu = !!item.submenu;
        const isOpen = openMap[item.label] || false;

        return (
          <Box key={item.label}>
            {hasSubmenu ? (
              <>
                <ListItemButton onClick={() => toggle(item.label)} sx={{ pl: indent + level * 2 }}>
                  <ListItemText primary={item.label} />
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout='auto' unmountOnExit>
                  <MobileNavList items={item.submenu!} onNavigate={onNavigate} level={level + 1} />
                </Collapse>
              </>
            ) : (
              <ListItemButton
                component={Link}
                href={item.href || '/'}
                onClick={onNavigate}
                sx={{ pl: indent + level * 2 }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </Box>
        );
      })}
    </List>
  );
}

function AccountMenu({ onBack, onNavigate }: { onBack: () => void; onNavigate: () => void }) {
  const handleLogout = async () => {
    await signOut({ redirectTo: '/auth/login' });
    onNavigate();
  };

  const menuItems = [
    { label: 'Hồ sơ', icon: <PersonIcon />, href: '/profile' },
    { label: 'Cài đặt', icon: <SettingsIcon />, href: '/profile/settings' },
    { label: 'Đăng xuất', icon: <LogoutIcon />, action: handleLogout },
  ];

  return (
    <Box>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          p: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant='h6'>Tài khoản của tôi</Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => {
              if (item.action) {
                item.action();
              } else {
                onNavigate();
              }
            }}
            component={item.action ? 'button' : Link}
            href={item.href}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

interface MobileMenuProps {
  navItems: NavItem[];
  session: Session | null;
  profilePromise: Promise<any>;
}

export default function MobileMenu({ navItems, session, profilePromise }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<'main' | 'account'>('main');

  useLockBodyScroll(open);

  const res = use(profilePromise);
  const user = res?.data;

  const handleAccountClick = () => {
    setCurrentMenu('account');
  };

  const handleBackToMain = () => {
    setCurrentMenu('main');
  };

  const handleNavigate = () => {
    setOpen(false);
    setCurrentMenu('main');
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor='left'
        open={open}
        onClose={() => {
          setOpen(false);
          setCurrentMenu('main');
        }}
        slotProps={{
          paper: {
            sx: {
              width: '100vw',
              boxShadow: 'none',
              bgcolor: 'background.paper',
              backgroundImage: 'none',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Header với logo và nút đóng */}
          <Box
            display='flex'
            justifyContent='space-between'
            p={2}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box onClick={handleNavigate} display='flex' justifyContent='center' alignItems='center'>
              <Logo href='/' />
            </Box>
            <IconButton
              onClick={() => {
                setOpen(false);
                setCurrentMenu('main');
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Nội dung menu */}
          <Box flex={1} overflow='auto'>
            {currentMenu === 'main' ? (
              <>
                {session && (
                  <Box sx={{ p: 2 }}>
                    <ListItemButton
                      onClick={handleAccountClick}
                      sx={{
                        borderRadius: 1,
                        bgcolor: 'action.hover',
                        '&:hover': { bgcolor: 'action.selected' },
                      }}
                    >
                      <Avatar src={user?.avatar?.url || undefined} sx={{ width: 40, height: 40, mr: 2 }}>
                        {user?.fullname?.[0]}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant='body1' fontWeight='medium'>
                          {user?.fullname || 'Người dùng'}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {user?.email}
                        </Typography>
                      </Box>
                      <KeyboardArrowRight />
                    </ListItemButton>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                )}
                <MobileNavList items={navItems} onNavigate={handleNavigate} />
              </>
            ) : (
              <AccountMenu onBack={handleBackToMain} onNavigate={handleNavigate} />
            )}
          </Box>

          {/* Phần footer cho người chưa đăng nhập */}
          {!session && currentMenu === 'main' && (
            <Paper
              sx={{
                position: 'sticky',
                bottom: 0,
                zIndex: 10,
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
                borderRadius: 0,
              }}
            >
              <Stack spacing={2} sx={{ p: 2 }}>
                <Button component={Link} href='/auth/login' variant='contained' onClick={handleNavigate}>
                  Đăng nhập
                </Button>
                <Button component={Link} href='/auth/signup' variant='outlined' onClick={handleNavigate}>
                  Đăng Ký
                </Button>
              </Stack>
            </Paper>
          )}
        </Box>
      </Drawer>
    </>
  );
}
