import ExerciseManagement from '@/components/instructor/course/edit/exerciseManagement';
import { Suspense } from 'react';

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default function ExerciseManagementPage({ params }: EditCoursePageProps) {
  return (
    <Suspense>
      <ExerciseManagement params={params} />
    </Suspense>
  );
}
