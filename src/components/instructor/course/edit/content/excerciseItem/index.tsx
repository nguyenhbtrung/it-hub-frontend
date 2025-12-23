'use client';

import { useState } from 'react';
import { Box, Paper, Typography, IconButton, Collapse, TextField, TextareaAutosize, Button } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import QuizIcon from '@mui/icons-material/QuizOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Chapter, Lesson, LessonStep, Unit } from '../../types';
import ContentStep from '../contentStep';

interface LessonItemProps {
  excercise: Unit;
  chapter: Chapter;
  onDeleteUnit: (chapterId: string, lessonId: string) => void;
}

export default function ExcerciseItem({ excercise, chapter, onDeleteUnit }: LessonItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localTitle, setLocalTitle] = useState(excercise.title);

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

        <Box sx={{ cursor: 'grab', mr: 2, display: 'flex', alignItems: 'center' }}>
          <DragIndicatorIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
        </Box>

        {getExcerciseIcon()}

        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Bài tập:
          </Typography>
          {excercise.isEditing ? (
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
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size='small' onClick={() => {}} title='Chỉnh sửa bài học'>
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={() => onDeleteUnit(chapter.id, excercise.id)} title='Xóa bài học'>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
