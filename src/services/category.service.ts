'use server';

import { apiFetch } from '@/lib/fetcher/apiFetch';
import { ApiError } from '@/lib/errors/ApiError';
import { CourseDuration, CourseLevel } from '@/types/course';

interface GetCoursesByCategoryIdQuery {
  page?: number;
  limit?: number;
  level?: string | string[];
  duration?: string | string[];
  avgRating?: string | string[];
  sortBy?: string | string[];
}

export async function getCoursesByCategoryId(id: string, query: GetCoursesByCategoryIdQuery): Promise<any> {
  const { page, limit, level, duration, avgRating, sortBy } = query;
  try {
    return await apiFetch(`/api/categories/${id}/courses`, {
      query: {
        page,
        limit,
        level,
        duration,
        avgRating,
        sortBy,
      },
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

export async function getCategorySummary(id: string): Promise<any> {
  try {
    return await apiFetch(`/api/categories/${id}/summary`, {
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

export async function getCategoryIdBySlug(slug: string): Promise<any> {
  try {
    return await apiFetch(`/api/categories/${slug}/id`, {
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

export async function getCategoryTree(): Promise<any> {
  try {
    return await apiFetch(`/api/categories/tree`, {
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
      auth: false,
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
