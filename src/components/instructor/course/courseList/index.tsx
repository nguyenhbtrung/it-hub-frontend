import { Box, Stack } from '@mui/material';
import { CourseStatus } from '@/types/course';
import CourseCard from './courseCard';
import { CreatedCourse } from './types';
import { getMyCreatedCourse } from '@/services/course.service';
import AppPagination from '@/components/common/pagination';

// const courses: CreatedCourse[] = [
//   {
//     id: 1,
//     title: 'Lập trình Web Frontend Nâng cao',
//     category: 'Phát triển Web',
//     subCategory: 'Next.js',
//     students: 258,
//     status: 'published',
//     imgUrl: 'https://picsum.photos/80/128?random=1',
//   },
//   {
//     id: 2,
//     title: 'Python cho Khoa học Dữ liệu',
//     // description: 'Pandas, NumPy, Matplotlib',
//     category: 'Khoa học dữ liệu',
//     subCategory: 'Python',
//     students: 172,
//     status: 'published',
//     imgUrl: 'https://picsum.photos/80/128?random=2',
//   },
//   {
//     id: 3,
//     title: 'Thiết kế Giao diện UI/UX Cơ bản',
//     // description: 'Figma, Design Principles',
//     category: 'UI/UX',
//     subCategory: 'Figma',
//     students: 310,
//     status: 'draft',
//     imgUrl: 'https://picsum.photos/80/128?random=3',
//   },
//   {
//     id: 4,
//     title: 'Quản lý Dự án Phần mềm',
//     // description: 'Agile, Scrum, Kanban',
//     category: 'Quản lý dự án',
//     subCategory: 'Agile, Scrum',
//     students: 95,
//     status: 'hidden',
//     imgUrl: 'https://picsum.photos/80/128?random=4',
//   },
// ];

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
  if (res?.success && res?.data) {
    courses = res.data;
    const meta = res?.meta;
    if (typeof meta?.total === 'number' && typeof meta?.page === 'number' && meta.page > 0) {
      count = Math.ceil(meta.total / meta.page);
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
