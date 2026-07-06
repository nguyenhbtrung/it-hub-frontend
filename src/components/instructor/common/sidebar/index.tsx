'use client';

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import { Dashboard, MenuBook, Group, Forum, BarChart, Settings, Logout, School } from '@mui/icons-material';
import Logo from '@/components/common/Logo';
import Link from '@/components/common/Link';
import { usePathname } from 'next/navigation';
import { ApiResponse } from '@/lib/api';
import { Suspense, use } from 'react';
import UserInfo from './userInfo';
import UserInfoSkeleton from './userInfoSkeleton';

interface Props {
  profilePromise: Promise<ApiResponse<any>>;
}

export default function Sidebar({ profilePromise }: Props) {
  const instructorPath = '/instructor';
  const pathname = usePathname();
  const menuItems = [
    { icon: <Dashboard />, text: 'Bảng điều khiển', href: '', active: true },
    { icon: <MenuBook />, text: 'Quản lý Khóa học', href: '/courses' },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: 256,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        backgroundColor: 'background.paper',
        p: 3,
      }}
    >
      <Box>
        {/* Logo */}
        <Logo href={instructorPath} sx={{ mb: 3 }} />

        {/* Main Menu */}
        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => {
            const fullHref = instructorPath + item.href;
            const isActive = pathname === fullHref;
            return (
              <ListItem key={index} sx={{ p: 0, mb: 0.5 }}>
                <ListItemButton
                  LinkComponent={Link}
                  href={fullHref}
                  sx={{
                    borderRadius: 0.7,
                    backgroundColor: isActive ? 'hero.light' : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: isActive ? 'hero.light' : 'action.hover',
                    },
                    px: 2,
                    py: 0.7,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Section */}
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo profilePromise={profilePromise} />
      </Suspense>
    </Paper>
  );
}
