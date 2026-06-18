import { ApiErrorResponse } from '@/lib/api';

export function getCategoryErrorMessage(error: ApiErrorResponse) {
  switch (error.code) {
    case 'NOT_FOUND':
      return 'Không tìm thấy danh mục';

    case 'UNAUTHORIZED':
      return 'Bạn chưa đăng nhập';

    case 'FORBIDDEN':
      return 'Bạn không có quyền truy cập';

    default:
      return 'Có lỗi xảy ra';
  }
}
