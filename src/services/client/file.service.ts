import { ApiError } from '@/lib/errors/ApiError';
import { API_BASE_URL } from '@/lib/fetcher/constants';

export async function uploadFile(file: File, isPermanent: boolean, accessToken: string): Promise<any> {
  if (process.env.NEXT_PUBLIC_UPLOAD_STRATEGY === 'direct') {
    return uploadDirectToServer(file, isPermanent, accessToken);
  } else {
    return uploadViaCloudinary(file, isPermanent, accessToken);
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

async function uploadViaCloudinary(file: File, isPermanent: boolean, accessToken: string): Promise<any> {}
