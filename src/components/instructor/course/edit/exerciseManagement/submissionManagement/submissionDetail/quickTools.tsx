import { getExerciseByUnitId, getSubmissionById, getSubmissionsByUnitAndStudent } from '@/services/exercise.service';
import QuickToolsClient from './quickToolClient';

interface QuickToolsProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function QuickTools({ params }: QuickToolsProps) {
  const { unitId, attemptId, id } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);
  const submissionRes = await getSubmissionById(attemptId);

  const exercise = exerciseRes?.data;
  const submission = submissionRes?.data;

  const submissionsRes = await getSubmissionsByUnitAndStudent(unitId, submission.studentId, { page: 1, limit: 10 });
  const submissions = submissionsRes?.data || [];

  console.log('submissions: ', submissions);

  return (
    <QuickToolsClient
      initialSubmissions={submissions}
      currentAttemptId={attemptId}
      courseId={id}
      unitId={unitId}
      passingScore={exercise.passingScore || 0}
    />
  );
}
