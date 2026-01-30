'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';

export async function generateSignedUpload(payload?: { mimeType: string }): Promise<any> {
  try {
    return await apiFetch(`/api/files/signed-upload`, {
      credentials: 'include',
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw err;
  }
}

export async function confirmUpload(payload: {
  providerPublicId: string;
  url: string;
  mimeType: string;
  size: number;
  originalName: string;
  isPermanent?: boolean;
}): Promise<any> {
  try {
    return await apiFetch(`/api/files/confirm-upload`, {
      credentials: 'include',
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw err;
  }
}

export async function deleteFile(fileId: string): Promise<any> {
  try {
    return await apiFetch(`/api/files/${fileId}`, {
      credentials: 'include',
      method: 'DELETE',
      auth: true,
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}
