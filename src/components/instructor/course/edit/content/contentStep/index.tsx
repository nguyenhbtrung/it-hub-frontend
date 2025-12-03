'use client';

import { Box, Typography, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DescriptionIcon from '@mui/icons-material/Description';
import QuizIcon from '@mui/icons-material/Quiz';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { LessonStep } from '../../types';

interface ContentStepProps {
  step: LessonStep;
  onEditContent: () => void;
}

export default function ContentStep({ step, onEditContent }: ContentStepProps) {
  const getStepIcon = () => {
    switch (step.type) {
      case 'lecture':
        return <DescriptionIcon color='primary' />;
      case 'quiz':
        return <QuizIcon sx={{ color: '#ed6c02' }} />;
      default:
        return <DescriptionIcon />;
    }
  };

  const getStepColor = () => {
    switch (step.type) {
      case 'lecture':
        return 'primary.light';
      case 'quiz':
        return 'warning.light';
      default:
        return 'grey.100';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
        bgcolor: getStepColor(),
        py: 1.5,
        pl: 2,
        pr: 1,
      }}
    >
      <Box sx={{ cursor: 'grab', mr: 1 }}>
        <DragIndicatorIcon sx={{ color: 'text.disabled' }} />
      </Box>

      {getStepIcon()}

      <Typography variant='body2' color='text.secondary' sx={{ ml: 1, flex: 1 }}>
        {step.title}
      </Typography>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {step.type === 'lecture' ? (
          <IconButton size='small' onClick={onEditContent} title='Chỉnh sửa nội dung'>
            <EditNoteIcon fontSize='small' />
          </IconButton>
        ) : (
          <IconButton size='small' title='Thiết lập bài tập'>
            <SettingsIcon fontSize='small' />
          </IconButton>
        )}
        <IconButton size='small' title='Xóa bước'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  );
}
