import { getExerciseByUnitId, getSubmissionById } from '@/services/exercise.service';
import { notFound } from 'next/navigation';
import QuizExerciseContentClient from './quizExerciseContentClient';
import { Suspense } from 'react';
import QuickTools from './quickTools';

interface QuizExerciseContentProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function QuizExerciseContent({ params }: QuizExerciseContentProps) {
  const { unitId, attemptId } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);
  const submissionRes = await getSubmissionById(attemptId);

  const exercise = exerciseRes?.data;
  const submission = submissionRes?.data;
  if (!submission) notFound();
  const result = submission?.quizResults?.result;

  console.log('submission: ', submission);
  console.log('result', submission.quizResults.result);

  return (
    <QuizExerciseContentClient result={result} exercise={exercise}>
      <Suspense>
        <QuickTools params={params} />
      </Suspense>
    </QuizExerciseContentClient>
  );
}
