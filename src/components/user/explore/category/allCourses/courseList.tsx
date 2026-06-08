import { Box, Typography } from '@mui/material';
import EmptyState from './emptyState';
import AppPagination from '@/components/common/pagination';
import { CourseCardHorizontal } from '@/components/user/common/courseCard/courseCardHorizontal';
import CourseSortSelect from '@/components/user/common/courseSortSelect';
import { categoryApi } from '@/features/category';

interface SearchResultsProps {
  id: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CourseList({ id, searchParams }: SearchResultsProps) {
  const { page, level, duration, rating, sortBy } = await searchParams;
  let currentPage = Number(page);

  if (!page || isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  }

  const res = await categoryApi.getCoursesByCategoryId(id, {
    page: currentPage,
    limit: 5,
    duration,
    level,
    avgRating: rating,
    sortBy,
  });
  let isEmpty = false;

  if (!res.success || !res?.data) {
    isEmpty = true;
  }

  const courses = res.success ? (res?.data ?? []) : [];
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
