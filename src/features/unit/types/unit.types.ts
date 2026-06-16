export interface UpdateUnitPayload {
  title: string;
  description?: string;
}

export interface AddStepPayload {
  title: string;
}

export interface AddMaterialPayload {
  fileId: string;
}
