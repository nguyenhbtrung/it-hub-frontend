'use client';

import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, Chip } from '@mui/material';
import { Group, Edit, Visibility, Delete, Image as ImageIcon } from '@mui/icons-material';
import Link from '@/components/common/Link';
import { CourseStatus } from '@/types/course';
import { CreatedCourse } from './types';

interface StatusConfigItem {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

const statusConfig: Record<CourseStatus, StatusConfigItem> = {
  published: { label: 'Đang hoạt động', color: 'success', bgColor: 'success.light', textColor: 'success.dark' },
  pending: { label: 'Đang chờ duyệt', color: 'info', bgColor: 'info.light', textColor: 'info.dark' },
  draft: { label: 'Bản nháp', color: 'warning', bgColor: 'warning.light', textColor: 'warning.dark' },
  hidden: { label: 'Đã ẩn', color: 'default', bgColor: 'grey.200', textColor: 'grey.800' },
  suspended: { label: 'Đình chỉ', color: 'default', bgColor: 'grey.200', textColor: 'grey.800' },
};

interface CourseCardProps {
  course: CreatedCourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Nếu không có imgUrl ban đầu thì coi là lỗi để hiển thị placeholder
  const [hasError, setHasError] = useState<boolean>(!course.imgUrl);

  const handleImgError = () => setHasError(true);

  const handleView = (courseId: number) => console.log('View course:', courseId);
  const handleDelete = (courseId: number) => console.log('Delete course:', courseId);

  return (
    <Card
      key={course.id}
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        boxShadow: 'none',
        '&:hover': { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' },
      }}
    >
      {/* Course Image or Icon Placeholder */}
      <Box sx={{ width: 128, height: 80, borderRadius: 1, overflow: 'hidden', flexShrink: 0, mr: 3 }}>
        {!hasError ? (
          <Box
            component='img'
            src={course.imgUrl || ''}
            alt={course.title}
            onError={handleImgError}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              backgroundColor: '#f3f4f6',
            }}
          />
        ) : (
          <Box
            role='img'
            aria-label='placeholder image'
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.100',
              color: 'grey.500',
            }}
          >
            <ImageIcon sx={{ fontSize: 36 }} />
          </Box>
        )}
      </Box>

      {/* Course Info */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
            {course.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {course.category} • {course.subCategory}
          </Typography>
        </Box>

        {/* Student Count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 160, color: 'text.secondary' }}>
          <Group sx={{ fontSize: 20 }} />
          <Typography variant='body2'>{course.students} học viên</Typography>
        </Box>

        {/* Status */}
        <Box sx={{ width: 144, textAlign: 'center' }}>
          <Chip
            label={statusConfig[course.status]?.label || course.status}
            size='small'
            sx={{
              backgroundColor: statusConfig[course.status]?.bgColor,
              color: statusConfig[course.status]?.textColor,
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 24,
              '& .MuiChip-label': { px: 1.5, py: 0.25 },
            }}
          />
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
        <IconButton
          LinkComponent={Link}
          href={`/instructor/courses/${course.id}/edit`}
          size='small'
          sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover', color: 'text.primary' } }}
          title='Chỉnh sửa'
        >
          <Edit fontSize='small' />
        </IconButton>
        <IconButton
          size='small'
          onClick={() => handleView(course.id)}
          sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover', color: 'text.primary' } }}
          title='Xem chi tiết'
        >
          <Visibility fontSize='small' />
        </IconButton>
        <IconButton
          size='small'
          onClick={() => handleDelete(course.id)}
          sx={{ color: 'error.main', '&:hover': { backgroundColor: 'error.light' } }}
          title='Xóa'
        >
          <Delete fontSize='small' />
        </IconButton>
      </Box>
    </Card>
  );
}
