import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';
import EmptyState from './emptyState';
import { CourseSummary } from '@/types/course';
import AppPagination from '@/components/common/pagination';
import { CourseCardHorizontal } from '@/components/user/common/courseCard/courseCardHorizontal';
import CourseSortSelect from '@/components/user/common/courseSortSelect';

interface SearchResultsProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CourseList({ searchParams }: SearchResultsProps) {
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
    {
      id: 3,
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
      id: 4,
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

  const { page } = await searchParams;
  let currentPage = Number(page);

  if (!page || isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  }
  const isEmpty = false;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='body2' color='text.secondary'>
          Hiển thị {courses.length} trên 150 kết quả
        </Typography>

        <CourseSortSelect />
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
            <AppPagination count={10} page={currentPage} />
          </Box>
        </>
      )}
    </Box>
  );
}
