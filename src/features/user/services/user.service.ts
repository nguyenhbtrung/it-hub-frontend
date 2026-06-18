import { api } from '@/lib/api';

import {
  CreateOrUpdateStepLearningProgressPayload,
  CreateUserPayload,
  GetMyLearningCoursesQuery,
  GetUsersQuery,
  UpdateMyProfilePayload,
  UpdateUserPayload,
} from '../types/user.types';
import { cache } from 'react';

export async function getUsers(query?: GetUsersQuery) {
  return api.get<any>('/api/users', {
    auth: true,
    query,
  });
}

export async function getUserById(id: string) {
  return api.get<any>(`/api/users/${id}`, {
    auth: true,
  });
}

export async function getInstructorRegistrations(query?: GetUsersQuery) {
  return api.get<any>('/api/users/instructor/registrations', {
    auth: true,
    query,
  });
}

export const getMyProfile = cache(async () => {
  return api.get<any>('/api/users/me/profile', {
    auth: true,
  });
});

export async function getMyLearningCourses(query?: GetMyLearningCoursesQuery) {
  return api.get<any>('/api/users/me/learn/courses', {
    auth: true,
    query,
  });
}

export async function getMyLearningProgressByStepId(stepId: string) {
  return api.get(`/api/users/me/steps/${stepId}/progress`, {
    auth: true,
  });
}

export async function createUser(payload: CreateUserPayload) {
  return api.post('/api/users', payload, {
    auth: true,
  });
}

export async function updateUser(id: string, payload: UpdateUserPayload) {
  return api.patch(`/api/users/${id}`, payload, {
    auth: true,
  });
}

export async function updateMyProfile(payload: UpdateMyProfilePayload) {
  return api.patch('/api/users/me/profile', payload, {
    auth: true,
  });
}

export async function createOrUpdateStepLearningProgress(
  stepId: string,
  payload: CreateOrUpdateStepLearningProgressPayload
) {
  return api.put(`/api/users/me/steps/${stepId}/progress`, payload, {
    auth: true,
  });
}

export async function deleteUser(id: string) {
  return api.delete(`/api/users/${id}`, {
    auth: true,
  });
}
