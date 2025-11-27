export interface Course {
  id: number;
  image: string;
  category: string;
  level: string;
  title: string;
  students: number;
  rating: number;
  duration: string;
  price?: string;
}

export interface courseProgress {
  courseId: number;
  image: string;
  category: string;
  level: string;
  title: string;
  duration: string;
  progress: number;
  lastAccess: string;
}

export interface CourseCardProps {
  course: Course;
}
