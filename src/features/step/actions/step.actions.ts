'use server';

import * as stepService from '../services/step.service';

import { UpdateStepPayload } from '../types/step.types';

export async function updateStepAction(stepId: string, payload: UpdateStepPayload) {
  return stepService.updateStep(stepId, payload);
}

export async function deleteStepAction(stepId: string) {
  return stepService.deleteStep(stepId);
}
