import { ApiErrorResponse } from '@/lib/api';

export function getUserErrorMessage(error: ApiErrorResponse) {
  switch (error.code) {
    case 'FORBIDDEN':
      return 'Bạn không có quyền thực hiện thao tác này';

    case 'RECORD_ALREADY_EXISTS':
      return 'Email này đã được sử dụng';

    case 'UNAUTHORIZED':
      return 'Người dùng chưa xác thực';

    case 'NOT_FOUND':
      return 'Không tìm thấy người dùng';

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
