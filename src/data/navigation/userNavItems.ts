import { NavItem } from '@/types/navigation.user';

// export const userNavItems: NavItem[] = [
//   {
//     label: 'Khám phá',
//     submenu: [
//       {
//         label: 'Web Development',
//         submenu: [
//           { label: 'React', href: '/courses/web/react' },
//           { label: 'Vue', href: '/courses/web/vue' },
//           { label: 'Angular', href: '/courses/web/angular' },
//           { label: 'Node.js', href: '/courses/web/nodejs' },
//         ],
//       },
//       {
//         label: 'Computer Science',
//         submenu: [
//           { label: 'Algorithms', href: '/courses/cs/algorithms' },
//           { label: 'Data Structures', href: '/courses/cs/data-structures' },
//           { label: 'OS', href: '/courses/cs/os' },
//         ],
//       },
//     ],
//   },
//   { label: 'Cuộc thi', href: '/courses' },
//   { label: 'Diễn đàn', href: '/forum' },
// ];

export const userNavItems: NavItem[] = [
  {
    label: 'Khám phá',
    submenu: [
      {
        label: 'Web Development',
        submenu: [
          { label: 'React', href: '/categories/react' },
          { label: 'Vue', href: '/categories/vue' },
          { label: 'Angular', href: '/categories/angular' },
          { label: 'Node.js', href: '/categories/nodejs' },
        ],
      },
      {
        label: 'Computer Science',
        submenu: [
          { label: 'Algorithms', href: '/categories/algorithms' },
          { label: 'Data Structures', href: '/categories/data-structures' },
          { label: 'OS', href: '/categories/os' },
        ],
      },
    ],
  },
  { label: 'Cuộc thi', href: '/courses' },
  { label: 'Diễn đàn', href: '/forum' },
];

export const instructorNavItems: NavItem[] = [{ label: 'Giảng dạy', href: '/instructor' }];

export const studentNavItems: NavItem[] = [{ label: 'Việc học của tôi', href: '/my-learning' }];
