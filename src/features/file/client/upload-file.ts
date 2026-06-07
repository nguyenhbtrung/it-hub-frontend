import { API_BASE_URL } from '@/lib/fetcher/constants';
import { confirmUploadAction, generateSignedUploadAction } from '../actions/file.actions';
import { ApiResponse } from '@/lib/api';

export async function uploadFile(file: File, isPermanent: boolean, accessToken: string): Promise<ApiResponse<any>> {
  if (process.env.NEXT_PUBLIC_UPLOAD_STRATEGY === 'direct') {
    return uploadDirectToServer(file, isPermanent, accessToken);
  } else {
    return uploadBySignature(file, isPermanent, accessToken);
  }
}

async function uploadDirectToServer(file: File, isPermanent: boolean, accessToken: string): Promise<ApiResponse<any>> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('isPermanent', isPermanent.toString());

  try {
    const res = await fetch(`${API_BASE_URL}/api/files/upload`, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const result = await res.json();
    return result;
  } catch {
    return {
      success: false,
      code: 'NETWORK_ERROR',
      message: 'Không thể kết nối máy chủ',
      errors: [],
      meta: {},
    };
  }
}

async function uploadBySignature(file: File, isPermanent: boolean, accessToken: string): Promise<ApiResponse> {
  const signedResult = await generateSignedUploadAction({ mimeType: file.type });

  if (!signedResult.success) {
    return signedResult;
  }

  const signedData = signedResult.data;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signedData.apiKey);
  formData.append('timestamp', signedData.timestamp);
  formData.append('signature', signedData.signature);
  formData.append('folder', signedData.folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${signedData.cloudName}/${signedData.resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await uploadRes.json();
  if (!uploadRes.ok) {
    return {
      success: false,
      code: result.code || 'UNKNOWN_ERROR',
      message: result.message || 'Upload failed',
      meta: {},
    };
  }

  const payload = {
    providerPublicId: result.public_id,
    url: result.secure_url,
    mimeType: file.type,
    size: result.bytes,
    originalName: file.name,
    isPermanent,
  };

  return confirmUploadAction(payload);
}
