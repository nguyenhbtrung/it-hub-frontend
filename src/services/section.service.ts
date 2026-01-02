'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';

export async function deleteSection(sectionId: string): Promise<any> {
  try {
    return await apiFetch(`/api/sections/${sectionId}`, {
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
