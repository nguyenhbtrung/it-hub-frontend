'use client';

import { useState } from 'react';
import { Box, Paper, Typography, IconButton, Collapse, TextField, TextareaAutosize, Button } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import QuizIcon from '@mui/icons-material/QuizOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { Section, Lesson, Unit } from '../../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useParams, useRouter } from 'next/navigation';

interface LessonItemProps {
  excercise: Unit;
  section: Section;
  onUpdateUnit: (sectionId: string, lessonId: string, updates: Partial<Lesson>) => void;
  onDeleteUnit: (chapterId: string, lessonId: string) => void;
}

export default function ExcerciseItem({ excercise, section, onDeleteUnit, onUpdateUnit }: LessonItemProps) {
  const [localTitle, setLocalTitle] = useState(excercise.title);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const params = useParams();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: excercise.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdateUnit(section.id, excercise.id, {
      title: localTitle,
    });
    setIsEditing(false);
  };

  const handleEditContentClick = (unitId: string) => {
    router.push(`/instructor/courses/${params.id}/edit/content/exercises/${unitId}`);
  };

  const getExcerciseIcon = () => {
    const color = '#ed6c02';
    switch (excercise.excercise?.type) {
      case 'assigment':
        return <AssignmentOutlinedIcon sx={{ color }} />;
      case 'project':
        return <BuildOutlinedIcon sx={{ color }} />;
      case 'coding':
        return <CodeOutlinedIcon sx={{ color }} />;
      case 'quiz':
        return <QuizIcon sx={{ color }} />;
      default:
        return <AssignmentOutlinedIcon sx={{ color }} />;
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
        {/* <IconButton size='small' onClick={() => setIsExpanded(!isExpanded)} sx={{ mr: 1 }}>
          {isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton> */}
        <Box width={30} height={30} pr={5} />

        <Box {...listeners} sx={{ cursor: 'grab', mr: 2, display: 'flex', alignItems: 'center' }}>
          <DragIndicatorIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
        </Box>

        {getExcerciseIcon()}

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Bài tập:
          </Typography>
          {isEditing ? (
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
              {excercise.title}
            </Typography>
          )}
          {isEditing && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant='outlined' onClick={() => setIsEditing(false)}>
                Hủy
              </Button>
              <Button variant='contained' onClick={handleSave}>
                Lưu bài học
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size='small' onClick={() => handleEditContentClick(excercise.id)} title='Chỉnh sửa nội dung'>
            <EditNoteIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={() => setIsEditing((prev) => !prev)} title='Chỉnh sửa bài học'>
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={() => onDeleteUnit(section.id, excercise.id)} title='Xóa bài học'>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
