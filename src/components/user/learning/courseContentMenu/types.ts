import { ExcerciseType, UnitType } from '@/types/course';

export interface LearningCourse {
  id: string;
  contentId?: string;
  title: string;
  slug: string;
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

interface SectionBase {
  id: string;
  title: string;
  order: number;
}

export interface LearningSection extends SectionBase {
  units: LearningUnit[];
  description?: string;
}

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

export type CompletionStatus = 'completed' | 'not-started' | 'submitted' | 'not_passed';

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

export interface Excercise {
  id: string;
  type: ExcerciseType;
}

export interface StepContent {
  id: string;
  stepId: string;
  title: string;
  description?: string;
  blocks: ContentBlock[];
  estimatedTime?: number; // minutes
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  objectives?: string[];
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface StepProgress {
  stepId: string;
  userId: string;
  completed: boolean;
  timeSpent: number; // seconds
  lastAccessed: string;
  notes?: string[];
  codeAttempts?: {
    timestamp: string;
    code: string;
    passed: boolean;
  }[];
}

export type ContentBlock =
  | TextBlock
  | MarkdownBlock
  | CodeBlock
  | HeadingBlock
  | ParagraphBlock
  | VideoBlock
  | ImageBlock
  | NoteBlock
  | ListBlock
  | QuizBlock
  | FileBlock
  | InteractiveBlock
  | TerminalBlock;

export type ContentBlockType =
  | 'text'
  | 'markdown'
  | 'heading'
  | 'paragraph'
  | 'video'
  | 'image'
  | 'code'
  | 'note'
  | 'list'
  | 'quiz'
  | 'file'
  | 'interactive'
  | 'terminal';

export interface BaseContentBlock {
  id: string;
  type: ContentBlockType;
  order: number;
  metadata?: Record<string, any>;
}

export interface TextBlock extends BaseContentBlock {
  type: 'text';
  content: string;
}

export interface MarkdownBlock extends BaseContentBlock {
  type: 'markdown';
  content: string;
}

export interface CodeBlock extends BaseContentBlock {
  type: 'code';
  code: string;
}

export interface HeadingBlock extends BaseContentBlock {
  type: 'heading';
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ParagraphBlock extends BaseContentBlock {
  type: 'paragraph';
  content: string;
  format?: 'markdown' | 'html' | 'plain';
}

export interface VideoBlock extends BaseContentBlock {
  type: 'video';
  url: string;
  title?: string;
  description?: string;
  duration?: number; // seconds
  provider?: 'youtube' | 'vimeo' | 'custom';
  thumbnail?: string;
}

export interface ImageBlock extends BaseContentBlock {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

// export interface CodeBlock extends BaseContentBlock {
//   type: 'code';
//   code: string;
//   language: string;
//   filename?: string;
//   highlightLines?: number[];
//   showLineNumbers?: boolean;
//   executable?: boolean;
//   expectedOutput?: string;
// }

export interface NoteBlock extends BaseContentBlock {
  type: 'note';
  title?: string;
  content: string;
  variant?: 'info' | 'warning' | 'danger' | 'success' | 'tip';
}

export interface ListBlock extends BaseContentBlock {
  type: 'list';
  items: string[];
  ordered?: boolean;
}

export interface QuizBlock extends BaseContentBlock {
  type: 'quiz';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  explanation?: string;
  points?: number;
}

export interface FileBlock extends BaseContentBlock {
  type: 'file';
  filename: string;
  url: string;
  size?: number;
  fileType?: string;
  description?: string;
}

export interface InteractiveBlock extends BaseContentBlock {
  type: 'interactive';
  title: string;
  description?: string;
  challenge: string;
  starterCode?: string;
  solution?: string;
  language?: string;
}

export interface TerminalBlock extends BaseContentBlock {
  type: 'terminal';
  commands: {
    command: string;
    output: string;
    description?: string;
  }[];
  interactive?: boolean;
}
