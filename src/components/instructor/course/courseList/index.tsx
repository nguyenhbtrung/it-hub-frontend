import { Box } from '@mui/material';
import { CourseStatus } from '@/types/course';
import CourseCard from './courseCard';
import { CreatedCourse } from './types';
import AppPagination from '@/components/common/pagination';
import { getMyCreatedCourse } from '@/features/course';

interface CourseListProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CourseList({ searchParams }: CourseListProps) {
  const sp = await searchParams;
  const page = Number(sp.page || 1);
  const limit = 3;
  const status = sp.status as CourseStatus;

  const res = await getMyCreatedCourse({ page, limit, status });

  let courses: CreatedCourse[] = [];
  let count = 0;
  if (res.success && res.data) {
    courses = res.data;
    const meta = res?.meta;
    if (typeof meta?.total === 'number' && typeof meta?.page === 'number' && meta.page > 0) {
      count = Math.ceil(meta.total / meta.limit);
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
        {courses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </Box>
      <Box mt={2} display={'flex'} justifyContent={'center'}>
        <AppPagination page={page} count={count} />
      </Box>
    </Box>
  );
}
