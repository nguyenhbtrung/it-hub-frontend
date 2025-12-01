'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  LinearProgress,
  Paper,
  IconButton,
  Drawer,
} from '@mui/material';
import {
  Home,
  Book,
  ExpandMore,
  CheckCircle,
  PlayCircle,
  RadioButtonUnchecked,
  ChevronRight,
  ChevronLeft,
} from '@mui/icons-material';
import Link from '@/components/common/Link';
import { SidebarToggle } from './sidebarToggle';
import MenuContent from './menuContent';
import Sidebar from './sidebar';
import MobileMenu from './mobileMenu';

export default function CourseContentMenu() {
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <Sidebar />
      <MobileMenu />
    </>
  );
}
