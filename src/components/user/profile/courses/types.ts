export type CourseStatus = 'in-progress' | 'registered' | 'completed';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  slug: string;
  instructor: {
    name: string;
    id: number;
  };
  level: CourseLevel;
  progress?: number;
  category: string;
  registrationDate?: string;
  completedDate?: string;
  color: string;
  icon: string;
  image: string;
}

export interface CourseTab {
  id: CourseStatus;
  label: string;
  icon: string;
  count: number;
}
