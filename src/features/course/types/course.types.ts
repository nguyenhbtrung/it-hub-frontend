import { CourseStatus, ExcerciseType, CourseLevel } from '@/types/course';
import { JSONContent } from '@tiptap/react';

export interface GetCoursesQuery {
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

export interface GetRecommendedCoursesQuery {
  categoryId: string;
}

export interface GetFeaturedCoursesQuery {
  page?: number;
  limit?: number;
}

export interface GetStudentsByCourseIdQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetRegistrationsByCourseIdQuery {
  page?: number;
  limit?: number;
}

export interface GetNavigationByContentIdQuery {
  contentType: 'section' | 'unit' | 'step';
}

export interface GetMyCreatedCourseQuery {
  page?: number;
  limit?: number;
  status?: CourseStatus;
}

export interface GetCourseReviewsQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: string;
}

export type CourseView = 'instructor' | 'student';

export interface GetCourseContentBreadcrumbQuery {
  type: 'section' | 'unit' | 'step';
}

export interface GetCourseExercisesGroupedBySectionQuery {
  page: number;
  limit: number;
  type?: ExcerciseType;
}

export interface CreateCoursePayload {
  title: string;
  categoryId: string;
  subCategoryId: string;
}

export interface AddSectionPayload {
  title: string;
  description: string;
  objectives: string[];
}

export interface CreateOrUpdateReviewPayload {
  rating: number;
  comment?: string;
}

export interface UpdateCourseStatusPayload {
  status: string;
}

export interface UpdateCourseDetailPayload {
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

export interface UpdateCourseImagePayload {
  imageId: string;
}

export interface UpdateCoursePromoVideoPayload {
  promoVideoId: string;
}
