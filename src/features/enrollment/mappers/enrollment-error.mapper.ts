import { ApiErrorResponse } from '@/lib/api';

export function getEnrollmentErrorMessage(error: ApiErrorResponse): string {
  switch (error.code) {
    case 'UNAUTHORIZED':
      return 'Bạn cần đăng nhập để tiếp tục';

    case 'FORBIDDEN':
      return 'Bạn không có quyền thực hiện thao tác này';

    case 'NOT_FOUND':
      return 'Không tìm thấy khóa học hoặc người dùng';

    case 'BAD_REQUEST':
      return 'Yêu cầu không hợp lệ';

    default:
      return 'Có lỗi xảy ra';
  }
}
