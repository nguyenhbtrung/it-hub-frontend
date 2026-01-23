'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';
import { ExcerciseType } from '@/types/course';
import { JSONContent } from '@tiptap/core';

export async function getExerciseByUnitId(unitId: string): Promise<any> {
  try {
    return await apiFetch(`/api/exercises/${unitId}`, {
      auth: true,
      credentials: 'include',
      method: 'GET',
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}

export async function getMyExerciseSubmission(exerciseId: string): Promise<any> {
  try {
    return await apiFetch(`/api/exercises/${exerciseId}/submissions/me`, {
      auth: true,
      credentials: 'include',
      method: 'GET',
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}

export async function addSubmission(
  exerciseId: string,
  payload: {
    score?: number | null;
    demoUrl?: string[];
    note?: string | null;
    fileIds?: string[] | null;
  }
): Promise<any> {
  try {
    return await apiFetch(`/api/exercises/${exerciseId}/submissions`, {
      auth: true,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}

export async function updateExercise(
  unitId: string,
  payload: {
    type?: ExcerciseType;
    description?: string;
    content?: string | JSONContent;
    deadline?: string | null;
    duration?: number;
    passingScore?: number;
    quizzes?: string | any;
  }
): Promise<any> {
  try {
    if (typeof payload.content === 'string') payload.content = JSON.parse(payload.content) as JSONContent;
    if (typeof payload.quizzes === 'string') payload.quizzes = JSON.parse(payload.quizzes);
    return await apiFetch(`/api/exercises/${unitId}`, {
      auth: true,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}

export async function deleteSubmission(submissionId: string): Promise<any> {
  try {
    return await apiFetch(`/api/exercises/submissions/${submissionId}`, {
      auth: true,
      credentials: 'include',
      method: 'DELETE',
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}
