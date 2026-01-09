import { auth } from '@/auth';
import ExerciseEditor from '@/components/instructor/course/edit/content/editExercise/ExerciseEditor';
import { getExerciseByUnitId } from '@/services/exercise.service';

import { Container, Grid, Box, Paper } from '@mui/material';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface EditStepPageProps {
  params: Promise<{ unitId: string; id: string }>;
}

export default function EditStepPage({ params }: EditStepPageProps) {
  return (
    <Box sx={{ bgcolor: 'customBackground.4', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Suspense>
        <EditStepPageWrapper params={params} />
      </Suspense>
    </Box>
  );
}

async function EditStepPageWrapper({ params }: EditStepPageProps) {
  const { unitId, id } = await params;
  const res = await getExerciseByUnitId(unitId);
  const exercise = res?.data;
  if (!exercise) {
    notFound();
  }

  const sesson = await auth();
  const accessToken = sesson?.accessToken || '';
  return (
    <>
      <ExerciseEditor exercise={exercise} courseId={id} accessToken={accessToken} />
    </>
  );
}
