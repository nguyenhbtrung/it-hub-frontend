import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

import { notFound } from 'next/navigation';
import AssignmentContent from './assignmentContent';
import { Suspense } from 'react';
import QuizContent from './quizContent';
import { getCourseContentBreadcrumb, getNavigationByContentId } from '@/features/course';
import { getExerciseByUnitId } from '@/features/exercise';

interface MainContentProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function MainContent({ params }: MainContentProps) {
  const { slug, id: unitId } = await params;
  const breadcrumbRes = await getCourseContentBreadcrumb(unitId, 'unit');
  if (!breadcrumbRes.success) {
    notFound();
  }
  const breadcrumb = breadcrumbRes.data;
  const exerciseRes = await getExerciseByUnitId(unitId);
  if (!exerciseRes.success) {
    notFound();
  }
  const exercise = exerciseRes?.data;

  const navRes = await getNavigationByContentId(unitId, { contentType: 'unit' });
  if (!navRes.success) {
    notFound();
  }
  const nav = navRes.data;

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'assignment':
        return (
          <Suspense>
            <AssignmentContent exercise={exercise} nav={nav} slug={slug} />
          </Suspense>
        );

      case 'project':
        return (
          <Suspense>
            <AssignmentContent exercise={exercise} nav={nav} slug={slug} />
          </Suspense>
        );

      case 'quiz':
        return (
          <Suspense>
            <QuizContent exercise={exercise} nav={nav} slug={slug} />
          </Suspense>
        );

      default:
        return <Typography color='text.secondary'>Loại bài tập chưa được hỗ trợ</Typography>;
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 3, md: 6 } }}>
          {/* Breadcrumb */}
          <Breadcrumbs separator={<ChevronRight fontSize='small' />} sx={{ mb: 3 }}>
            <Link
              href={`/courses/${slug}/learn/sections/${breadcrumb?.section?.id}`}
              color='text.secondary'
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Chương {breadcrumb?.section?.order}: {breadcrumb?.section?.title}
            </Link>
            <Link
              href={`/courses/${slug}/learn/exercises/${breadcrumb?.unit?.id}`}
              color='text.secondary'
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Bài tập: {breadcrumb?.unit?.title}
            </Link>
          </Breadcrumbs>
          {renderExerciseContent()}
        </Box>
      </Box>
    </Box>
  );
}
