import MainContent from '@/components/user/learning/mainContent';
import CourseContentMenu from '@/components/user/learning/courseContentMenu';
import { Box } from '@mui/material';
import ElevationScrollConfig from '@/components/user/learning/elevationScrollConfig';
import { Suspense } from 'react';

interface LearningPageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default function LearningPage({ params }: LearningPageProps) {
  const currentStepId = 'step-2-1-2';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ height: { xs: 56, sm: 64 }, borderBottom: 1, borderColor: 'divider' }} />
      <Box sx={{ display: 'flex', flex: 1, position: 'relative', flexDirection: { xs: 'column', md: 'row' } }}>
        <Suspense>
          <ElevationScrollConfig />
        </Suspense>
        <Suspense>
          <CourseContentMenu params={params} />
        </Suspense>
        <Suspense>
          <MainContent params={params} />
        </Suspense>
      </Box>
    </Box>
  );
}
