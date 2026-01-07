import { JSONContent } from '@tiptap/core';
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

export type UnitType = 'lesson' | 'excercise';

export interface LearningUnit {
  id: string;
  title: string;
  sectionId: string;
  order: number;
  status: CompletionStatus;
  steps?: Step[];
  excercise?: Excercise;
  type: UnitType;
  lessonType?: 'theory' | 'practice' | 'project' | 'review';
}

export type ExcerciseType = 'assigment' | 'project' | 'quiz' | 'coding';

export interface Excercise {
  id: string;
  type: ExcerciseType;
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
  units: LearningUnit[];
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
  level: CourseLevel;
  totalDuration: number;
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
  description: JSONContent;
  category: { id: string; name: string; slug: string } | undefined | null;
  subCategory: { id: string; name: string; slug: string } | undefined | null;
  tags: { id: string; name: string; slug: string }[];
  avgRating: number;
  reviewCount: number;
  students: number;
  updatedAt: string;
  level: CourseLevel;
  totalDuration: number;
  lessons: number;
  materials: number;
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

export type CourseStatus = 'draft' | 'pending' | 'published' | 'hidden' | 'suspended';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type CourseDuration = 'extraShort' | 'short' | 'medium' | 'long' | 'extraLong';
