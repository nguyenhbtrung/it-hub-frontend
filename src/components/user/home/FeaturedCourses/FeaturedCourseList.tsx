import { Grid } from '@mui/material';
import { CourseCardVertical, CourseCardSkeleton } from '../../common/courseCard/CourseCardVertical';
import { getFeaturedCourses } from '@/features/course';

export async function FeaturedCourseList() {
  const res = await getFeaturedCourses({ page: 1, limit: 4 });
  const courses = res.success ? (res.data ?? []) : [];

  return (
    <Grid container spacing={2} px={{ xs: 3, md: 8 }}>
      {courses &&
        courses.map((course: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={course.id}>
            <CourseCardVertical course={course} />
          </Grid>
        ))}
    </Grid>
  );
}

export async function FeaturedCourseListSkeleton() {
  return (
    <Grid container spacing={2} px={{ xs: 3, md: 8 }}>
      {Array.from(new Array(4)).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <CourseCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
