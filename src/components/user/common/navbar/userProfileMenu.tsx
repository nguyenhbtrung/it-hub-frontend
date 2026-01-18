'use client';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@/components/common/Link';
import { use, useState } from 'react';
import { signOut } from 'next-auth/react';

import PersonOutline from '@mui/icons-material/PersonOutline';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

interface UserProfileMenuProps {
  profilePromise: Promise<any>;
}

export default function UserProfileMenu({ profilePromise }: UserProfileMenuProps) {
  const [avatarAnchor, setAvatarAnchor] = useState<null | HTMLElement>(null);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarAnchor(event.currentTarget);
  };
  const handleAvatarClose = () => {
    setAvatarAnchor(null);
  };

  const handleLogout = async () => {
    handleAvatarClose();
    await signOut({ redirectTo: '/auth/login' });
  };

  const res = use(profilePromise);
  const user = res?.data;

  return (
    <>
      <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
        <Avatar alt={user?.fullname || 'User'} src={user?.avatar?.url || undefined} />{' '}
      </IconButton>
      <Menu
        anchorEl={avatarAnchor}
        open={Boolean(avatarAnchor)}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: 150,
              borderRadius: 0.5,
            },
          },
        }}
      >
        <MenuItem component={Link} href='/profile' onClick={handleAvatarClose}>
          <ListItemIcon>
            <PersonOutline />
          </ListItemIcon>
          <ListItemText primary='Hồ sơ' slotProps={{ primary: { sx: { fontSize: '0.875rem' } } }} />
        </MenuItem>
        <MenuItem component={Link} href='/profile/settings' onClick={handleAvatarClose}>
          <ListItemIcon>
            <SettingsOutlined />
          </ListItemIcon>
          <ListItemText primary='Cài đặt' slotProps={{ primary: { sx: { fontSize: '0.875rem' } } }} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary='Đăng xuất' slotProps={{ primary: { sx: { fontSize: '0.875rem' } } }} />
        </MenuItem>
      </Menu>
    </>
  );
}
