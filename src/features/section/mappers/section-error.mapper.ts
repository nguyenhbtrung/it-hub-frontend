import { ApiErrorResponse } from '@/lib/api';

export function getSectionErrorMessage(error: ApiErrorResponse) {
  switch (error.code) {
    case 'UNAUTHORIZED':
      return 'Người dùng chưa xác thực';

    case 'FORBIDDEN':
      return 'Bạn không có quyền thực hiện thao tác này';

    case 'NOT_FOUND':
      return 'Không tìm thấy học phần';

    case 'VALIDATION_ERROR':
      return mapValidationError(error);

    default:
      return 'Có lỗi xảy ra';
  }
}

function mapValidationError(error: ApiErrorResponse) {
  switch (error.errors?.[0]?.message) {
    default:
      return 'Dữ liệu không hợp lệ';
  }
}
