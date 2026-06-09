import { ApiClient } from '@/lib/api/api-client';
import { ConfirmUploadPayload, GenerateSignedUploadPayload } from '../types/file.types';

export function generateSignedUpload(payload: GenerateSignedUploadPayload) {
  return ApiClient.request('/api/files/signed-upload', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function confirmUpload(payload: ConfirmUploadPayload) {
  return ApiClient.request('/api/files/confirm-upload', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function deleteFile(fileId: string) {
  return ApiClient.request(`/api/files/${fileId}`, {
    method: 'DELETE',
  });
}
