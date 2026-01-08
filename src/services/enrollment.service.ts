'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';
import { EnrollmentStatus } from '@/types/enrollment';

export async function createEnrollment(
  courseId: string,
  payload: { status: EnrollmentStatus },
  query?: { userId?: string }
): Promise<any> {
  try {
    return await apiFetch(`/api/enrollments/${courseId}`, {
      query,
      method: 'POST',
      auth: true,
      credentials: 'include',
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

export async function updateEnrollment(
  courseId: string,
  userId: string,
  payload: { status: EnrollmentStatus }
): Promise<any> {
  try {
    return await apiFetch(`/api/enrollments/${courseId}/${userId}`, {
      method: 'PATCH',
      auth: true,
      credentials: 'include',
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

export async function deleteEnrollment(courseId: string, query?: { userId?: string }): Promise<any> {
  try {
    return await apiFetch(`/api/enrollments/${courseId}`, {
      query,
      method: 'DELETE',
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
