'use server';

import * as sectionService from '../services/section.service';

import { AddUnitPayload, UpdateSectionPayload } from '../types/section.types';

export async function deleteSectionAction(sectionId: string) {
  return sectionService.deleteSection(sectionId);
}

export async function updateSectionAction(sectionId: string, payload: UpdateSectionPayload) {
  return sectionService.updateSection(sectionId, payload);
}

export async function addUnitAction(sectionId: string, payload: AddUnitPayload) {
  return sectionService.addUnit(sectionId, payload);
}
