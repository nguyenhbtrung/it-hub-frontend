import { auth } from '@/auth';
import AssignmentEditor from '@/components/instructor/course/edit/content/editExercise/ExerciseEditor/assignment';
import CodingEditor from '@/components/instructor/course/edit/content/editExercise/ExerciseEditor/coding';
import QuizEditor from '@/components/instructor/course/edit/content/editExercise/ExerciseEditor/quiz';
import { getExerciseByUnitId } from '@/services/exercise.service';

import { Box } from '@mui/material';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface EditStepPageProps {
  params: Promise<{ unitId: string; id: string }>;
}

export default function EditStepPage({ params }: EditStepPageProps) {
  return (
    <Box
      sx={{
        bgcolor: 'customBackground.4',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
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

  switch (exercise.type) {
    case 'assignment':
    case 'project':
      return <AssignmentEditor exercise={exercise} courseId={id} accessToken={accessToken} />;
    case 'quiz':
      return <QuizEditor exercise={exercise} courseId={id} accessToken={accessToken} />;
    case 'coding':
      return <CodingEditor exercise={exercise} courseId={id} accessToken={accessToken} />;
    default:
      notFound();
  }
}
