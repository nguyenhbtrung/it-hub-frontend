'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ViewListIcon from '@mui/icons-material/ViewList';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import Link from 'next/link';
import { useNotification } from '@/contexts/notificationContext';
import { getCourseDetail, updateCourseStatus } from '@/services/course.service';

const rawMenuItems = [
  { icon: <InfoIcon />, text: 'Thông tin tổng quan', href: '/' },
  { icon: <ViewListIcon />, text: 'Nội dung khóa học', href: '/content' },
  { icon: <AssignmentIcon />, text: 'Quản lý bài tập', href: '/assignments' }, // sửa lỗi chính tả
  { icon: <GroupIcon />, text: 'Quản lý học viên', href: '/students' },
];

export default function CourseSidebar() {
  const pathname = usePathname() || '';
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const { notify } = useNotification();

  const base = id ? `/instructor/courses/${id}/edit` : '/instructor/courses';

  const menuItems = useMemo(() => {
    return rawMenuItems.map((item) => {
      // base (overview)
      const fullHref = item.href === '/' ? base : `${base}${item.href.startsWith('/') ? '' : '/'}${item.href}`;
      // selected nếu pathname === fullHref hoặc pathname bắt đầu bằng fullHref + '/'
      const isSelected = pathname === fullHref;
      return { ...item, fullHref, active: isSelected };
    });
  }, [base, pathname]);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await getCourseDetail(id as string, 'instructor');
      setStatus(res?.data?.status || '');
    };
    fetchStatus();
  }, []);

  const handleSubmitClick = async () => {
    try {
      const res = await updateCourseStatus(id as string, { status: 'pending' });
      if (res?.success) {
        notify('success', 'Đã gửi yêu cầu phê duyệt khoá học', { vertical: 'top', horizontal: 'right' });
        setStatus('pending');
      } else {
        notify('error', 'Gửi yêu cầu phê duyệt thất bại, vui lòng thử lại sau', {
          vertical: 'top',
          horizontal: 'right',
        });
      }
    } catch (err) {
      notify('error', 'Gửi yêu cầu phê duyệt thất bại, vui lòng thử lại sau', {
        vertical: 'top',
        horizontal: 'right',
      });
    }
  };

  const handleCancelClick = async () => {
    try {
      const res = await updateCourseStatus(id as string, { status: 'draft' });
      if (res?.success) {
        notify('success', 'Đã huỷ yêu cầu phê duyệt khoá học', { vertical: 'top', horizontal: 'right' });
        setStatus('draft');
      } else {
        notify('error', 'Huỷ yêu cầu phê duyệt thất bại, vui lòng thử lại sau', {
          vertical: 'top',
          horizontal: 'right',
        });
      }
    } catch (err) {
      notify('error', 'Huỷ yêu cầu phê duyệt thất bại, vui lòng thử lại sau', {
        vertical: 'top',
        horizontal: 'right',
      });
    }
  };

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
              LinkComponent={Link}
              href={item.fullHref}
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

      {status === 'draft' && (
        <>
          <Divider sx={{ my: 2 }} />
          <Button variant='contained' onClick={handleSubmitClick} sx={{ width: '100%' }}>
            Gửi yêu cầu phê duyệt
          </Button>
        </>
      )}

      {status === 'pending' && (
        <>
          <Divider sx={{ my: 2 }} />
          <Button variant='outlined' onClick={handleCancelClick} sx={{ width: '100%' }}>
            Huỷ yêu cầu phê duyệt
          </Button>
        </>
      )}
    </Paper>
  );
}
