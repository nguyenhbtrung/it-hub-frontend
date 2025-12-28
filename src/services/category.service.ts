'use server';

import { apiFetch } from '@/lib/fetcher/apiFetch';
import { ApiError } from '@/lib/errors/ApiError';

export async function getCategories({
  page = 1,
  limit = 10,
  all,
  root,
  parentId,
}: {
  page?: number;
  limit?: number;
  all: boolean;
  root: boolean;
  parentId?: string;
}): Promise<any> {
  try {
    return await apiFetch(`/api/categories`, {
      credentials: 'include',
      query: {
        page,
        limit,
        all,
        root,
        parentId,
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
