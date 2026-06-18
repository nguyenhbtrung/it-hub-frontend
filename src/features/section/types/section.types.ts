import { UnitType } from '@/types/course';

export interface UpdateSectionPayload {
  title: string;
  description: string;
  objectives: string[];
}

export interface AddUnitPayload {
  title: string;
  description: string;
  type: UnitType;
}
