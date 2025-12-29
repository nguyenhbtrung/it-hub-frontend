'use server';

import { apiFetch } from '@/lib/fetcher/apiFetch';
import { ApiError } from '@/lib/errors/ApiError';

interface GetTagsParams {
  page?: number;
  limit?: number;
  q?: string;
}

export async function getTags({ page = 1, limit = 10, q }: GetTagsParams): Promise<any> {
  try {
    return await apiFetch(`/api/tags`, {
      auth: false,
      credentials: 'include',
      query: {
        page,
        limit,
        q,
      },
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
