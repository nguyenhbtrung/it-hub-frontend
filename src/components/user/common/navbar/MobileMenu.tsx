'use client';
import { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Link from '@/components/common/Link';
import { NavItem } from '@/types/navigation.user';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import Logo from '@/components/common/Logo';

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

interface MobileMenuProps {
  navItems: NavItem[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useLockBodyScroll(open);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: '100vw',
              // height: '100vh',
              boxShadow: 'none',
              bgcolor: 'background.paper',
              backgroundImage: 'none',
            },
          },
        }}
      >
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
          <Box onClick={() => setOpen(false)} display='flex' justifyContent='center' alignItems='center'>
            <Logo />
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box flex={1}>
          <MobileNavList items={navItems} onNavigate={() => setOpen(false)} />
        </Box>
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
            <Button component={Link} href='/auth/login' variant='contained'>
              Đăng nhập
            </Button>
            <Button component={Link} href='/auth/signup' variant='outlined'>
              Đăng Ký
            </Button>
          </Stack>
        </Paper>
      </Drawer>
    </>
  );
}
