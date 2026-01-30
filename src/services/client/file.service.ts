import { ApiError } from '@/lib/errors/ApiError';
import { API_BASE_URL } from '@/lib/fetcher/constants';
import { confirmUpload, generateSignedUpload } from '../file.service';

export async function uploadFile(file: File, isPermanent: boolean, accessToken: string): Promise<any> {
  if (process.env.NEXT_PUBLIC_UPLOAD_STRATEGY === 'direct') {
    return uploadDirectToServer(file, isPermanent, accessToken);
  } else {
    return uploadBySignature(file, isPermanent, accessToken);
  }
}

async function uploadDirectToServer(file: File, isPermanent: boolean, accessToken: string): Promise<any> {
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
    if (!res.ok) {
      throw new ApiError(res.status, result.message || 'Upload failed', result.code || 'UNKNOWN_ERROR');
    }
    return result;
  } catch (err) {
    if (err instanceof ApiError) {
      const res = {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.error.message = 'Kích thước file quá lớn (Tối đa 500 MB)';
      }
      return res;
    }
    throw err;
  }
}

async function uploadBySignature(file: File, isPermanent: boolean, accessToken: string): Promise<any> {
  try {
    const signedRes = await generateSignedUpload({ mimeType: file.type });
    const signedData = signedRes.data;

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
      throw new ApiError(uploadRes.status, result.message || 'Upload failed', result.code || 'UNKNOWN_ERROR');
    }

    const payload = {
      providerPublicId: result.public_id,
      url: result.secure_url,
      mimeType: file.type,
      size: result.bytes,
      originalName: file.name,
      isPermanent,
    };

    return confirmUpload(payload);
  } catch (err) {
    if (err instanceof ApiError) {
      const res = {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.error.message = 'Kích thước file quá lớn (Tối đa 500 MB)';
      }
      return res;
    }
    throw err;
  }
}
