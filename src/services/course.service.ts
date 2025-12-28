'use server';

import { apiFetch } from '@/lib/fetcher/apiFetch';
import { ApiError } from '@/lib/errors/ApiError';
import { CourseStatus } from '@/types/course';

export async function getMyCreatedCourse({
  page = 1,
  limit = 4,
  status,
}: {
  page?: number;
  limit?: number;
  status?: CourseStatus;
}): Promise<any> {
  try {
    return await apiFetch(`/api/courses/me/created?page=${page}&limit=${limit}` + (status ? `&status=${status}` : ''), {
      auth: true,
      credentials: 'include',
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
