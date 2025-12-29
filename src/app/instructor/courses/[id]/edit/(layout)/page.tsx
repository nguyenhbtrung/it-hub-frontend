import EditCourseDetailForm from '@/components/instructor/course/edit/editCourseDetailForm';
import { getCourseDetailByIntructor } from '@/services/course.service';
import { Suspense } from 'react';

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  return (
    <Suspense>
      <EditFormWrapper params={params} />
    </Suspense>
  );
}

async function EditFormWrapper({ params }: EditCoursePageProps) {
  const { id } = await params;
  const courseRes = await getCourseDetailByIntructor(id);
  const courseDetail = courseRes?.data;
  return (
    <>
      <EditCourseDetailForm courseDetail={courseDetail} />
    </>
  );
}
