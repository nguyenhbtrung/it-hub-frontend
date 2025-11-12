import { Suspense } from 'react';

const fetchCourses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { total: 5 };
};

async function CourseData() {
  const courses = await fetchCourses();
  return <div>Courses: {courses.total}</div>;
}

export default function Page() {
  return (
    <>
      <div>header</div>
      <Suspense fallback={<div>Loading ...</div>}>
        <CourseData />
      </Suspense>
      <div>footer</div>
    </>
  );
}
