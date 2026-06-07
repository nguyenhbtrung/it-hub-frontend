import { ApiErrorResponse } from '@/lib/api/types';

export function getAuthErrorMessage(error: ApiErrorResponse) {
  switch (error.code) {
    case 'INVALID_CREDENTIALS':
      return 'Email hoặc mật khẩu không đúng';

    case 'CONFLICT':
      return 'Email này đã được sử dụng';

    case 'UNAUTHORIZED':
      return 'Người dùng chưa xác thực';

    case 'BAD_REQUEST':
      return 'Mật khẩu hiện tại chưa chính xác';

    case 'VALIDATION_ERROR':
      return mapValidation(error);

    default:
      return 'Có lỗi xảy ra';
  }
}

function mapValidation(error: ApiErrorResponse) {
  switch (error.errors?.[0]?.message) {
    case 'Invalid email format':
      return 'Định dạng email không hợp lệ';

    case 'Password must be at least 8 characters':
      return 'Mật khẩu phải có ít nhất 8 ký tự';

    case 'Password must contain at least one uppercase letter':
      return 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa';

    case 'Password must contain at least one lowercase letter':
      return 'Mật khẩu phải chứa ít nhất một chữ cái viết thường';

    case 'Password must contain at least one number':
      return 'Mật khẩu phải chứa ít nhất một chữ số';

    case 'Name must be at least 2 characters':
      return 'Tên phải có ít nhất 2 ký tự';

    default:
      return 'Dữ liệu không hợp lệ';
  }
}
