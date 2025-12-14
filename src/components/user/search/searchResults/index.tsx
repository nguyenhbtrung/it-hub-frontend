'use client';

import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  PaginationItem,
  Button,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmptyState from '../emptyState';
import { CourseCardHorizontal } from '../../common/courseCard/courseCardHorizontal';
import { CourseSummary } from '@/types/course';

export default function SearchResults() {
  const courses: CourseSummary[] = [
    {
      id: 1,
      title: 'JavaScript Nâng Cao: Từ Con Số 0 đến Chuyên Gia',
      instructor: 'John Doe',
      description:
        'Khám phá các khái niệm nâng cao trong JavaScript như closures, promises, async/await và xây dựng các ứng dụng web phức tạp.',
      rating: 4.8,
      reviewCount: 1250,
      image: 'https://picsum.photos/300/200?random=1',
      category: 'JavaScript',
      level: 'Nâng cao',
      students: 123,
      duration: '40 giờ',
    },
    {
      id: 2,
      title: 'Thiết kế UI/UX Toàn Tập với Figma',
      instructor: 'Jane Smith',
      description:
        'Học cách thiết kế giao diện người dùng đẹp mắt và hiệu quả từ wireframe, prototype đến thiết kế hoàn chỉnh trên Figma.',
      rating: 4.9,
      reviewCount: 2130,
      image: 'https://picsum.photos/300/200?random=2',
      category: 'UI/UX',
      level: 'Trung cấp',
      students: 456,
      duration: '30 giờ',
    },
  ];

  const isEmpty = false;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='body2' color='text.secondary'>
          Hiển thị {courses.length} trên 150 kết quả
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Sắp xếp:
          </Typography>
          <FormControl size='small' sx={{ minWidth: 150 }}>
            {/* <InputLabel id='sort-label'>Phổ biến nhất</InputLabel> */}
            <Select labelId='sort-label' defaultValue='popular'>
              <MenuItem value='popular'>Phổ biến nhất</MenuItem>
              <MenuItem value='newest'>Mới nhất</MenuItem>
              <MenuItem value='rating'>Đánh giá cao</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {courses.map((course) => (
              <CourseCardHorizontal key={course.id} course={course} />
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={10}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: ArrowBackIosNewIcon,
                    next: ArrowForwardIosIcon,
                  }}
                  {...item}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    minWidth: 40,
                    height: 40,
                  }}
                />
              )}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
