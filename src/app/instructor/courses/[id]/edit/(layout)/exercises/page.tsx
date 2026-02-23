import EditCourseDetailForm from '@/components/instructor/course/edit/editCourseDetailForm';
import ExerciseManagement from '@/components/instructor/course/edit/exerciseManagement';
import { getCourseDetail } from '@/services/course.service';
import { Suspense } from 'react';

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  return (
    <Suspense>
      {/* <EditFormWrapper params={params} /> */}
      {/* <div>Quản lý bài tập</div> */}
      <ExerciseManagement params={params} />
    </Suspense>
  );
}

async function EditFormWrapper({ params }: EditCoursePageProps) {
  const { id } = await params;
  const courseRes = await getCourseDetail(id, 'instructor');
  const courseDetail = courseRes?.data;
  return (
    <>
      <EditCourseDetailForm courseDetail={courseDetail} />
    </>
  );
}
