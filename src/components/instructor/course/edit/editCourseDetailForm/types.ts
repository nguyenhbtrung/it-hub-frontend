import { CourseLevel } from '@/types/course';

export interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: unknown;
  category: { id: string; name: string };
  subCategory: { id: string; name: string } | undefined;
  level: CourseLevel;
  keyTakeaway: string[];
  requirements: string[];
  tags: string[];
  imgUrl: string | null;
  promoVideoUrl: string | null;
}
