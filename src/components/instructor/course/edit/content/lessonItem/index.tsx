'use client';

import { useState } from 'react';
import { Box, Paper, Typography, IconButton, Collapse, TextField, TextareaAutosize, Button } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import QuizIcon from '@mui/icons-material/Quiz';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Chapter, Lesson, LessonStep } from '../../types';
import ContentStep from '../contentStep';

interface LessonItemProps {
  lesson: Lesson;
  chapter: Chapter;
  onToggleLessonEdit: (chapterId: string, lessonId: string) => void;
  onUpdateLesson: (chapterId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteUnit: (chapterId: string, lessonId: string) => void;
  onOpenContentEditor: (lessonId: string) => void;
}

export default function LessonItem({
  lesson,
  chapter,
  onToggleLessonEdit,
  onUpdateLesson,
  onDeleteUnit,
  onOpenContentEditor,
}: LessonItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localTitle, setLocalTitle] = useState(lesson.title);
  const [localDescription, setLocalDescription] = useState(lesson.description);

  const handleSave = () => {
    onUpdateLesson(chapter.id, lesson.id, {
      title: localTitle,
      description: localDescription,
    });
    onToggleLessonEdit(chapter.id, lesson.id);
  };

  const handleAddStep = (title: string) => {
    const steps = lesson.steps;
    const lecture: LessonStep = {
      id: crypto.randomUUID(),
      title,
      order: Math.max(...steps.map((step) => step.order)) + 1,
      blocks: [],
    };
    onUpdateLesson(chapter.id, lesson.id, {
      steps: [...steps, lecture],
    });
  };

  const handleDeleteStep = (stepId: string) => {
    const steps = lesson.steps;
    const updatedSteps = steps.filter((step) => step.id !== stepId);

    onUpdateLesson(chapter.id, lesson.id, {
      steps: updatedSteps,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.paper',
      }}
    >
      {/* Lesson Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          cursor: 'pointer',
        }}
      >
        <IconButton size='small' onClick={() => setIsExpanded(!isExpanded)} sx={{ mr: 1 }}>
          {isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton>

        <Box sx={{ cursor: 'grab', mr: 2, display: 'flex', alignItems: 'center' }}>
          <DragIndicatorIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
        </Box>

        <MenuBookOutlined color='primary' />

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Bài {lesson.order}:
          </Typography>
          {lesson.isEditing ? (
            <TextField
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              variant='outlined'
              size='small'
              fullWidth
              sx={{ maxWidth: 300 }}
            />
          ) : (
            <Typography variant='body1' color='text.primary'>
              {lesson.title}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size='small' onClick={() => handleAddStep('Bài giảng không tiêu đề')} title='Thêm bước'>
            <AddIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={() => onToggleLessonEdit(chapter.id, lesson.id)} title='Chỉnh sửa bài học'>
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={() => onDeleteUnit(chapter.id, lesson.id)} title='Xóa bài học'>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>

      {/* <Collapse in={isAddingStep}>
        <Box display='flex' gap={1} sx={{ borderTop: 1, borderColor: 'divider', p: 3 }}>
          <IconButton onClick={() => setIsAddingStep(false)}>
            <CloseIcon />
          </IconButton>
          <Button variant='contained' onClick={() => handleAddStep('lecture', 'Bài giảng không tiêu đề')}>
            Bài giảng
          </Button>
          <Button variant='contained' onClick={() => handleAddStep('quiz', 'Bài tập không tiêu đề')} color='warning'>
            Bài tập
          </Button>
        </Box>
      </Collapse> */}

      {/* Lesson Edit Form */}
      <Collapse in={lesson.isEditing}>
        <Box sx={{ borderTop: 1, borderColor: 'divider', p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant='subtitle2' gutterBottom>
                Mô tả bài học
              </Typography>
              <TextareaAutosize
                value={localDescription}
                onChange={(e) => setLocalDescription(e.target.value)}
                placeholder='Nhập mô tả ngắn gọn về nội dung của bài học...'
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
                Tài nguyên đính kèm
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  border: 2,
                  borderStyle: 'dashed',
                  borderColor: 'divider',
                  bgcolor: 'customBackground.5',
                  p: 4,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <UploadFileIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
                  <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
                    Kéo và thả file vào đây, hoặc{' '}
                    <Button variant='text' size='small'>
                      chọn file
                    </Button>
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Hỗ trợ PDF, DOCX, ZIP (tối đa 25MB)
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 1 }}>
              <Button variant='outlined' onClick={() => onToggleLessonEdit(chapter.id, lesson.id)}>
                Hủy
              </Button>
              <Button variant='contained' onClick={handleSave}>
                Lưu bài học
              </Button>
            </Box>
          </Box>
        </Box>
      </Collapse>

      {/* Steps List */}
      <Collapse in={isExpanded}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, pt: 0 }}>
          {lesson.steps.map((step) => (
            <ContentStep key={step.id} step={step} onEditContent={onOpenContentEditor} onDelete={handleDeleteStep} />
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
}
