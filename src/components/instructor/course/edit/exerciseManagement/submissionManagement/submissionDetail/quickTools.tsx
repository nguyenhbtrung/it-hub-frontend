import QuickToolsClient from './quickToolClient';
import { notFound } from 'next/navigation';
import { getExerciseByUnitId, getSubmissionById, getSubmissionsByUnitAndStudent } from '@/features/exercise';

interface QuickToolsProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function QuickTools({ params }: QuickToolsProps) {
  const { unitId, attemptId, id } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);
  if (!exerciseRes.success) {
    notFound();
  }

  const submissionRes = await getSubmissionById(attemptId);
  if (!submissionRes.success) {
    notFound();
  }

  const exercise = exerciseRes.data;
  const submission = submissionRes.data;

  const submissionsRes = await getSubmissionsByUnitAndStudent(unitId, submission.studentId, { page: 1, limit: 10 });
  const submissions = submissionsRes.success ? (submissionsRes.data ?? []) : [];

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
