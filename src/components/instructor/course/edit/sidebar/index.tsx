'use client';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ViewListIcon from '@mui/icons-material/ViewList';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';

const menuItems = [
  { icon: <InfoIcon />, text: 'Thông tin tổng quan', active: true },
  { icon: <ViewListIcon />, text: 'Nội dung khóa học' },
  { icon: <AssignmentIcon />, text: 'Quản lý bài tập' },
  { icon: <GroupIcon />, text: 'Quản lý học viên' },
];

export default function CourseSidebar() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <List disablePadding>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={item.active}
              sx={{
                borderRadius: 1,
                bgcolor: item.active ? 'hero.light' : 'transparent',
                '&.Mui-selected': {
                  bgcolor: 'hero.light',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'hero.light' },
                },
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: item.active ? 600 : 500,
                  color: item.active ? 'primary.main' : 'text.secondary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
