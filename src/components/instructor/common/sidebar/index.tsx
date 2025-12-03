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

const LogoIcon = () => (
  <svg
    fill='currentColor'
    viewBox='0 0 48 48'
    xmlns='http://www.w3.org/2000/svg'
    style={{ width: '2rem', height: '2rem' }}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z'
      fill='currentColor'
    />
  </svg>
);

export default function Sidebar() {
  const menuItems = [
    { icon: <Dashboard />, text: 'Bảng điều khiển', active: true },
    { icon: <MenuBook />, text: 'Quản lý Khóa học' },
    { icon: <Group />, text: 'Quản lý Học viên' },
    { icon: <Forum />, text: 'Thảo luận & Hỏi đáp' },
    { icon: <BarChart />, text: 'Thống kê & Báo cáo' },
  ];

  //   const bottomMenuItems = [{ icon: <Settings />, text: 'Cài đặt' }];

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
        <Logo href='/instructor' sx={{ mb: 3 }} />

        {/* Main Menu */}
        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} sx={{ p: 0, mb: 0.5 }}>
              <ListItemButton
                sx={{
                  borderRadius: 0.7,
                  backgroundColor: item.active ? 'hero.light' : 'transparent',
                  color: item.active ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: item.active ? 'hero.light' : 'action.hover',
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
          ))}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box>
        <Divider sx={{ mb: 2 }} />

        {/* Settings */}
        {/* <List sx={{ p: 0 }}>
          {bottomMenuItems.map((item, index) => (
            <ListItem key={index} sx={{ p: 0, mb: 0.5 }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.5,
                  color: 'text.secondary',
                  '&:hover': { backgroundColor: 'action.hover' },
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
          ))}
        </List> */}

        {/* User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: 2 }}>
          <Avatar
            alt='John Doe'
            // src='https://lh3.googleusercontent.com/aida-public/AB6AXuA404JRHd2GrZvUmSRrr1uD0k0LkqU9eNd0Pl1aQpIB_QItizVoje2TaH0RrZzjHli-CM11-3YjYDurPWBNdRD5SRe6x1eZj5SiiFnh5df0dI_ly4PA2eJsHz8fnSttRWtWa33BeY6ahUu53y9lwKjmu7tHWBRy8PUaFgwasqEimx-xNHdUlurYw5hDaOgaxiHnnuAx8bE5RRobA4JyhrzVg644_iBmxLMR8FckqgVYE89i1YFb-vdQW52ePmqnX3jIbuQ_FiWw6QY'
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              John Doe
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              lecturer@email.com
            </Typography>
          </Box>
          <IconButton size='small' sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}>
            <Logout />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
