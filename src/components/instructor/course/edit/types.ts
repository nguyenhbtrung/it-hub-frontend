import { UnitType } from '@/types/course';

export type ContentBlockType = 'text' | 'image' | 'video' | 'quiz' | 'file' | 'markdown' | 'code';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title: string;
  content: string;
  order: number;
}

export interface LessonStep {
  id: string;
  lessonId: string;
  title: string;
  content?: string;
  order: number;
  blocks?: ContentBlock[];
}

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  order: number;
  steps: LessonStep[];
  isEditing?: boolean;
}

export type ExcerciseType = 'assigment' | 'project' | 'quiz' | 'coding';

export interface Excercise {
  id: string;
  type: ExcerciseType;
}

export interface Unit {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  steps?: LessonStep[];
  excercise?: Excercise;
  order: number;
  type: UnitType;
}

export interface Section {
  id: string;
  courseId: string;
  title: string;
  description: string;
  objectives: string[];
  order: number;
  units: Unit[];
}
