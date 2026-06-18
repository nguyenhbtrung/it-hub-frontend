'use server';

import * as exerciseService from '../services/exercise.service';

import { AddSubmissionPayload, UpdateExercisePayload, UpdateSubmissionPayload } from '../types/exercise.types';

export async function addSubmissionAction(exerciseId: string, payload: AddSubmissionPayload) {
  return exerciseService.addSubmission(exerciseId, payload);
}

export async function updateExerciseAction(unitId: string, payload: UpdateExercisePayload) {
  return exerciseService.updateExercise(unitId, payload);
}

export async function updateSubmissionAction(id: string, payload: UpdateSubmissionPayload) {
  return exerciseService.updateSubmission(id, payload);
}

export async function deleteSubmissionAction(submissionId: string) {
  return exerciseService.deleteSubmission(submissionId);
}
