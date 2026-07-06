import AdminLayout from '@/components/admin/common/adminLayout';
import { getMyProfile } from '@/features/user';

export const metadata = {
  title: 'Admin Panel',
  description: 'Quản lý hệ thống',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const profilePromise = getMyProfile();
  return <AdminLayout profilePromise={profilePromise}>{children}</AdminLayout>;
}
