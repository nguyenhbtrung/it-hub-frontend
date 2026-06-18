'use server';

import { ApiResponse } from '@/lib/api';
import * as fileApi from '../services/file.service';
import { ConfirmUploadPayload, GenerateSignedUploadPayload } from '../types/file.types';

export async function generateSignedUploadAction(payload: GenerateSignedUploadPayload): Promise<ApiResponse<any>> {
  return fileApi.generateSignedUpload(payload);
}

export async function confirmUploadAction(payload: ConfirmUploadPayload): Promise<ApiResponse<any>> {
  return fileApi.confirmUpload(payload);
}

export async function deleteFileAction(fileId: string): Promise<ApiResponse<any>> {
  return fileApi.deleteFile(fileId);
}
