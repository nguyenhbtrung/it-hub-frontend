import GradingFormClient from './gradingFormClient';
import { getExerciseByUnitId, getSubmissionById } from '@/features/exercise';
import { notFound } from 'next/navigation';

interface GradingFormProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function GradingForm({ params }: GradingFormProps) {
  const { unitId, attemptId } = await params;
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

  return <GradingFormClient submission={submission} passingScore={exercise.passingScore} />;
}
