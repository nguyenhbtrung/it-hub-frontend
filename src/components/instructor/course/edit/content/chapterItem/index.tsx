'use client';

import { useState } from 'react';
import { Box, Paper, Typography, IconButton, Collapse, TextField, TextareaAutosize, Button } from '@mui/material';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LessonItem from '../lessonItem';
import CloseIcon from '@mui/icons-material/Close';
import { Section, Lesson, LessonStep } from '../../types';
import ExcerciseItem from '../excerciseItem';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

interface ChapterItemProps {
  section: Section;
  onUpdateSection: (chapterId: string, updates: Partial<Section>) => void;
  onUpdateUnit: (sectionId: string, unitId: string, updates: any) => void;
  onUpdateStep: (sectionId: string, unitId: string, stepId: string, updates: Partial<LessonStep>) => void;
  onAddLesson: (chapterId: string) => void;
  onAddExcercise: (chapterId: string) => void;
  onAddStep: (sectionId: string, unitId: string) => void;
  onDeleteChapter: (chapterId: string) => void;
  onDeleteUnit: (chapterId: string, lessonId: string) => void;
  onDeleteStep: (sectionId: string, unitId: string, stepId: string) => void;
  onOpenContentEditor: (lessonId: string) => void;
  onReorderUnit: (sectionId: string, oldIndex: number, newIndex: number) => void;
  onReorderStep: (sectionId: string, unitId: string, oldIndex: number, newIndex: number) => void;
}

export default function ChapterItem({
  section,
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
  onReorderUnit,
  onReorderStep,
}: ChapterItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [localTitle, setLocalTitle] = useState(section.title);
  const [localDescription, setLocalDescription] = useState(section.description);
  const [localObjectives, setLocalObjectives] = useState<string[]>(section.objectives || []);
  const [isAddingUnit, setIsAddingUnit] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    onUpdateSection(section.id, {
      title: localTitle,
      description: localDescription,
      objectives: localObjectives,
    });
    setIsEditing(false);
  };

  const addObjective = () => {
    setLocalObjectives([...localObjectives, '']);
  };

  const removeObjective = (index: number) => {
    setLocalObjectives(localObjectives.filter((_, i) => i !== index));
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...localObjectives];
    newObjectives[index] = value;
    setLocalObjectives(newObjectives);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('active', active);
    console.log('over', over);

    if (over && active.id !== over.id) {
      // Xử lý sắp xếp lại chapters
      const oldIndex = section.units.findIndex((unit) => unit.id === active.id);
      const newIndex = section.units.findIndex((unit) => unit.id === over.id);

      // Trong thực tế, sẽ gọi API để cập nhật order
      console.log('Drag from', oldIndex, 'to', newIndex);
      onReorderUnit(section.id, oldIndex, newIndex);
    }
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'customBackground.5',
      }}
    >
      {/* Chapter Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          cursor: 'pointer',
        }}
      >
        <IconButton size='small' onClick={() => setIsExpanded((prev) => !prev)} sx={{ mr: 1 }}>
          {isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton>

        <Box {...listeners} sx={{ cursor: 'grab', mr: 2, display: 'flex', alignItems: 'center' }}>
          <DragIndicatorIcon sx={{ color: 'text.disabled' }} />
        </Box>

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='body2' fontWeight='bold' color='text.secondary'>
            Chương {section.order}
          </Typography>
          {isEditing ? (
            <TextField
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              variant='outlined'
              size='small'
              fullWidth
              sx={{ maxWidth: 400 }}
            />
          ) : (
            <Typography variant='subtitle1' fontWeight='semibold'>
              {section.title}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size='small'
            onClick={() => {
              setIsAddingUnit((prev) => !prev);
              setIsExpanded(true);
            }}
            title='Thêm đơn vị học tập'
          >
            <AddIcon />
          </IconButton>
          <IconButton size='small' onClick={() => setIsEditing((prev) => !prev)} title='Chỉnh sửa chương'>
            <EditIcon />
          </IconButton>
          <IconButton size='small' onClick={() => onDeleteChapter(section.id)} title='Xóa chương'>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={isAddingUnit}>
        <Box display='flex' gap={1} sx={{ borderTop: 1, borderColor: 'divider', p: 3 }}>
          <IconButton onClick={() => setIsAddingUnit(false)}>
            <CloseIcon />
          </IconButton>
          <Button variant='contained' onClick={() => onAddLesson(section.id)}>
            Bài giảng
          </Button>
          <Button variant='contained' onClick={() => onAddExcercise(section.id)} color='warning'>
            Bài tập
          </Button>
        </Box>
      </Collapse>

      {/* Chapter Edit Form */}
      <Collapse in={isEditing}>
        <Box sx={{ borderTop: 1, borderColor: 'divider', p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Mô tả chương
              </Typography>
              <TextareaAutosize
                value={localDescription}
                onChange={(e) => setLocalDescription(e.target.value)}
                placeholder='Nhập mô tả ngắn gọn về nội dung của chương...'
                style={{
                  width: '100%',
                  borderRadius: 8,
                  padding: 12,
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  minHeight: 80,
                }}
              />
            </Box>

            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Mục tiêu học tập
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {localObjectives.map((obj, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      value={obj}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      size='small'
                      sx={{ '& .MuiInputBase-root': { backgroundColor: 'background.default' } }}
                    />
                    <IconButton onClick={() => removeObjective(index)} size='small'>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant='outlined'
                  startIcon={<AddIcon />}
                  onClick={addObjective}
                  sx={{
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    color: 'text.secondary',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  Thêm yêu cầu
                </Button>
              </Box>
              <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
                Sau khi hoàn thành chương này, học viên có thể...
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 1 }}>
              <Button variant='outlined' onClick={() => setIsEditing((prev) => !prev)}>
                Hủy
              </Button>
              <Button variant='contained' onClick={handleSave}>
                Lưu chương
              </Button>
            </Box>
          </Box>
        </Box>
      </Collapse>

      {/* Unit List */}
      <Collapse in={isExpanded}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
          <SortableContext items={section.units.map((unit) => unit.id)} strategy={verticalListSortingStrategy}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, pt: 0 }}>
              {section.units.map((unit) => {
                if (unit.type === 'lesson') {
                  return (
                    <LessonItem
                      key={unit.id}
                      lesson={unit as Lesson}
                      section={section}
                      onAddStep={onAddStep}
                      onUpdateUnit={onUpdateUnit}
                      onUpdateStep={onUpdateStep}
                      onDeleteUnit={onDeleteUnit}
                      onDeleteStep={onDeleteStep}
                      onOpenContentEditor={onOpenContentEditor}
                      onReorderStep={onReorderStep}
                    />
                  );
                } else {
                  return (
                    <ExcerciseItem
                      key={unit.id}
                      excercise={unit}
                      section={section}
                      onDeleteUnit={onDeleteUnit}
                      onUpdateUnit={onUpdateUnit}
                    />
                  );
                }
              })}
            </Box>
          </SortableContext>
        </DndContext>
      </Collapse>
    </Paper>
  );
}
