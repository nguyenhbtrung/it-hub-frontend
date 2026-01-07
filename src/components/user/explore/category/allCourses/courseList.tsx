import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';
import EmptyState from './emptyState';
import { CourseSummary } from '@/types/course';
import AppPagination from '@/components/common/pagination';
import { CourseCardHorizontal } from '@/components/user/common/courseCard/courseCardHorizontal';
import CourseSortSelect from '@/components/user/common/courseSortSelect';
import { getCoursesByCategoryId } from '@/services/category.service';
import { notFound } from 'next/navigation';

interface SearchResultsProps {
  id: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CourseList({ id, searchParams }: SearchResultsProps) {
  const coursess: CourseSummary[] = [
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

  const { page, level, duration, rating, sortBy } = await searchParams;
  console.log('>>>>>>', page, level, duration, rating, sortBy);
  let currentPage = Number(page);

  if (!page || isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  }

  const res = await getCoursesByCategoryId(id, {
    page: currentPage,
    limit: 5,
    level,
    avgRating: rating,
    sortBy,
  });
  let isEmpty = false;

  if (!res?.success || !res?.data) {
    isEmpty = true;
  }

  const courses = res?.data;
  const meta = res?.meta;
  let count = 0;
  if (typeof meta?.total === 'number' && typeof meta?.page === 'number' && meta.page > 0) {
    count = Math.ceil(meta.total / meta.limit);
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='body2' color='text.secondary'>
          Hiển thị {courses?.length} trên {meta?.total} kết quả
        </Typography>

        <CourseSortSelect />
      </Box>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {courses.map((course: any) => (
              <CourseCardHorizontal key={course.id} course={course} />
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <AppPagination count={count} page={currentPage} />
          </Box>
        </>
      )}
    </Box>
  );
}
