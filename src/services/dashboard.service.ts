'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';

export async function getInstructorDashboardSummary(): Promise<any> {
  try {
    return await apiFetch(`/api/dashboard/instructor/summary`, {
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

export async function getStudentGrowthOfInstructor(): Promise<any> {
  try {
    return await apiFetch(`/api/dashboard/instructor/student-growth`, {
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

export async function getRecentActivitiesOfInstructor(): Promise<any> {
  try {
    return await apiFetch(`/api/dashboard/instructor/recent-activity`, {
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

export async function getAdminDashboardSummary(): Promise<any> {
  try {
    return await apiFetch(`/api/dashboard/admin/summary`, {
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

export async function getCourseRegistrationGrowthOfAdmin(): Promise<any> {
  try {
    return await apiFetch(`/api/dashboard/admin/course-registration-growth`, {
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

export async function getUserGrowthOfAdmin(): Promise<any> {
  try {
    return await apiFetch(`/api/dashboard/admin/user-growth`, {
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
