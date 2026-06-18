'use server';

import * as enrollmentService from '../services/enrollment.service';

import {
  CreateEnrollmentPayload,
  CreateEnrollmentQuery,
  DeleteEnrollmentQuery,
  UpdateEnrollmentPayload,
} from '../types/enrollment.types';

export async function createEnrollmentAction(
  courseId: string,
  payload: CreateEnrollmentPayload,
  query?: CreateEnrollmentQuery
) {
  return enrollmentService.createEnrollment(courseId, payload, query);
}

export async function updateEnrollmentAction(courseId: string, userId: string, payload: UpdateEnrollmentPayload) {
  return enrollmentService.updateEnrollment(courseId, userId, payload);
}

export async function deleteEnrollmentAction(courseId: string, query?: DeleteEnrollmentQuery) {
  return enrollmentService.deleteEnrollment(courseId, query);
}
