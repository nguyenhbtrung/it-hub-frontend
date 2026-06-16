import { api } from '@/lib/api';

import { AddUnitPayload, UpdateSectionPayload } from '../types/section.types';

export async function getSectionById(sectionId: string) {
  return api.get<any>(`/api/sections/${sectionId}`, {
    auth: true,
  });
}

export async function deleteSection(sectionId: string) {
  return api.delete(`/api/sections/${sectionId}`, {
    auth: true,
  });
}

export async function updateSection(sectionId: string, payload: UpdateSectionPayload) {
  return api.patch(`/api/sections/${sectionId}`, payload, {
    auth: true,
  });
}

export async function addUnit(sectionId: string, payload: AddUnitPayload) {
  return api.post<any>(`/api/sections/${sectionId}/unit`, payload, {
    auth: true,
  });
}
