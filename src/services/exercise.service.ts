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

export async function updateExercise(
  unitId: string,
  payload: {
    type?: ExcerciseType;
    description?: string;
    content?: string | JSONContent;
    deadline?: string | null;
    duration?: number;
    passingScore?: number;
  }
): Promise<any> {
  try {
    if (typeof payload.content === 'string') payload.content = JSON.parse(payload.content) as JSONContent;
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
