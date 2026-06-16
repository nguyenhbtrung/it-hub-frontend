import { ApiErrorResponse } from '@/lib/api';

export function getTagErrorMessage(error: ApiErrorResponse) {
  switch (error.code) {
    case 'NOT_FOUND':
      return 'Không tìm thấy thẻ';

    case 'VALIDATION_ERROR':
      return 'Dữ liệu không hợp lệ';

    default:
      return 'Có lỗi xảy ra';
  }
}
