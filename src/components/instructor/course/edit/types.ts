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
  type: 'lecture' | 'assignment' | 'quiz' | 'resource';
  title: string;
  content?: string;
  order: number;
  blocks?: ContentBlock[];
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  order: number;
  steps: LessonStep[];
  isEditing?: boolean;
}

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description: string;
  objectives: string;
  order: number;
  lessons: Lesson[];
  isExpanded?: boolean;
  isEditing?: boolean;
}
