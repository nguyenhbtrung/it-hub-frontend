import { ApiErrorResponse } from '@/lib/api';

export function getDashboardErrorMessage(error: ApiErrorResponse): string {
  switch (error.code) {
    case 'UNAUTHORIZED':
      return 'Bạn cần đăng nhập để tiếp tục';

    case 'FORBIDDEN':
      return 'Bạn không có quyền truy cập dữ liệu này';

    default:
      return 'Có lỗi xảy ra';
  }
}
