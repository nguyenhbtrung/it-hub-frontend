'use client';

import { useState } from 'react';
import { Paper, IconButton } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { SidebarToggle } from './sidebarToggle';
import MenuContent from './menuContent';
import { LearningCourse } from '@/types/course';

interface SidebarProps {
  course: LearningCourse;
}

export default function Sidebar({ course }: SidebarProps) {
  const [openSidebar, setOpenSidebar] = useState(true);

  const handleToggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: 320,
          display: { xs: 'none', md: openSidebar ? 'flex' : 'none' },
          flexDirection: 'column',
          borderRight: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
          position: 'sticky',
          top: 64,
          maxHeight: 'calc(100vh - 64px)',
        }}
      >
        <MenuContent course={course} />
        {/* Collapse Button */}
        <IconButton
          onClick={handleToggleSidebar}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 304,
            transform: 'translateY(-50%)',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'grey.300',
            width: 32,
            height: 32,
            zIndex: 10,
            '&:hover': { backgroundColor: 'grey.100' },
          }}
        >
          <ChevronLeft sx={{ color: 'text.secondary' }} />
        </IconButton>
      </Paper>
      <SidebarToggle openSidebar={openSidebar} handleToggleSidebar={handleToggleSidebar} />
    </>
  );
}
