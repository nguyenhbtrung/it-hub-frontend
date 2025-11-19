import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import School from '@mui/icons-material/School';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import Forum from '@mui/icons-material/Forum';
import Settings from '@mui/icons-material/Settings';
import { NavItem } from '@/types/navigation.admin';

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: Dashboard,
    href: '/admin',
  },
  {
    label: 'Người dùng',
    icon: People,
    href: '/admin/usersss',
    children: [
      { label: 'Tất cả người dùng', href: '/admin/users' },
      { label: 'Thêm người dùng', href: '/admin/users/add' },
      { label: 'Nhóm người dùng', href: '/admin/users/groups' },
    ],
  },
  {
    label: 'Khóa học',
    icon: School,
    href: '/admin/courses',
    children: [
      { label: 'Tất cả khóa học', href: '/admin/courses' },
      { label: 'Thêm khóa học', href: '/admin/courses/add' },
      { label: 'Danh mục', href: '/admin/courses/categories' },
    ],
  },
  {
    label: 'Cuộc thi',
    icon: EmojiEvents,
    href: '/admin/competitions',
    children: [
      { label: 'Tất cả cuộc thi', href: '/admin/competitions' },
      { label: 'Tạo cuộc thi', href: '/admin/competitions/create' },
      { label: 'Đang diễn ra', href: '/admin/competitions/ongoing' },
    ],
  },
  {
    label: 'Diễn đàn',
    icon: Forum,
    href: '/admin/forum',
    children: [
      { label: 'Tất cả bài viết', href: '/admin/forum' },
      { label: 'Chủ đề', href: '/admin/forum/topics' },
      { label: 'Báo cáo', href: '/admin/forum/reports' },
    ],
  },
  {
    label: 'Cài đặt',
    icon: Settings,
    href: '/admin/settings',
  },
];
