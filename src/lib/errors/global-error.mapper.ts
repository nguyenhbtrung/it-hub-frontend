import { ApiErrorResponse } from '@/lib/api/types';

export function getGlobalErrorMessage(error: ApiErrorResponse): string | null {
  switch (error.code) {
    case 'NETWORK_ERROR':
      return 'Không thể kết nối máy chủ';

    case 'INVALID_RESPONSE':
      return 'Phản hồi từ máy chủ không hợp lệ';

    case 'SERVER_ERROR':
      return 'Máy chủ đang gặp sự cố';

    default:
      return null;
  }
}

export function getErrorMessage(error: ApiErrorResponse, featureMapper?: (error: ApiErrorResponse) => string | null) {
  const globalMessage = getGlobalErrorMessage(error);

  if (globalMessage) {
    return globalMessage;
  }

  const featureMessage = featureMapper?.(error);

  if (featureMessage) {
    return featureMessage;
  }

  return error.message || 'Có lỗi xảy ra';
}
