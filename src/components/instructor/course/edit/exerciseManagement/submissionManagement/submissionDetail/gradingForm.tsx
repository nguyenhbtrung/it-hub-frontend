import { getExerciseByUnitId, getSubmissionById } from '@/services/exercise.service';
import GradingFormClient from './gradingFormClient';

interface GradingFormProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function GradingForm({ params }: GradingFormProps) {
  const { unitId, attemptId } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);
  const submissionRes = await getSubmissionById(attemptId);

  const exercise = exerciseRes?.data;
  const submission = submissionRes?.data;

  return <GradingFormClient submission={submission} passingScore={exercise.passingScore} />;
}
