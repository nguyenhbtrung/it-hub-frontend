'use client';

import { useState } from 'react';
import { Box, Typography, Button, IconButton, Card, CardContent, Avatar, Chip } from '@mui/material';
import { Group, Edit, Visibility, Delete } from '@mui/icons-material';
import Link from '@/components/common/Link';

interface Course {
  id: number;
  title: string;
  description: string;
  students: number;
  status: StatusKey;
  statusColor: string;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Lập trình Web Frontend Nâng cao',
    description: 'ReactJS, Next.js, TypeScript',
    students: 258,
    status: 'active',
    statusColor: 'success',
    image: 'https://picsum.photos/80/128?random=1',
  },
  {
    id: 2,
    title: 'Python cho Khoa học Dữ liệu',
    description: 'Pandas, NumPy, Matplotlib',
    students: 172,
    status: 'active',
    statusColor: 'success',
    image: 'https://picsum.photos/80/128?random=2',
  },
  {
    id: 3,
    title: 'Thiết kế Giao diện UI/UX Cơ bản',
    description: 'Figma, Design Principles',
    students: 310,
    status: 'draft',
    statusColor: 'warning',
    image: 'https://picsum.photos/80/128?random=3',
  },
  {
    id: 4,
    title: 'Quản lý Dự án Phần mềm',
    description: 'Agile, Scrum, Kanban',
    students: 95,
    status: 'hidden',
    statusColor: 'default',
    image: 'https://picsum.photos/80/128?random=4',
  },
];

type StatusKey = 'active' | 'pending' | 'draft' | 'hidden';

interface StatusConfigItem {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

const statusConfig: Record<StatusKey, StatusConfigItem> = {
  active: {
    label: 'Đang hoạt động',
    color: 'success',
    bgColor: 'success.light',
    textColor: 'success.dark',
  },
  pending: {
    label: 'Đang chờ duyệt',
    color: 'info',
    bgColor: 'info.light',
    textColor: 'info.dark',
  },
  draft: {
    label: 'Bản nháp',
    color: 'warning',
    bgColor: 'warning.light',
    textColor: 'warning.dark',
  },
  hidden: {
    label: 'Đã ẩn',
    color: 'default',
    bgColor: 'grey.200',
    textColor: 'grey.800',
  },
};

export default function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // const handleEdit = (courseId: number) => {
  //   console.log('Edit course:', courseId);
  //   // Add edit logic here
  // };

  const handleView = (courseId: number) => {
    console.log('View course:', courseId);
    // Add view logic here
  };

  const handleDelete = (courseId: number) => {
    console.log('Delete course:', courseId);
    // Add delete logic here
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {courses.map((course) => (
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
            '&:hover': {
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          {/* Course Image */}
          <Box
            sx={{
              width: 128,
              height: 80,
              borderRadius: 1,
              overflow: 'hidden',
              flexShrink: 0,
              mr: 3,
            }}
          >
            <Box
              component='img'
              src={course.image}
              alt={course.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Course Info */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                {course.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {course.description}
              </Typography>
            </Box>

            {/* Student Count */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: 160,
                color: 'text.secondary',
              }}
            >
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
                  '& .MuiChip-label': {
                    px: 1.5,
                    py: 0.25,
                  },
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
              // onClick={() => handleEdit(course.id)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'text.primary',
                },
              }}
              title='Chỉnh sửa'
            >
              <Edit fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => handleView(course.id)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'text.primary',
                },
              }}
              title='Xem chi tiết'
            >
              <Visibility fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => handleDelete(course.id)}
              sx={{
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.light',
                },
              }}
              title='Xóa'
            >
              <Delete fontSize='small' />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
