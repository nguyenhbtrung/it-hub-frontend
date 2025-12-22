import { Box, Stack, Typography } from '@mui/material';
import { getCoursesByStatus } from '@/components/user/profile/courses/data';
import EmptyCourseState from '@/components/user/profile/courses/emptyCourseState';
import CourseStatusTabs from '@/components/user/profile/courses/courseStatusTabs';
import CourseCard from '@/components/user/profile/courses/courseCard';

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function MyCoursesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeTab = params.tab || 'in-progress';

  const courses = getCoursesByStatus(activeTab as any);

  return (
    <Stack spacing={4}>
      {/* Tabs con */}
      <CourseStatusTabs />

      {/* Danh sách khóa học */}
      <Box>
        {courses.length > 0 ? (
          <Stack spacing={3}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} status={activeTab as any} />
            ))}
          </Stack>
        ) : (
          <EmptyCourseState />
        )}
      </Box>
    </Stack>
  );
}
