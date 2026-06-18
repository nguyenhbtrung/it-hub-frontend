import { ApiErrorResponse } from '@/lib/api';

export function getFileErrorMessage(error: ApiErrorResponse) {
  switch (error.code) {
    case 'LIMIT_FILE_SIZE':
      return 'Kích thước file quá lớn (Tối đa 500 MB)';

    case 'UNAUTHORIZED':
      return 'Người dùng chưa xác thực';

    case 'FORBIDDEN':
      return 'Bạn không có quyền thực hiện thao tác này';

    default:
      return 'Có lỗi xảy ra';
  }
}
