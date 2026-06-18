import { notFound } from 'next/navigation';
import QuizExerciseContentClient from './quizExerciseContentClient';
import { Suspense } from 'react';
import QuickTools from './quickTools';
import { getExerciseByUnitId, getSubmissionById } from '@/features/exercise';

interface QuizExerciseContentProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function QuizExerciseContent({ params }: QuizExerciseContentProps) {
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
  if (!submission) {
    notFound();
  }
  const result = submission?.quizResults?.result;

  return (
    <QuizExerciseContentClient result={result} exercise={exercise}>
      <Suspense>
        <QuickTools params={params} />
      </Suspense>
    </QuizExerciseContentClient>
  );
}
