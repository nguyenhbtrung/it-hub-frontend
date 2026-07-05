import { CourseSummary } from '@/types/course';

export type CourseCardMobileVariant = 'default' | 'compact';

export interface CourseCardProps {
  course: any;
}

export interface CourseCardHorizontalProps extends CourseCardProps {
  mobileVariant?: CourseCardMobileVariant;
}
