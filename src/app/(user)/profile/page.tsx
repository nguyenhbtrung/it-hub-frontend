import { Box, Stack } from '@mui/material';
import { Suspense } from 'react';
import Bio from '@/components/user/profile/bio';
import CourseStatusTabs from '@/components/user/profile/courses/courseStatusTabs';
import EmptyCourseState from '@/components/user/profile/courses/emptyCourseState';
import { CourseCardHorizontal } from '@/components/user/common/courseCard/courseCardHorizontal';
import { getMyLearningCourses } from '@/features/user';

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

async function CourseList({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeTab = params.tab || 'active';

  // const courses = getCoursesByStatus(activeTab as any);

  const res = await getMyLearningCourses({ page: 1, limit: 10, status: activeTab });
  const courses = res.success ? (res.data ?? []) : [];
  return (
    <>
      <Box>
        {courses.length > 0 ? (
          <Stack spacing={3}>
            {courses.map((course: any) => (
              // <CourseCard key={course.id} course={course} status={activeTab as any} />
              <CourseCardHorizontal key={course.id} course={course} />
            ))}
          </Stack>
        ) : (
          <EmptyCourseState />
        )}
      </Box>
    </>
  );
}

export default function ProfilePage({ searchParams }: PageProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Phần giới thiệu */}
      <Suspense>
        <Bio />
      </Suspense>

      <Stack spacing={4}>
        {/* Tabs con */}
        <Suspense>
          <CourseStatusTabs />
        </Suspense>
        <Suspense>
          <CourseList searchParams={searchParams} />
        </Suspense>
      </Stack>
    </Box>
  );
}
