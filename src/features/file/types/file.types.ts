export interface GenerateSignedUploadPayload {
  mimeType: string;
}

export interface ConfirmUploadPayload {
  providerPublicId: string;
  url: string;
  mimeType: string;
  size: number;
  originalName: string;
  isPermanent?: boolean;
}
