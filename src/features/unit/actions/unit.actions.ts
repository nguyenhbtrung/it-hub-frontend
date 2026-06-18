'use server';

import * as unitService from '../services/unit.service';

import { AddMaterialPayload, AddStepPayload, UpdateUnitPayload } from '../types/unit.types';

export async function updateUnitAction(unitId: string, payload: UpdateUnitPayload) {
  return unitService.updateUnit(unitId, payload);
}

export async function deleteUnitAction(unitId: string) {
  return unitService.deleteUnit(unitId);
}

export async function addStepAction(unitId: string, payload: AddStepPayload) {
  return unitService.addStep(unitId, payload);
}

export async function addMaterialAction(unitId: string, payload: AddMaterialPayload) {
  return unitService.addMaterial(unitId, payload);
}
