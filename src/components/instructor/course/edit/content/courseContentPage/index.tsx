'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, IconButton, Collapse, TextField, TextareaAutosize } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import QuizIcon from '@mui/icons-material/Quiz';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ChapterList from '../chapterList';
import EditContentModal from '../editContentModal';
import { Chapter, Lesson, LessonStep } from '../../types';

// Mock data
const initialChapters: Chapter[] = [
  {
    id: '1',
    courseId: 'course-1',
    title: 'Giới thiệu về React và Môi trường',
    description: '',
    objectives: '',
    order: 1,
    isExpanded: true,
    isEditing: false,
    lessons: [
      {
        id: '1-1',
        chapterId: '1',
        title: 'Tổng quan về ReactJS',
        description: '',
        order: 1,
        isEditing: false,
        steps: [
          {
            id: '1-1-1',
            type: 'lecture',
            title: 'Bài giảng: React là gì?',
            content: '',
            order: 1,
            blocks: [
              {
                id: '1',
                type: 'text',
                title: 'Khối văn bản',
                content:
                  '<h1>Hướng dẫn cài đặt trên Windows</h1><p>Trong bài học này, chúng ta sẽ đi qua từng bước để cài đặt và cấu hình phần mềm cần thiết trên hệ điều hành Windows. Hãy đảm bảo bạn đã xem video hướng dẫn và làm theo các bước bên dưới.</p>',
                order: 1,
              },
              { id: '2', type: 'image', title: 'Khối hình ảnh', content: 'https://picsum.photos/600/300', order: 2 },
              {
                id: '3',
                type: 'text',
                title: 'Khối văn bản',
                content:
                  '<h2>Các bước thực hiện</h2><ol><li><p>Tải xuống tệp cài đặt từ trang web chính thức. Chúng tôi đã cung cấp liên kết trực tiếp để bạn tiện theo dõi.</p></li><li><p>Chạy tệp .exe vừa tải về và làm theo các hướng dẫn trên màn hình. Lưu ý chọn đúng đường dẫn cài đặt.</p></li><li><p>Sau khi cài đặt xong, mở ứng dụng lên và tiến hành cấu hình ban đầu như thiết lập ngôn ngữ, giao diện.</p></li><li><p>Kiểm tra lại phiên bản đã cài đặt để chắc chắn rằng mọi thứ đã hoạt động chính xác.</p></li></ol>',
                order: 3,
              },
              {
                id: '4',
                type: 'markdown',
                title: 'Khối văn bản',
                content: `
# Markdown 

Inline code: \`console.log("Hello " + name);\`

Block code:

\`\`\`javascript
function greet(name) {
  console.log("Hello " + name);
}
greet("Next.js");
\`\`\`
        `,
                order: 3,
              },
            ],
          },
          {
            id: '1-1-2',
            type: 'quiz',
            title: 'Bài tập: Quiz kiểm tra kiến thức',
            content: '',
            order: 2,
          },
        ],
      },
      {
        id: '1-2',
        chapterId: '1',
        title: 'Cài đặt môi trường phát triển',
        description: '',
        order: 2,
        isEditing: false,
        steps: [],
      },
    ],
  },
  {
    id: '2',
    courseId: 'course-1',
    title: 'Components và Props',
    description: '',
    objectives: '',
    order: 2,
    isExpanded: false,
    isEditing: false,
    lessons: [],
  },
];

export default function CourseContentPage() {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState<LessonStep | null>(null);

  const toggleChapter = (chapterId: string) => {
    setChapters(
      chapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, isExpanded: !chapter.isExpanded } : chapter))
    );
  };

  const toggleChapterEdit = (chapterId: string) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, isEditing: !chapter.isEditing } : { ...chapter, isEditing: false }
      )
    );
  };

  const toggleLessonEdit = (chapterId: string, lessonId: string) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson) =>
              lesson.id === lessonId ? { ...lesson, isEditing: !lesson.isEditing } : { ...lesson, isEditing: false }
            ),
          };
        }
        return chapter;
      })
    );
  };

  const updateChapter = (chapterId: string, updates: Partial<Chapter>) => {
    setChapters(chapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, ...updates } : chapter)));
  };

  const updateLesson = (chapterId: string, lessonId: string, updates: Partial<Lesson>) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...updates } : lesson)),
          };
        }
        return chapter;
      })
    );
  };

  const addNewChapter = () => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      courseId: 'course-1',
      title: 'Chương mới',
      description: '',
      objectives: '',
      order: chapters.length + 1,
      isExpanded: true,
      isEditing: true,
      lessons: [],
    };
    setChapters([...chapters, newChapter]);
  };

  const addNewLesson = (chapterId: string) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          const newLesson: Lesson = {
            id: `lesson-${Date.now()}`,
            chapterId,
            title: 'Bài học mới',
            description: '',
            order: chapter.lessons.length + 1,
            isEditing: true,
            steps: [],
          };
          return {
            ...chapter,
            lessons: [...chapter.lessons, newLesson],
            isExpanded: true,
          };
        }
        return chapter;
      })
    );
  };

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
  };

  const deleteLesson = (chapterId: string, lessonId: string) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.filter((lesson) => lesson.id !== lessonId),
          };
        }
        return chapter;
      })
    );
  };

  const updateStep = (stepId: string, updatedStep: Partial<LessonStep>) => {
    setChapters(
      chapters.map((chapter) => ({
        ...chapter,
        lessons: chapter.lessons.map((lesson) => ({
          ...lesson,
          steps: lesson.steps.map((step) => (step.id === stepId ? { ...step, ...updatedStep } : step)),
        })),
      }))
    );
    setIsModalOpen(false);
  };

  const openContentEditor = (stepId: string) => {
    for (const chapter of chapters) {
      for (const lesson of chapter.lessons) {
        const step = lesson.steps.find((s) => s.id === stepId);
        if (step) {
          setSelectedStep(step);
          setIsModalOpen(true);
          return;
        }
      }
    }
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant='h5' fontWeight='bold' gutterBottom>
            Nội dung khóa học
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Sắp xếp, thêm, sửa, xóa các chương, bài học và nội dung chi tiết.
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddCircleIcon />}
          onClick={addNewChapter}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Thêm chương mới
        </Button>
      </Box>

      {/* Chapters List */}
      <ChapterList
        chapters={chapters}
        onToggleChapter={toggleChapter}
        onToggleChapterEdit={toggleChapterEdit}
        onToggleLessonEdit={toggleLessonEdit}
        onUpdateChapter={updateChapter}
        onUpdateLesson={updateLesson}
        onAddLesson={addNewLesson}
        onDeleteChapter={deleteChapter}
        onDeleteLesson={deleteLesson}
        onOpenContentEditor={openContentEditor}
      />

      {/* Edit Content Modal */}
      <EditContentModal open={isModalOpen} onClose={() => {}} onUpdate={updateStep} step={selectedStep} />
    </Box>
  );
}
