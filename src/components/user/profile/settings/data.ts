import { SettingsData } from './types';

export const defaultSettings: SettingsData = {
  notifications: {
    emailNotifications: true,
    inAppNotifications: true,
  },
  privacy: {
    publicProfile: true,
    showProgressBadges: true,
    allowEmailSearch: false,
  },
  theme: {
    theme: 'dark',
  },
  account: {
    id: '1',
    email: 'nguyenvana@example.com',
    createdAt: '2023-01-15',
  },
};

export const accountManagementItems = [
  {
    id: 'password',
    title: 'Mật khẩu',
    description: 'Cập nhật mật khẩu thường xuyên để bảo vệ tài khoản',
    buttonText: 'Đổi mật khẩu',
    variant: 'outlined' as const,
    color: 'primary' as const,
  },
  {
    id: 'devices',
    title: 'Thiết bị',
    description: 'Quản lý các thiết bị đã đăng nhập vào tài khoản của bạn',
    buttonText: 'Quản lý thiết bị',
    variant: 'outlined' as const,
    color: 'primary' as const,
  },
  {
    id: 'delete',
    title: 'Vùng nguy hiểm',
    description: 'Xóa vĩnh viễn tài khoản và tất cả dữ liệu liên quan',
    buttonText: 'Xóa tài khoản',
    variant: 'outlined' as const,
    color: 'error' as const,
  },
];

export const notificationItems = [
  {
    id: 'email',
    title: 'Email thông báo',
    description: 'Nhận cập nhật về khóa học và khuyến mãi',
    icon: 'mail' as const,
    defaultChecked: true,
  },
  {
    id: 'in-app',
    title: 'Thông báo trong ứng dụng',
    description: 'Hiển thị popup khi có hoạt động mới',
    icon: 'notifications' as const,
    defaultChecked: true,
  },
];

export const privacyItems = [
  {
    id: 'public-profile',
    title: 'Hồ sơ công khai',
    defaultChecked: true,
  },
  {
    id: 'show-progress',
    title: 'Hiển thị tiến độ & huy hiệu',
    defaultChecked: true,
  },
  {
    id: 'email-search',
    title: 'Cho phép tìm kiếm qua email',
    defaultChecked: false,
  },
];

export const themeOptions = [
  {
    id: 'light',
    label: 'Chế độ sáng',
    icon: 'light_mode',
    bgColor: '#f6f7f8',
    borderColor: '#e7edf3',
  },
  {
    id: 'dark',
    label: 'Chế độ tối',
    icon: 'dark_mode',
    bgColor: '#101922',
    borderColor: '#2A3B4C',
  },
];
