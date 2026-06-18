import Sidebar from './sidebar';
import MobileMenu from './mobileMenu';
import { notFound } from 'next/navigation';
import { getCourseContent, getCourseIdBySlug } from '@/features/course';

interface CourseContentMenuProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function CourseContentMenu({ params }: CourseContentMenuProps) {
  const { slug, id } = await params;
  const idRes = await getCourseIdBySlug(slug);
  if (!idRes.success) {
    notFound();
  }
  const courseId = idRes.data;
  const res = await getCourseContent(courseId, 'student');
  if (!res.success || !res.data) {
    notFound();
  }
  const course = res.data;
  course.contentId = id;
  return (
    <>
      <Sidebar course={course} />
      <MobileMenu course={course} />
    </>
  );
}
