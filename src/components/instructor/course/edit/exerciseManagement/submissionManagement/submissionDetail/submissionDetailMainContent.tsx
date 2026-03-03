import { getExerciseByUnitId } from '@/services/exercise.service';
import AssignmentExerciseContent from './assignmentExerciseContent';
import { Typography } from '@mui/material';
import QuizExerciseContent from './quizExerciseContent';

interface SubmissionDetailMainContentProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function SubmissionDetailMainContent({ params }: SubmissionDetailMainContentProps) {
  const { unitId } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);

  const exercise = exerciseRes?.data;
  console.log('exercise: ', exercise);
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
