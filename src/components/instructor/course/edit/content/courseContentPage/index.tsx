'use client';

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import ChapterList from '../chapterList';
import { Section, Lesson, Unit } from '../../types';
import dynamic from 'next/dynamic';
import { addSection } from '@/services/course.service';
import { useNotification } from '@/contexts/notificationContext';
import { addUnit, deleteSection, updateSection, UpdateSectionPayload } from '@/services/section.service';
import { UnitType } from '@/types/course';
import { addStep, deleteUnit, updateUnit, UpdateUnitPayload } from '@/services/unit.service';

const ChapterList = dynamic(() => import('../chapterList'), { ssr: false });

interface CourseContentPageProps {
  initialSections: Section[] | null | undefined;
  courseId: string;
}

export default function CourseContentPage({ initialSections, courseId }: CourseContentPageProps) {
  const [sections, setSections] = useState<Section[]>(initialSections || []);
  const { notify } = useNotification();

  const handleUpdateSection = async (sectionId: string, updates: Partial<Section>) => {
    const res = await updateSection(sectionId, updates as UpdateSectionPayload);
    if (res?.success) {
      setSections(sections.map((chapter) => (chapter.id === sectionId ? { ...chapter, ...updates } : chapter)));
    } else {
      notify('error', 'Lưu chương thất bại', { vertical: 'top', horizontal: 'right' });
    }
  };

  const handleUpdateUnit = async (sectionId: string, unitId: string, updates: Partial<Lesson>) => {
    const res = await updateUnit(unitId, updates as UpdateUnitPayload);
    if (res?.success) {
      setSections(
        sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              units: section.units.map((unit) => (unit.id === unitId ? { ...unit, ...updates } : unit)),
            };
          }
          return section;
        })
      );
    } else {
      notify('error', 'Lưu thất bại', { vertical: 'top', horizontal: 'right' });
    }
  };

  const addNewSection = async () => {
    const res = await addSection(courseId, {
      title: 'Chương mới',
      description: '',
      objectives: [],
    });
    if (res?.success && res?.data) {
      setSections([...sections, res.data]);
    } else {
      notify('error', 'Thêm chương mới thất bại, vui lòng thử lại', { vertical: 'top', horizontal: 'right' });
    }
  };

  const addNewLesson = async (sectionId: string) => {
    const payload = {
      title: 'Bài học mới',
      description: '',
      type: 'lesson' as UnitType,
    };
    const res = await addUnit(sectionId, payload);
    if (res?.success && res?.data) {
      setSections(
        sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              units: [...section.units, res.data],
            };
          }
          return section;
        })
      );
    } else {
      notify('error', 'Thêm bài giảng mới thất bại, vui lòng thử lại', { vertical: 'top', horizontal: 'right' });
    }
  };

  const addNewStep = async (sectionId: string, unitId: string) => {
    const payload = {
      title: 'Nội dung mới',
    };

    const res = await addStep(unitId, payload);
    if (res?.success && res?.data) {
      setSections(
        sections.map((section) => {
          if (section.id !== sectionId) return section;

          return {
            ...section,
            units: section.units.map((unit) => {
              if (unit.id !== unitId) return unit;

              return {
                ...unit,
                steps: [...(unit.steps ?? []), res.data],
              };
            }),
          };
        })
      );
    } else {
      notify('error', 'Thêm nội dung mới thất bại, vui lòng thử lại', {
        vertical: 'top',
        horizontal: 'right',
      });
    }
  };

  const addNewExcercise = async (sectionId: string) => {
    const payload = {
      title: 'Bài tập mới',
      description: '',
      type: 'excercise' as UnitType,
    };
    const res = await addUnit(sectionId, payload);
    if (res?.success && res?.data) {
      setSections(
        sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              units: [...section.units, res.data],
            };
          }
          return section;
        })
      );
    } else {
      notify('error', 'Thêm bài tập mới thất bại, vui lòng thử lại', { vertical: 'top', horizontal: 'right' });
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    const res = await deleteSection(sectionId);
    if (res?.success) {
      setSections(sections.filter((section) => section.id !== sectionId));
    } else {
      notify('error', 'Xoá chương thất bại, vui lòng thử lại', { vertical: 'top', horizontal: 'right' });
    }
  };

  const handleDeleteUnit = async (sectionId: string, unitId: string) => {
    const res = await deleteUnit(unitId);
    if (res?.success) {
      setSections(
        sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              units: section.units.filter((unit) => unit.id !== unitId),
            };
          }
          return section;
        })
      );
    } else {
      notify('error', 'Xoá nội dung thất bại, vui lòng thử lại', { vertical: 'top', horizontal: 'right' });
    }
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
          onClick={addNewSection}
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
        onUpdateSection={handleUpdateSection}
        onUpdateUnit={handleUpdateUnit}
        onAddLesson={addNewLesson}
        onAddExcercise={addNewExcercise}
        onAddStep={addNewStep}
        onDeleteChapter={handleDeleteSection}
        onDeleteUnit={handleDeleteUnit}
        onOpenContentEditor={openContentEditor}
        onReorderSection={reorderSection}
        onReorderUnit={reorderUnit}
        onReorderStep={reorderStep}
      />
    </Box>
  );
}
