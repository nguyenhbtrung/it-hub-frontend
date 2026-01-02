import CourseContentPage from '@/components/instructor/course/edit/content/courseContentPage';
import { Suspense } from 'react';
import { Container, Box, Skeleton, Typography } from '@mui/material';
import { getCourseContent } from '@/services/course.service';

interface ContentPageProps {
  params: Promise<{ id: string }>;
}

export default async function ContentPage({ params }: ContentPageProps) {
  return (
    <Suspense fallback={<ContentPageSkeleton />}>
      <PageWrapper params={params} />
    </Suspense>
  );
}

async function PageWrapper({ params }: ContentPageProps) {
  const { id } = await params;
  const res = await getCourseContent(id, 'instructor');
  const courseContent = res?.data;
  return (
    <>
      <CourseContentPage initialSections={courseContent?.sections} courseId={id || ''} />
    </>
  );
}

function ContentPageSkeleton() {
  return (
    <Box>
      <Skeleton variant='rectangular' height={80} sx={{ mb: 2, borderRadius: 2 }} />
      <Skeleton variant='rectangular' height={200} sx={{ mb: 2, borderRadius: 2 }} />
      <Skeleton variant='rectangular' height={150} sx={{ borderRadius: 2 }} />
    </Box>
  );
}
