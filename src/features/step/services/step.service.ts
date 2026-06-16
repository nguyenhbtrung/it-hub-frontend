import { api } from '@/lib/api';
import { JSONContent } from '@tiptap/react';

import { UpdateStepPayload } from '../types/step.types';

export async function getStepById(stepId: string) {
  return api.get<any>(`/api/steps/${stepId}`, {
    auth: true,
  });
}

export async function updateStep(stepId: string, payload: UpdateStepPayload) {
  const requestPayload = {
    ...payload,
    content: typeof payload.content === 'string' ? (JSON.parse(payload.content) as JSONContent) : payload.content,
  };

  return api.patch(`/api/steps/${stepId}`, requestPayload, {
    auth: true,
  });
}

export async function deleteStep(stepId: string) {
  return api.delete(`/api/steps/${stepId}`, {
    auth: true,
  });
}
