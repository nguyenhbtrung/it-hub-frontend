'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';

export async function deleteFile(fileId: string): Promise<any> {
  try {
    return await apiFetch(`/api/files/${fileId}`, {
      credentials: 'include',
      method: 'DELETE',
      auth: true,
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
