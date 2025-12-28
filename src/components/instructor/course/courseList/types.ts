import { CourseStatus } from '@/types/course';

export interface CreatedCourse {
  id: number;
  title: string;
  category: string;
  subCategory: string;
  students: number;
  status: CourseStatus;
  imgUrl: string | null;
}
