import { CourseLevel } from '@/types/course';
import { Course, CourseStatus, CourseTab } from './types';

export const courseTabs: CourseTab[] = [
  {
    id: 'in-progress',
    label: 'Đang học',
    icon: 'play_circle',
    count: 2,
  },
  {
    id: 'registered',
    label: 'Đã đăng ký',
    icon: 'app_registration',
    count: 1,
  },
  {
    id: 'completed',
    label: 'Đã hoàn thành',
    icon: 'verified',
    count: 1,
  },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Lập trình Web Frontend Nâng cao với ReactJS & Next.js',
    slug: 'lap-trinh-web-frontend-nang-cao-reactjs-nextjs',
    instructor: {
      name: 'Trần Minh Tuấn',
      id: 1,
    },
    level: 'advanced',
    progress: 65,
    category: 'WEB DEV',
    color: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    icon: 'code',
    image: 'https://picsum.photos/200/300?random=1',
  },
  {
    id: '2',
    title: 'Cấu trúc Dữ liệu và Giải thuật với Python',
    slug: 'cau-truc-du-lieu-giai-thuat-python',
    instructor: {
      name: 'Nguyễn Thị Mai',
      id: 2,
    },
    level: 'intermediate',
    progress: 25,
    category: 'DATA',
    color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    icon: 'data_object',
    image: 'https://picsum.photos/200/300?random=2',
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamental: Từ ý tưởng đến thiết kế',
    slug: 'ui-ux-design-fundamental',
    instructor: {
      name: 'Lê Hoàng Nam',
      id: 3,
    },
    level: 'beginner',
    category: 'DESIGN',
    registrationDate: '15/10/2023',
    color: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    icon: 'design_services',
    image: 'https://picsum.photos/200/300?random=3',
  },
  {
    id: '4',
    title: 'Quản trị Cơ sở dữ liệu SQL Server',
    slug: 'quan-tri-co-so-du-lieu-sql-server',
    instructor: {
      name: 'Phạm Văn Dũng',
      id: 4,
    },
    level: 'intermediate',
    category: 'DATABASE',
    completedDate: '20/09/2023',
    color: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    icon: 'database',
    image: 'https://picsum.photos/200/300?random=4',
  },
];

export const getCoursesByStatus = (status: CourseStatus): Course[] => {
  switch (status) {
    case 'in-progress':
      return courses.filter((course) => course.progress !== undefined && course.progress < 100);
    case 'registered':
      return courses.filter((course) => course.registrationDate !== undefined && !course.completedDate);
    case 'completed':
      return courses.filter((course) => course.completedDate !== undefined);
    default:
      return [];
  }
};

export const getLevelLabel = (level: CourseLevel): string => {
  switch (level) {
    case 'beginner':
      return 'Sơ cấp';
    case 'intermediate':
      return 'Trung cấp';
    case 'advanced':
      return 'Nâng cao';
    default:
      return level;
  }
};

export const getLevelColor = (level: CourseLevel): string => {
  switch (level) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'error';
    default:
      return 'default';
  }
};
