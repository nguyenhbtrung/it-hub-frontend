import AdminLayout from '@/components/admin/common/adminLayout';

export const metadata = {
  title: 'Admin Panel',
  description: 'Quản lý hệ thống',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
