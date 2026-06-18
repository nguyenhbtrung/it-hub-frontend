import { api } from '@/lib/api';

import { AddMaterialPayload, AddStepPayload, UpdateUnitPayload } from '../types/unit.types';

export async function getUnitById(unitId: string) {
  return api.get<any>(`/api/units/${unitId}`, {
    auth: true,
  });
}

export async function updateUnit(unitId: string, payload: UpdateUnitPayload) {
  return api.patch(`/api/units/${unitId}`, payload, {
    auth: true,
  });
}

export async function deleteUnit(unitId: string) {
  return api.delete(`/api/units/${unitId}`, {
    auth: true,
  });
}

export async function addStep(unitId: string, payload: AddStepPayload) {
  return api.post<any>(`/api/units/${unitId}/step`, payload, {
    auth: true,
  });
}

export async function addMaterial(unitId: string, payload: AddMaterialPayload) {
  return api.post<any>(`/api/units/${unitId}/material`, payload, {
    auth: true,
  });
}
