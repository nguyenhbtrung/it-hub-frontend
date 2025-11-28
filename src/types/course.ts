export interface CourseSummary {
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
  course: CourseSummary;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  isPreview?: boolean;
  resourceUrl?: string | null;
}

export interface Section {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  avatarUrl?: string | null;
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface CourseStats {
  rating: number;
  ratingCount: number;
  students: number;
  lastUpdated: string; // ISO date
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao' | string;
  totalDurationMinutes: number;
}

export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  tags: string[];
  stats: CourseStats;
  instructor: Instructor;
  sections: Section[];
  keyTakeaways: string[];
  requirements?: string[];
  language?: string;
  price?: string;
  promoVideoUrl?: string | null;
}
