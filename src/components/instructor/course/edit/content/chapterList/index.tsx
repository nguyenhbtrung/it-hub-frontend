'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import ChapterItem from '../chapterItem';
import { LessonStep, Section } from '../../types';

interface ChapterListProps {
  sections: Section[];
  onUpdateSection: (chapterId: string, updates: Partial<Section>) => void;
  onUpdateUnit: (chapterId: string, lessonId: string, updates: Partial<Section>) => void;
  onUpdateStep: (sectionId: string, unitId: string, stepId: string, updates: Partial<LessonStep>) => void;
  onAddLesson: (chapterId: string) => void;
  onAddExcercise: (chapterId: string) => void;
  onAddStep: (sectionId: string, unitId: string) => void;
  onDeleteChapter: (chapterId: string) => void;
  onDeleteStep: (sectionId: string, unitId: string, stepId: string) => void;
  onDeleteUnit: (chapterId: string, lessonId: string) => void;
  onOpenContentEditor: (lessonId: string) => void;
  onReorderSection: (oldIndex: number, newIndex: number) => void;
  onReorderUnit: (sectionId: string, oldIndex: number, newIndex: number) => void;
  onReorderStep: (sectionId: string, unitId: string, oldIndex: number, newIndex: number) => void;
}

export default function ChapterList({
  sections,
  onUpdateSection,
  onUpdateUnit,
  onUpdateStep,
  onAddLesson,
  onAddExcercise,
  onAddStep,
  onDeleteChapter,
  onDeleteUnit,
  onDeleteStep,
  onOpenContentEditor,
  onReorderSection,
  onReorderUnit,
  onReorderStep,
}: ChapterListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('active', active);
    console.log('over', over);

    if (over && active.id !== over.id) {
      // Xử lý sắp xếp lại chapters
      const oldIndex = sections.findIndex((chapter) => chapter.id === active.id);
      const newIndex = sections.findIndex((chapter) => chapter.id === over.id);

      // Trong thực tế, sẽ gọi API để cập nhật order
      console.log('Drag from', oldIndex, 'to', newIndex);
      onReorderSection(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext items={sections.map((chapter) => chapter.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {sections.map((chapter) => (
            <ChapterItem
              key={chapter.id}
              section={chapter}
              onUpdateSection={onUpdateSection}
              onUpdateUnit={onUpdateUnit}
              onUpdateStep={onUpdateStep}
              onAddLesson={onAddLesson}
              onAddExcercise={onAddExcercise}
              onAddStep={onAddStep}
              onDeleteChapter={onDeleteChapter}
              onDeleteUnit={onDeleteUnit}
              onDeleteStep={onDeleteStep}
              onOpenContentEditor={onOpenContentEditor}
              onReorderUnit={onReorderUnit}
              onReorderStep={onReorderStep}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
