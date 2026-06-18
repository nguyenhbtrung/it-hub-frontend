import { Grid } from '@mui/material';
import { CourseCardSkeleton, CourseCardVertical } from '@/components/user/common/courseCard/CourseCardVertical';
import { getRecommendedCourses } from '@/features/course';

interface CourseListProps {
  id: string;
}

export async function CourseList({ id }: CourseListProps) {
  const res = await getRecommendedCourses({ categoryId: id });

  const courses = res.success ? (res.data ?? []) : [];

  return (
    <Grid container spacing={2}>
      {courses.map((course: any) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={course.id}>
          <CourseCardVertical course={course} />
        </Grid>
      ))}
    </Grid>
  );
}

export async function CourseListSkeleton() {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(4)).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <CourseCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
