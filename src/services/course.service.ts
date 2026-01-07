'use server';

import { apiFetch } from '@/lib/fetcher/apiFetch';
import { ApiError } from '@/lib/errors/ApiError';
import { CourseLevel, CourseStatus } from '@/types/course';
import { JSONContent } from '@tiptap/react';

interface GetCoursesQuery {
  view?: string;
  page?: number;
  limit?: number;
  q?: string | string[];
  level?: string | string[];
  duration?: string | string[];
  avgRating?: string | string[];
  sortBy?: string | string[];
  sortOrder?: string | string[];
  status?: string | string[];
}

export async function getCourses(query: GetCoursesQuery): Promise<any> {
  const { view, page, limit, q, level, duration, avgRating, sortBy, sortOrder, status } = query;
  try {
    return await apiFetch(`/api/courses`, {
      query: {
        view,
        page,
        limit,
        q,
        level,
        duration,
        avgRating,
        sortBy,
        sortOrder,
        status,
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

interface GetRecommendedCoursesQuery {
  categoryId: string;
}
export async function getRecommendedCourses({ categoryId }: GetRecommendedCoursesQuery): Promise<any> {
  try {
    return await apiFetch(`/api/courses/recommended`, {
      query: {
        categoryId,
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

export async function getFeaturedCourses({ page = 1, limit = 4 }: { page?: number; limit?: number }): Promise<any> {
  try {
    return await apiFetch(`/api/courses/featured`, {
      query: {
        page,
        limit,
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

export async function getUserEnrollmentStatus(courseId: string): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${courseId}/user-enrollment-status`, { auth: true });
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

export async function getCourseIdBySlug(slug: string): Promise<any> {
  try {
    return await apiFetch(`/api/courses/slug/${slug}/courseId`);
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

export async function getCourseDetail(id: string, view: 'instructor' | 'student' = 'student'): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${id}`, {
      query: {
        view,
      },
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

export async function getCourseContent(id: string, view: 'instructor' | 'student' = 'student'): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${id}/content`, {
      query: {
        view,
      },
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

export async function getCourseContentOutline(id: string): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${id}/content/outline`, {
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

export async function getCourseContentBreadcrumb(contentId: string, type: 'section' | 'unit' | 'step'): Promise<any> {
  try {
    return await apiFetch(`/api/courses/content/${contentId}/breadcrumb`, {
      query: {
        type,
      },
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

export async function createCourse(payload: {
  title: string;
  categoryId: string;
  subCategoryId: string;
}): Promise<any> {
  try {
    return await apiFetch(`/api/courses`, {
      auth: true,
      credentials: 'include',
      method: 'POST',
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

interface AddSectionPayload {
  title: string;
  description: string;
  objectives: string[];
}

export async function addSection(courseId: string, payload: AddSectionPayload): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${courseId}/section`, {
      auth: true,
      credentials: 'include',
      method: 'POST',
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

interface UpdateCourseDetailPayload {
  title: string;
  categoryId: string;
  subCategoryId: string;
  description: string | JSONContent;
  shortDescription: string;
  level: CourseLevel;
  requirements: string[];
  keyTakeaway: string[];
  tags: string[];
}

export async function updateCourseTotalDuration(courseId: string): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${courseId}/duration`, {
      auth: true,
      credentials: 'include',
      method: 'PATCH',
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

export async function updateCourseStatus(courseId: string, payload: { status: string }): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${courseId}/status`, {
      auth: true,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      const res = {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
      if (err.code === 'FORBIDDEN') {
        res.error.message = 'Bạn không có quyền cập nhật khoá học này';
      } else if (err.code === 'NOT_FOUND') {
        res.error.message = 'Khoá học không tồn tại';
      }
      return res;
    }
    throw err;
  }
}

export async function updateCourseDetail(courseId: string, payload: UpdateCourseDetailPayload): Promise<any> {
  if (typeof payload.description === 'string') payload.description = JSON.parse(payload.description) as JSONContent;
  try {
    return await apiFetch(`/api/courses/${courseId}`, {
      auth: true,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      const res = {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
      if (err.code === 'FORBIDDEN') {
        res.error.message = 'Bạn không có quyền cập nhật khoá học này';
      } else if (err.code === 'NOT_FOUND') {
        res.error.message = 'Khoá học không tồn tại';
      }
      return res;
    }
    throw err;
  }
}

export async function updateCourseImage(courseId: string, imageId: string): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${courseId}/image`, {
      auth: true,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({ imageId }),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      const res = {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
      if (err.code === 'FORBIDDEN') {
        res.error.message = 'Bạn không có quyền cập nhật khoá học này';
      } else if (err.code === 'NOT_FOUND') {
        res.error.message = 'Khoá học không tồn tại';
      }
      return res;
    }
    throw err;
  }
}

export async function updateCoursePromoVideo(courseId: string, promoVideoId: string): Promise<any> {
  try {
    return await apiFetch(`/api/courses/${courseId}/promo-video`, {
      auth: true,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({ promoVideoId }),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      const res = {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
      if (err.code === 'FORBIDDEN') {
        res.error.message = 'Bạn không có quyền cập nhật khoá học này';
      } else if (err.code === 'NOT_FOUND') {
        res.error.message = 'Khoá học không tồn tại';
      }
      return res;
    }
    throw err;
  }
}
