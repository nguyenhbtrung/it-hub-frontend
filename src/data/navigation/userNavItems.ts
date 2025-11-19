import { NavItem } from '@/types/navigation.user';

export const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  {
    label: 'Khoá học',
    submenu: [
      {
        label: 'Web Development',
        submenu: [
          { label: 'React', href: '/courses/web/react' },
          { label: 'Vue', href: '/courses/web/vue' },
          { label: 'Angular', href: '/courses/web/angular' },
          { label: 'Node.js', href: '/courses/web/nodejs' },
        ],
      },
      {
        label: 'Computer Science',
        submenu: [
          { label: 'Algorithms', href: '/courses/cs/algorithms' },
          { label: 'Data Structures', href: '/courses/cs/data-structures' },
          { label: 'OS', href: '/courses/cs/os' },
        ],
      },
    ],
  },
  { label: 'Cuộc thi', href: '/courses' },
  { label: 'Diễn đàn', href: '/forum' },
];
