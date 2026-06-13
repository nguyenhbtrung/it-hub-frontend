import { ApiErrorResponse } from '@/lib/api';

export function getCourseErrorMessage(error: ApiErrorResponse) {
  switch (error.code) {
    case 'UNAUTHORIZED':
      return 'Người dùng chưa xác thực';

    case 'FORBIDDEN':
      return 'Bạn không có quyền thực hiện thao tác này';

    case 'NOT_FOUND':
      return 'Không tìm thấy khóa học';

    default:
      return 'Có lỗi xảy ra';
  }
}
