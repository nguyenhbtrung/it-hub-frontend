'use client';

import { useState } from 'react';
import { Box, Paper, Typography, IconButton, Collapse, TextField, TextareaAutosize, Button } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LessonItem from '../lessonItem';
import CloseIcon from '@mui/icons-material/Close';
import { Chapter, Lesson } from '../../types';
import ExcerciseItem from '../excerciseItem';

interface ChapterItemProps {
  chapter: Chapter;
  onToggleChapter: (chapterId: string) => void;
  onToggleChapterEdit: (chapterId: string) => void;
  onToggleLessonEdit: (chapterId: string, lessonId: string) => void;
  onUpdateChapter: (chapterId: string, updates: Partial<Chapter>) => void;
  onUpdateLesson: (chapterId: string, lessonId: string, updates: Partial<Chapter>) => void;
  onAddLesson: (chapterId: string) => void;
  onAddExcercise: (chapterId: string) => void;
  onDeleteChapter: (chapterId: string) => void;
  onDeleteUnit: (chapterId: string, lessonId: string) => void;
  onOpenContentEditor: (lessonId: string) => void;
}

export default function ChapterItem({
  chapter,
  onToggleChapter,
  onToggleChapterEdit,
  onToggleLessonEdit,
  onUpdateChapter,
  onUpdateLesson,
  onAddLesson,
  onAddExcercise,
  onDeleteChapter,
  onDeleteUnit,
  onOpenContentEditor,
}: ChapterItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [localTitle, setLocalTitle] = useState(chapter.title);
  const [localDescription, setLocalDescription] = useState(chapter.description);
  const [localObjectives, setLocalObjectives] = useState(chapter.objectives);
  const [isAddingUnit, setIsAddingUnit] = useState(false);

  const handleSave = () => {
    onUpdateChapter(chapter.id, {
      title: localTitle,
      description: localDescription,
      objectives: localObjectives,
    });
    onToggleChapterEdit(chapter.id);
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
        <IconButton size='small' onClick={() => onToggleChapter(chapter.id)} sx={{ mr: 1 }}>
          {chapter.isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton>

        <Box {...listeners} sx={{ cursor: 'grab', mr: 2, display: 'flex', alignItems: 'center' }}>
          <DragIndicatorIcon sx={{ color: 'text.disabled' }} />
        </Box>

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='body2' fontWeight='bold' color='text.secondary'>
            Chương {chapter.order}
          </Typography>
          {chapter.isEditing ? (
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
              {chapter.title}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size='small' onClick={() => setIsAddingUnit((prev) => !prev)} title='Thêm đơn vị học tập'>
            <AddIcon />
          </IconButton>
          <IconButton size='small' onClick={() => onToggleChapterEdit(chapter.id)} title='Chỉnh sửa chương'>
            <EditIcon />
          </IconButton>
          <IconButton size='small' onClick={() => onDeleteChapter(chapter.id)} title='Xóa chương'>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={isAddingUnit}>
        <Box display='flex' gap={1} sx={{ borderTop: 1, borderColor: 'divider', p: 3 }}>
          <IconButton onClick={() => setIsAddingUnit(false)}>
            <CloseIcon />
          </IconButton>
          <Button variant='contained' onClick={() => onAddLesson(chapter.id)}>
            Bài giảng
          </Button>
          <Button variant='contained' onClick={() => onAddExcercise(chapter.id)} color='warning'>
            Bài tập
          </Button>
        </Box>
      </Collapse>

      {/* Chapter Edit Form */}
      <Collapse in={chapter.isEditing}>
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
              <TextareaAutosize
                value={localObjectives}
                onChange={(e) => setLocalObjectives(e.target.value)}
                placeholder='Nhập các mục tiêu học tập, mỗi mục tiêu trên một dòng...'
                style={{
                  width: '100%',
                  borderRadius: 8,
                  padding: 12,
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  minHeight: 100,
                }}
              />
              <Typography variant='caption' color='text.secondary' sx={{ mt: 1, display: 'block' }}>
                Sau khi hoàn thành chương này, học viên có thể...
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 1 }}>
              <Button variant='outlined' onClick={() => onToggleChapterEdit(chapter.id)}>
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
      <Collapse in={chapter.isExpanded}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, pt: 0 }}>
          {chapter.units.map((unit) => {
            if (unit.type === 'lesson') {
              return (
                <LessonItem
                  key={unit.id}
                  lesson={unit as Lesson}
                  chapter={chapter}
                  onToggleLessonEdit={onToggleLessonEdit}
                  onUpdateLesson={onUpdateLesson}
                  onDeleteUnit={onDeleteUnit}
                  onOpenContentEditor={onOpenContentEditor}
                />
              );
            } else {
              return <ExcerciseItem key={unit.id} excercise={unit} chapter={chapter} onDeleteUnit={onDeleteUnit} />;
            }
          })}
        </Box>
      </Collapse>
    </Paper>
  );
}
