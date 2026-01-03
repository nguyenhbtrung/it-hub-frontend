'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';
import { JSONContent } from '@tiptap/react';

export interface UpdateStepPayload {
  title?: string;
  content?: string | JSONContent;
}

export async function updateStep(stepId: string, payload: UpdateStepPayload): Promise<any> {
  if (typeof payload.content === 'string') payload.content = JSON.parse(payload.content) as JSONContent;
  try {
    return await apiFetch(`/api/steps/${stepId}`, {
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

export async function deleteStep(stepId: string): Promise<any> {
  try {
    return await apiFetch(`/api/steps/${stepId}`, {
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
