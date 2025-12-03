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
import { Chapter } from '../../types';

interface ChapterListProps {
  chapters: Chapter[];
  onToggleChapter: (chapterId: string) => void;
  onToggleChapterEdit: (chapterId: string) => void;
  onToggleLessonEdit: (chapterId: string, lessonId: string) => void;
  onUpdateChapter: (chapterId: string, updates: Partial<Chapter>) => void;
  onUpdateLesson: (chapterId: string, lessonId: string, updates: Partial<Chapter>) => void;
  onAddLesson: (chapterId: string) => void;
  onDeleteChapter: (chapterId: string) => void;
  onDeleteLesson: (chapterId: string, lessonId: string) => void;
  onOpenContentEditor: (lessonId: string) => void;
}

export default function ChapterList({
  chapters,
  onToggleChapter,
  onToggleChapterEdit,
  onToggleLessonEdit,
  onUpdateChapter,
  onUpdateLesson,
  onAddLesson,
  onDeleteChapter,
  onDeleteLesson,
  onOpenContentEditor,
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

    if (over && active.id !== over.id) {
      // Xử lý sắp xếp lại chapters
      const oldIndex = chapters.findIndex((chapter) => chapter.id === active.id);
      const newIndex = chapters.findIndex((chapter) => chapter.id === over.id);

      // Trong thực tế, sẽ gọi API để cập nhật order
      console.log('Drag from', oldIndex, 'to', newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext items={chapters.map((chapter) => chapter.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {chapters.map((chapter) => (
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              onToggleChapter={onToggleChapter}
              onToggleChapterEdit={onToggleChapterEdit}
              onToggleLessonEdit={onToggleLessonEdit}
              onUpdateChapter={onUpdateChapter}
              onUpdateLesson={onUpdateLesson}
              onAddLesson={onAddLesson}
              onDeleteChapter={onDeleteChapter}
              onDeleteLesson={onDeleteLesson}
              onOpenContentEditor={onOpenContentEditor}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
