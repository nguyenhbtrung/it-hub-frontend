// data/mockCourseData.ts

import { StepContent } from '@/types/content';
import { LearningCourse, LearningLesson, LearningSection, Step } from '@/types/course';

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
  createdAt: '',
  updatedAt: '',
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

const mockStepContents: StepContent[] = [
  {
    id: 'content-2-1-2',
    stepId: 'step-2-1-2',
    title: 'Hướng dẫn cài đặt trên Windows',
    description: 'Cùng nhau thiết lập môi trường phát triển để sẵn sàng cho khóa học.',
    estimatedTime: 15,
    difficulty: 'beginner',
    objectives: [
      'Hiểu cách cài đặt công cụ lập trình trên Windows',
      'Biết cách cấu hình biến môi trường',
      'Kiểm tra phiên bản đã cài đặt',
    ],
    prerequisites: ['Có máy tính Windows', 'Kết nối internet'],
    blocks: [
      {
        id: 'block-1',
        type: 'heading',
        order: 1,
        text: 'Hướng dẫn cài đặt trên Windows',
        level: 1,
      },
      {
        id: 'block-2',
        type: 'paragraph',
        order: 2,
        content:
          'Trong bài học này, chúng ta sẽ đi qua từng bước để cài đặt và cấu hình phần mềm cần thiết trên hệ điều hành Windows. Hãy đảm bảo bạn đã xem video hướng dẫn và làm theo các bước bên dưới.',
        format: 'markdown',
      },
      {
        id: 'block-3',
        type: 'video',
        order: 3,
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        title: 'Video hướng dẫn cài đặt',
        description: 'Xem video để hiểu rõ quy trình cài đặt',
        duration: 300,
        provider: 'youtube',
        thumbnail:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC3NJ6pve7O3xXBNfXZ02aeoyjtRqK19THpoO-saTRYN1auXqJ6ubfXl-xf5Y7cAfFVYYCpooKFW43fsLJRi_U8JBAe931VVn_HRZsJZbVtN4ahHm6DFwwk1mPa_po9bEEFd8MVIhEiNtWbM5EJtaJ4G6Dsthly0bZ2NPwhj3kxuQviL7yPGcvz13082mKzIswRHQ0p1dIGbehwAK2WXPqwhR2gL3kSvc94jdWWvbe6QiFJJc8k5ss3TIMCsbgsiAmHF_OPIHYS0W8',
      },
      {
        id: 'block-4',
        type: 'heading',
        order: 4,
        text: 'Các bước thực hiện',
        level: 2,
      },
      {
        id: 'block-5',
        type: 'list',
        order: 5,
        items: [
          'Tải xuống tệp cài đặt từ trang web chính thức. Chúng tôi đã cung cấp liên kết trực tiếp để bạn tiện theo dõi.',
          'Chạy tệp .exe vừa tải về và làm theo các hướng dẫn trên màn hình. Lưu ý chọn đúng đường dẫn cài đặt.',
          'Sau khi cài đặt xong, mở ứng dụng lên và tiến hành cấu hình ban đầu như thiết lập ngôn ngữ, giao diện.',
          'Kiểm tra lại phiên bản đã cài đặt để chắc chắn rằng mọi thứ đã hoạt động chính xác.',
        ],
        ordered: true,
      },
      {
        id: 'block-6',
        type: 'note',
        order: 6,
        title: 'Lưu ý quan trọng',
        content:
          'Hãy chắc chắn rằng bạn đã khởi động lại máy tính sau khi quá trình cài đặt hoàn tất để áp dụng tất cả các thay đổi về biến môi trường.',
        variant: 'warning',
      },
      {
        id: 'block-7',
        type: 'code',
        order: 7,
        code: 'node --version\nnpm --version\ngit --version',
        language: 'bash',
        filename: 'Kiểm tra phiên bản',
        highlightLines: [1, 3],
        showLineNumbers: true,
        executable: true,
        expectedOutput: 'v18.17.0\n9.6.7\ngit version 2.41.0.windows.3',
      },
      {
        id: 'block-8',
        type: 'image',
        order: 8,
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqOvXrmog41hF3X4IrNUV3OGtSBcA4XDzGt56vwKk9DnvJ1iWCrQJH0LgNtyo2BM6OFr05rN1ay8JKQj1dTHbe-QhOHj47a4jt_BLoTJedFMcaBMjVVbKoxXhp-xo_92mzAmdpt2F26hadPD9XNE7KMGDnEEKOqsBk8GIyU5_FkRTZCkXLjEm1_0Is3Rz521jN6mVK75qsbYpxyABkquLMQeod1z4KUkHPygsYTRz-VLvW4DBbzj0pefQs9GQ-tVRZuVyO1vyyNH4',
        alt: 'Screenshot của phần mềm sau khi cài đặt',
        caption: 'Giao diện phần mềm sau khi cài đặt thành công',
        width: 800,
        height: 450,
      },
      {
        id: 'block-9',
        type: 'file',
        order: 9,
        filename: 'install_guide.pdf',
        url: '/downloads/install_guide.pdf',
        size: 2048000,
        fileType: 'pdf',
        description: 'Hướng dẫn cài đặt chi tiết (PDF)',
      },
      {
        id: 'block-10',
        type: 'quiz',
        order: 10,
        question: 'Sau khi cài đặt xong, bước nào là QUAN TRỌNG nhất để đảm bảo phần mềm hoạt động đúng?',
        options: [
          {
            id: 'opt-1',
            text: 'Khởi động lại máy tính',
            isCorrect: true,
            explanation: 'Khởi động lại máy giúp áp dụng tất cả thay đổi biến môi trường',
          },
          {
            id: 'opt-2',
            text: 'Xóa file cài đặt',
            isCorrect: false,
          },
          {
            id: 'opt-3',
            text: 'Cài đặt thêm phần mềm khác',
            isCorrect: false,
          },
          {
            id: 'opt-4',
            text: 'Tắt Windows Defender',
            isCorrect: false,
          },
        ],
        explanation: 'Việc khởi động lại máy tính là bắt buộc để hệ thống nhận diện đường dẫn và biến môi trường mới.',
        points: 5,
      },
      {
        id: 'block-11',
        type: 'terminal',
        order: 11,
        commands: [
          {
            command: 'npm init -y',
            output: 'Wrote to /path/to/project/package.json',
            description: 'Khởi tạo project Node.js mới',
          },
          {
            command: 'npm install express',
            output: 'added 57 packages in 3s',
            description: 'Cài đặt Express framework',
          },
        ],
        interactive: true,
      },
    ],
    updatedAt: '2024-01-15T10:30:00Z',
    author: {
      id: 'author-1',
      name: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
  },
];

export const stepApi = {
  // Lấy nội dung step theo ID
  getStepContent: async (stepId: string): Promise<StepContent | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const content = mockStepContents.find((content) => content.stepId === stepId);
    return content || null;
  },

  // Lấy thông tin đầy đủ của step (bao gồm lesson và section)
  getStepDetails: async (
    stepId: string
  ): Promise<{
    step: Step;
    lesson: LearningLesson;
    section: LearningSection;
    content: StepContent;
  } | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Tìm step trong course data
    for (const section of mockCourseData.sections) {
      for (const lesson of section.lessons) {
        if (lesson.steps) {
          const step = lesson.steps.find((s) => s.id === stepId);
          if (step) {
            // Lấy content cho step
            const content = await stepApi.getStepContent(stepId);

            if (content) {
              return {
                step: { ...step, content }, // Embed content vào step
                lesson,
                section,
                content,
              };
            }
          }
        }
      }
    }

    return null;
  },

  // Lấy step tiếp theo
  getNextStep: async (currentStepId: string): Promise<Step | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Logic để tìm step tiếp theo
    // Đơn giản: tìm step cùng lesson và order lớn hơn
    // Hoặc tìm step đầu tiên của lesson tiếp theo

    return null;
  },

  // Lấy step trước đó
  getPreviousStep: async (currentStepId: string): Promise<Step | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Logic tương tự getNextStep
    return null;
  },

  // Update progress của step
  updateStepProgress: async (
    stepId: string,
    data: {
      completed?: boolean;
      timeSpent?: number;
      notes?: string[];
    }
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log(`Updating progress for step ${stepId}:`, data);
    return true;
  },

  // Submit code attempt
  submitCodeAttempt: async (
    stepId: string,
    code: string
  ): Promise<{
    passed: boolean;
    output: string;
    error?: string;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock code evaluation
    return {
      passed: Math.random() > 0.3, // 70% pass rate
      output: 'Code executed successfully\nTests passed: 5/5',
      error: Math.random() > 0.7 ? 'Compilation error on line 5' : undefined,
    };
  },

  // Submit quiz answer
  submitQuizAnswer: async (
    stepId: string,
    questionId: string,
    answerId: string
  ): Promise<{
    correct: boolean;
    score: number;
    explanation?: string;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock quiz evaluation
    return {
      correct: Math.random() > 0.5,
      score: Math.random() > 0.5 ? 5 : 0,
      explanation: 'The correct answer requires understanding of environment variables.',
    };
  },
};
