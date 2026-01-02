'use client';

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import ChapterList from '../chapterList';
import { Section, Lesson, Unit } from '../../types';
import dynamic from 'next/dynamic';

const ChapterList = dynamic(() => import('../chapterList'), { ssr: false });

interface CourseContentPageProps {
  initialSections: Section[] | null | undefined;
}

export default function CourseContentPage({ initialSections }: CourseContentPageProps) {
  const [sections, setSections] = useState<Section[]>(initialSections || []);

  const updateChapter = (chapterId: string, updates: Partial<Section>) => {
    setSections(sections.map((chapter) => (chapter.id === chapterId ? { ...chapter, ...updates } : chapter)));
    console.log('chapter', sections);
  };

  const updateLesson = (chapterId: string, lessonId: string, updates: Partial<Lesson>) => {
    setSections(
      sections.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            units: chapter.units.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...updates } : lesson)),
          };
        }
        return chapter;
      })
    );
  };

  const addNewChapter = () => {
    const newChapter: Section = {
      id: `chapter-${Date.now()}`,
      courseId: 'course-1',
      title: 'Chương mới',
      description: '',
      objectives: [],
      order: sections.length + 1,
      units: [],
    };
    setSections([...sections, newChapter]);
  };

  const addNewLesson = (chapterId: string) => {
    setSections(
      sections.map((chapter) => {
        if (chapter.id === chapterId) {
          const newLesson: Unit = {
            id: `lesson-${Date.now()}`,
            sectionId: chapterId,
            title: 'Bài học mới',
            description: '',
            order: chapter.units.length + 1,
            steps: [],
            type: 'lesson',
          };
          return {
            ...chapter,
            units: [...chapter.units, newLesson],
            isExpanded: true,
          };
        }
        return chapter;
      })
    );
  };

  const addNewExcercise = (chapterId: string) => {
    setSections(
      sections.map((chapter) => {
        if (chapter.id === chapterId) {
          const newExcercise: Unit = {
            id: `excercise-${Date.now()}`,
            sectionId: chapterId,
            title: 'Bài tập mới',
            description: '',
            order: chapter.units.length + 1,
            steps: [],
            type: 'excercise',
            excercise: {
              id: `excercise-${Date.now()}`,
              type: 'quiz',
            },
          };
          return {
            ...chapter,
            units: [...chapter.units, newExcercise],
            isExpanded: true,
          };
        }
        return chapter;
      })
    );
  };

  const deleteChapter = (chapterId: string) => {
    setSections(sections.filter((chapter) => chapter.id !== chapterId));
  };

  const deleteUnit = (chapterId: string, unitId: string) => {
    setSections(
      sections.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            units: chapter.units.filter((unit) => unit.id !== unitId),
          };
        }
        return chapter;
      })
    );
  };

  const openContentEditor = (stepId: string) => {
    for (const chapter of sections) {
      for (const lesson of chapter.units) {
        const step = lesson.steps?.find((s) => s.id === stepId);
        if (step) {
          return;
        }
      }
    }
  };

  const reorderSection = (oldIndex: number, newIndex: number) => {
    setSections((prevSections) => {
      const updated = [...prevSections];

      const [movedItem] = updated.splice(oldIndex, 1);

      updated.splice(newIndex, 0, movedItem);
      return updated;
    });
  };

  const reorderUnit = (sectionId: string, oldIndex: number, newIndex: number) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id !== sectionId) return section;

        const updatedUnits = [...section.units];
        const [movedUnit] = updatedUnits.splice(oldIndex, 1);
        updatedUnits.splice(newIndex, 0, movedUnit);

        return {
          ...section,
          units: updatedUnits,
        };
      });
    });
  };

  const reorderStep = (sectionId: string, unitId: string, oldIndex: number, newIndex: number) => {
    setSections((prev) => {
      return prev.map((section) => {
        if (section.id !== sectionId) return section;

        const units = section.units.map((unit) => {
          if (unit.id !== unitId) return unit;
          if (!unit?.steps) return unit;

          const updatedSteps = [...unit.steps];
          const [moved] = updatedSteps.splice(oldIndex, 1);
          updatedSteps.splice(newIndex, 0, moved);

          return { ...unit, steps: updatedSteps };
        });

        return { ...section, units };
      });
    });
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
        sections={sections}
        onUpdateChapter={updateChapter}
        onUpdateLesson={updateLesson}
        onAddLesson={addNewLesson}
        onAddExcercise={addNewExcercise}
        onDeleteChapter={deleteChapter}
        onDeleteUnit={deleteUnit}
        onOpenContentEditor={openContentEditor}
        onReorderSection={reorderSection}
        onReorderUnit={reorderUnit}
        onReorderStep={reorderStep}
      />
    </Box>
  );
}
