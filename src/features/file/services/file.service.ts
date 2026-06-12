import { api } from '@/lib/api';
import { ConfirmUploadPayload, GenerateSignedUploadPayload } from '../types/file.types';

export function generateSignedUpload(payload: GenerateSignedUploadPayload) {
  return api.post('/api/files/signed-upload', payload);
}

export function confirmUpload(payload: ConfirmUploadPayload) {
  return api.post('/api/files/confirm-upload', payload);
}

export function deleteFile(fileId: string) {
  return api.delete(`/api/files/${fileId}`);
}
