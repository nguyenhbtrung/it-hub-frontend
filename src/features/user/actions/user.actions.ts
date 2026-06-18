'use server';

import * as userService from '../services/user.service';

import {
  CreateOrUpdateStepLearningProgressPayload,
  CreateUserPayload,
  UpdateMyProfilePayload,
  UpdateUserPayload,
} from '../types/user.types';

export async function createUserAction(payload: CreateUserPayload) {
  return userService.createUser(payload);
}

export async function updateUserAction(id: string, payload: UpdateUserPayload) {
  return userService.updateUser(id, payload);
}

export async function updateMyProfileAction(payload: UpdateMyProfilePayload) {
  return userService.updateMyProfile(payload);
}

export async function createOrUpdateStepLearningProgressAction(
  stepId: string,
  payload: CreateOrUpdateStepLearningProgressPayload
) {
  return userService.createOrUpdateStepLearningProgress(stepId, payload);
}

export async function deleteUserAction(id: string) {
  return userService.deleteUser(id);
}
