import { Box, Stack, Typography } from '@mui/material';
import { getCoursesByStatus } from '@/components/user/profile/courses/data';
import EmptyCourseState from '@/components/user/profile/courses/emptyCourseState';
import CourseStatusTabs from '@/components/user/profile/courses/courseStatusTabs';
import CourseCard from '@/components/user/profile/courses/courseCard';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default function MyCoursesPage({ searchParams }: PageProps) {
  return (
    <Stack spacing={4}>
      {/* Tabs con */}
      <Suspense>
        <CourseStatusTabs />
      </Suspense>
      <Suspense>
        <CourseList searchParams={searchParams} />
      </Suspense>
    </Stack>
  );
}

async function CourseList({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeTab = params.tab || 'in-progress';

  const courses = getCoursesByStatus(activeTab as any);
  return (
    <>
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
    </>
  );
}
