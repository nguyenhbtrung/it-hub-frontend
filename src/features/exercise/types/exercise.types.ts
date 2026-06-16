import { ExcerciseType } from '@/types/course';
import { JSONContent } from '@tiptap/core';

export interface GetSubmissionQuery {
  page?: number;
  limit?: number;
}

export interface GetStudentSubmissionsQuery {
  page?: number;
  limit?: number;
  q?: string | string[];
  status?: string | string[];
}

export interface AddSubmissionPayload {
  score?: number | null;
  demoUrl?: string[];
  note?: string | null;
  fileIds?: string[] | null;
  quizResultsMetadata?: string | null;
}

export interface UpdateExercisePayload {
  type?: ExcerciseType;
  description?: string;
  content?: string | JSONContent;
  deadline?: string | null;
  duration?: number;
  passingScore?: number;
  quizzes?: string | any;
}

export interface UpdateSubmissionPayload {
  score?: number;
  comment?: string;
}
