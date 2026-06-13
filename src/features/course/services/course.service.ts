import { cache } from 'react';

import { api } from '@/lib/api';
import { JSONContent } from '@tiptap/react';

import {
  AddSectionPayload,
  CourseView,
  CreateCoursePayload,
  CreateOrUpdateReviewPayload,
  GetCourseContentBreadcrumbQuery,
  GetCourseExercisesGroupedBySectionQuery,
  GetCourseReviewsQuery,
  GetCoursesQuery,
  GetFeaturedCoursesQuery,
  GetMyCreatedCourseQuery,
  GetNavigationByContentIdQuery,
  GetRecommendedCoursesQuery,
  GetRegistrationsByCourseIdQuery,
  GetStudentsByCourseIdQuery,
  UpdateCourseDetailPayload,
  UpdateCourseStatusPayload,
} from '../types/course.types';

export async function getNavigationByContentId(contentId: string, query: GetNavigationByContentIdQuery) {
  return api.get<any>(`/api/courses/navigation/${contentId}`, {
    query,
    auth: false,
  });
}

export async function getStudentsByCourseId(id: string, query: GetStudentsByCourseIdQuery) {
  return api.get<any>(`/api/courses/${id}/students`, {
    query,
    auth: true,
  });
}

export async function getRegistrationsByCourseId(id: string, query: GetRegistrationsByCourseIdQuery) {
  return api.get<any>(`/api/courses/${id}/registrations`, {
    query,
    auth: true,
  });
}

export async function getCourses(query: GetCoursesQuery) {
  return api.get<any>('/api/courses', {
    query,
    auth: true,
  });
}

export async function getRecommendedCourses(query: GetRecommendedCoursesQuery) {
  return api.get<any>('/api/courses/recommended', {
    query,
    auth: true,
  });
}

export async function getFeaturedCourses({ page = 1, limit = 4 }: GetFeaturedCoursesQuery = {}) {
  return api.get<any>('/api/courses/featured', {
    query: {
      page,
      limit,
    },
    auth: false,
  });
}

export async function getMyCreatedCourse({ page = 1, limit = 4, status }: GetMyCreatedCourseQuery = {}) {
  return api.get<any>('/api/courses/me/created', {
    auth: true,
    query: {
      page,
      limit,
      status,
    },
  });
}

export const getUserEnrollmentStatus = cache(async (courseId: string) => {
  return api.get(`/api/courses/${courseId}/user-enrollment-status`, {
    auth: true,
  });
});

export async function getCourseIdBySlug(slug: string) {
  return api.get<string>(`/api/courses/slug/${slug}/courseId`, {
    auth: false,
  });
}

export const getCourseInstructor = cache(async (id: string) => {
  return api.get<any>(`/api/courses/${id}/instructor`, {
    auth: true,
  });
});

export const getCourseReviewStatistics = cache(async (id: string) => {
  return api.get<any>(`/api/courses/${id}/review-statistics`, {
    auth: true,
  });
});

export const getCourseReviews = cache(async (id: string, query?: GetCourseReviewsQuery) => {
  return api.get(`/api/courses/${id}/reviews`, {
    query,
    auth: true,
  });
});

export const getMyReviewOfTheCourse = cache(async (id: string) => {
  return api.get(`/api/courses/${id}/reviews/me`, {
    auth: true,
  });
});

export const getCourseDetail = cache(async (id: string, view: CourseView = 'student') => {
  return api.get<any>(`/api/courses/${id}`, {
    query: {
      view,
    },
    auth: true,
  });
});

export async function getCourseContent(id: string, view: CourseView = 'student') {
  return api.get<any>(`/api/courses/${id}/content`, {
    query: {
      view,
    },
    auth: true,
  });
}

export async function getCourseContentOutline(id: string) {
  return api.get(`/api/courses/${id}/content/outline`, {
    auth: true,
  });
}

export async function getCourseContentBreadcrumb(contentId: string, type: GetCourseContentBreadcrumbQuery['type']) {
  return api.get<any>(`/api/courses/content/${contentId}/breadcrumb`, {
    query: {
      type,
    },
    auth: true,
  });
}

export async function getCourseExercisesGroupedBySection(id: string, query?: GetCourseExercisesGroupedBySectionQuery) {
  return api.get<any>(`/api/courses/${id}/sections/exercises`, {
    query,
    auth: true,
  });
}

export async function createCourse(payload: CreateCoursePayload) {
  return api.post('/api/courses', payload, {
    auth: true,
  });
}

export async function addSection(courseId: string, payload: AddSectionPayload) {
  return api.post<any>(`/api/courses/${courseId}/section`, payload, {
    auth: true,
  });
}

export async function createOrUpdateReview(courseId: string, payload: CreateOrUpdateReviewPayload) {
  return api.put<any>(`/api/courses/${courseId}/reviews`, payload, {
    auth: true,
  });
}

export async function updateCourseTotalDuration(courseId: string) {
  return api.patch(`/api/courses/${courseId}/duration`, {
    auth: true,
  });
}

export async function updateCourseStatus(courseId: string, payload: UpdateCourseStatusPayload) {
  return api.patch(`/api/courses/${courseId}/status`, payload, {
    auth: true,
  });
}

export async function updateCourseDetail(courseId: string, payload: UpdateCourseDetailPayload) {
  const normalizedPayload = {
    ...payload,
    description:
      typeof payload.description === 'string' ? (JSON.parse(payload.description) as JSONContent) : payload.description,
  };

  return api.patch(`/api/courses/${courseId}`, normalizedPayload, {
    auth: true,
  });
}

export async function updateCourseImage(courseId: string, imageId: string) {
  return api.patch(
    `/api/courses/${courseId}/image`,
    { imageId },
    {
      auth: true,
    }
  );
}

export async function updateCoursePromoVideo(courseId: string, promoVideoId: string) {
  return api.patch(
    `/api/courses/${courseId}/promo-video`,
    { promoVideoId },
    {
      auth: true,
    }
  );
}
