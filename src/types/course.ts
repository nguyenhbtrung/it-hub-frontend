import { StepContent, StepProgress } from './content';

export interface CourseSummary {
  id: number;
  image: string;
  category: string;
  level: string;
  title: string;
  description?: string;
  instructor: string;
  students: number;
  rating: number;
  reviewCount?: number;
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

interface LessonBase {
  id: string;
  title: string;
}

export interface CourseDetailLesson extends LessonBase {
  durationMinutes: number;
  isPreview?: boolean;
  resourceUrl?: string | null;
}

export interface LearningLesson extends LessonBase {
  sectionId: string;
  order: number;
  status: CompletionStatus;
  steps?: Step[];
  lessonType?: 'theory' | 'practice' | 'project' | 'review';
}

interface SectionBase {
  id: string;
  title: string;
  order: number;
}

export interface CourseDetailSection extends SectionBase {
  lessons: CourseDetailLesson[];
}

export interface LearningSection extends SectionBase {
  lessons: LearningLesson[];
  description?: string;
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
  lessons: number;
  materials: number;
}

export interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
    title: string;
  };
  rating: number;
  comment: string;
  date: string;
  likes: number;
  isVerified: boolean;
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
  sections: CourseDetailSection[];
  keyTakeaways: string[];
  requirements?: string[];
  language?: string;
  price?: string;
  promoVideoUrl?: string | null;
}

// types/course.types.ts
export type CompletionStatus = 'completed' | 'in-progress' | 'not-started';

export interface Step {
  id: string;
  title: string;
  status: CompletionStatus;
  order: number;
  contentId?: string; // Reference to content
  contentType?: 'standard' | 'exercise' | 'quiz' | 'project';
  content?: StepContent; // Embedded content (for simplicity)
  progress?: StepProgress;
}

export interface LearningCourse {
  id: string;
  title: string;
  description?: string;
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  progress: number;
  sections: LearningSection[];
  instructor?: {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
  };
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}
