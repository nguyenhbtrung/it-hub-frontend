import { api } from '@/lib/api';
import { JSONContent } from '@tiptap/core';

import {
  AddSubmissionPayload,
  GetStudentSubmissionsQuery,
  GetSubmissionQuery,
  UpdateExercisePayload,
  UpdateSubmissionPayload,
} from '../types/exercise.types';

export async function getExerciseByUnitId(unitId: string) {
  return api.get<any>(`/api/exercises/${unitId}`, {
    auth: true,
  });
}

export async function getMyExerciseSubmission(exerciseId: string, query?: GetSubmissionQuery) {
  return api.get<any>(`/api/exercises/${exerciseId}/submissions/me`, {
    auth: true,
    query,
  });
}

export async function getSubmissionOverview(unitId: string) {
  return api.get<any>(`/api/exercises/${unitId}/submissions/overview`, {
    auth: true,
  });
}

export async function getStudentSubmissions(unitId: string, query?: GetStudentSubmissionsQuery) {
  return api.get<any>(`/api/exercises/${unitId}/submissions`, {
    auth: true,
    query,
  });
}

export async function getSubmissionById(id: string) {
  return api.get<any>(`/api/exercises/submissions/${id}`, {
    auth: true,
  });
}

export async function getSubmissionsByUnitAndStudent(unitId: string, studentId: string, query?: GetSubmissionQuery) {
  return api.get<any>(`/api/exercises/${unitId}/students/${studentId}/submissions`, {
    auth: true,
    method: 'GET',
    query,
  });
}

export async function addSubmission(exerciseId: string, payload: AddSubmissionPayload) {
  return api.post<any>(`/api/exercises/${exerciseId}/submissions`, payload, {
    auth: true,
  });
}

export async function updateExercise(unitId: string, payload: UpdateExercisePayload) {
  const requestPayload = {
    ...payload,
    content: typeof payload.content === 'string' ? (JSON.parse(payload.content) as JSONContent) : payload.content,
    quizzes: typeof payload.quizzes === 'string' ? JSON.parse(payload.quizzes) : payload.quizzes,
  };

  return api.patch(`/api/exercises/${unitId}`, requestPayload, {
    auth: true,
  });
}

export async function updateSubmission(id: string, payload: UpdateSubmissionPayload) {
  return api.patch(`/api/exercises/submissions/${id}`, payload, {
    auth: true,
  });
}

export async function deleteSubmission(submissionId: string) {
  return api.delete(`/api/exercises/submissions/${submissionId}`, {
    auth: true,
  });
}
