import AssignmentExerciseContent from './assignmentExerciseContent';
import { Typography } from '@mui/material';
import QuizExerciseContent from './quizExerciseContent';
import { getExerciseByUnitId } from '@/features/exercise';
import { notFound } from 'next/navigation';

interface SubmissionDetailMainContentProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function SubmissionDetailMainContent({ params }: SubmissionDetailMainContentProps) {
  const { unitId } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);
  if (!exerciseRes.success) {
    notFound();
  }

  const exercise = exerciseRes.data;
  switch (exercise?.type) {
    case 'assignment':
      return <AssignmentExerciseContent params={params} />;
    case 'project':
      return <AssignmentExerciseContent params={params} />;
    case 'quiz':
      return <QuizExerciseContent params={params} />;

    default:
      return <Typography>Dạng bài tập không hỗ trợ</Typography>;
  }
}
