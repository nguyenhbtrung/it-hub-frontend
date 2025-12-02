import Sidebar from './sidebar';
import MobileMenu from './mobileMenu';
import { courseApi } from '@/lib/mockApi/leanring';

export default async function CourseContentMenu() {
  const course = await courseApi.getCourse('1');
  return (
    <>
      <Sidebar course={course} />
      <MobileMenu course={course} />
    </>
  );
}
