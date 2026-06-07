import { getMyExerciseSubmission } from '@/services/exercise.service';
import QuizClientWrapper from './quizClientWrapper';

interface QuizContentProps {
  exercise: any;
  nav: any;
  slug: string;
}

export default async function QuizContent({ exercise, nav, slug }: QuizContentProps) {
  const submissionsPromise = getMyExerciseSubmission(exercise?.id || '', { page: 1, limit: 100 });
  return (
    <>
      <QuizClientWrapper exercise={exercise} nav={nav} slug={slug} submissionsPromise={submissionsPromise} />
    </>
  );
}
