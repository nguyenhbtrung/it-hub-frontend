import CourseFilterSidebar from '@/components/user/common/courseFilterSidebar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';
import CourseList from './courseList';

interface AllCoursesProps {
  slugPromise: Promise<string>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const courseTitle: Record<string, string> = {
  react: 'React',
  vue: 'Vue.js',
  angular: 'Angular',
  nodejs: 'Node.js',
  algorithms: 'Thuật toán',
  'data-structures': 'Cấu trúc dữ liệu',
  os: 'Hệ điều hành',
};

export default async function AllCourses({ slugPromise, searchParams }: AllCoursesProps) {
  const slug = await slugPromise;
  const title = courseTitle[slug];
  return (
    <>
      <Box mb={3}>
        <Typography variant='h4' fontWeight={700} gutterBottom>
          Tất cả khoá học về {title}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Suspense>
            <CourseFilterSidebar disableCategoryFilter />
          </Suspense>
        </Grid>

        <Grid size={{ xs: 12, lg: 9 }}>
          <Suspense>
            <CourseList searchParams={searchParams} />
          </Suspense>
        </Grid>
      </Grid>
    </>
  );
}
