import { ApiErrorResponse } from '@/lib/api';

export function getExerciseErrorMessage(error: ApiErrorResponse) {
  switch (error.code) {
    case 'UNAUTHORIZED':
      return 'Người dùng chưa xác thực';

    case 'FORBIDDEN':
      return 'Bạn không có quyền thực hiện thao tác này';

    case 'NOT_FOUND':
      return 'Không tìm thấy dữ liệu';

    case 'VALIDATION_ERROR':
      return 'Dữ liệu không hợp lệ';

    default:
      return 'Có lỗi xảy ra';
  }
}
