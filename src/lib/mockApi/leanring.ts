// data/mockCourseData.ts

import { LearningCourse } from '@/types/course';

const mockCourseData: LearningCourse = {
  id: '1',
  title: 'Hello World Masterclass',
  description: 'Khóa học lập trình Hello World từ cơ bản đến nâng cao',
  progress: 45,
  sections: [
    {
      id: 'section-1',
      title: 'Giới thiệu',
      order: 1,
      lessons: [
        {
          id: 'lesson-1-1',
          sectionId: 'section-1',
          title: 'Tổng quan',
          order: 1,
          status: 'completed',
        },
        {
          id: 'lesson-1-2',
          sectionId: 'section-1',
          title: 'Công cụ cần thiết',
          order: 2,
          status: 'completed',
        },
      ],
    },
    {
      id: 'section-2',
      title: 'Kiến thức cơ bản',
      order: 2,
      lessons: [
        {
          id: 'lesson-2-1',
          sectionId: 'section-2',
          title: 'Cài đặt môi trường',
          order: 1,
          status: 'in-progress',
          steps: [
            {
              id: 'step-2-1-1',
              title: 'Giới thiệu',
              order: 1,
              status: 'completed',
            },
            {
              id: 'step-2-1-2',
              title: 'Cấu hình',
              order: 2,
              status: 'in-progress',
            },
            {
              id: 'step-2-1-3',
              title: 'Hoàn tất',
              order: 3,
              status: 'not-started',
            },
          ],
        },
        {
          id: 'lesson-2-2',
          sectionId: 'section-2',
          title: 'Hello World',
          order: 2,
          status: 'not-started',
        },
      ],
    },
    {
      id: 'section-3',
      title: 'Nâng cao',
      order: 3,
      lessons: [],
    },
  ],
};

export const courseApi = {
  getCourse: async (courseId: string): Promise<LearningCourse> => {
    // await new Promise((resolve) => setTimeout(resolve, 300));

    // if (mockCourseData.id === courseId) {
    //   return mockCourseData;
    // }

    // throw new Error('Course not found');
    return mockCourseData;
  },

  updateProgress: async (courseId: string, progress: number): Promise<boolean> => {
    // await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Updating progress for course ${courseId} to ${progress}%`);
    return true;
  },
};
