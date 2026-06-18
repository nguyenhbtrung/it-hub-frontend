import { api } from '@/lib/api';
import { ApiResponse } from '@/lib/api/types';

import {
  CreateEnrollmentPayload,
  CreateEnrollmentQuery,
  DeleteEnrollmentQuery,
  UpdateEnrollmentPayload,
} from '../types/enrollment.types';

export async function createEnrollment(
  courseId: string,
  payload: CreateEnrollmentPayload,
  query?: CreateEnrollmentQuery
): Promise<ApiResponse> {
  return api.post(`/api/enrollments/${courseId}`, payload, {
    auth: true,
    query,
  });
}

export async function updateEnrollment(
  courseId: string,
  userId: string,
  payload: UpdateEnrollmentPayload
): Promise<ApiResponse> {
  return api.patch(`/api/enrollments/${courseId}/${userId}`, payload, {
    auth: true,
  });
}

export async function deleteEnrollment(courseId: string, query?: DeleteEnrollmentQuery): Promise<ApiResponse> {
  return api.delete(`/api/enrollments/${courseId}`, {
    auth: true,
    query,
  });
}
