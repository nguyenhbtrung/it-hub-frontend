'use client';

import { Box, Typography, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import QuizIcon from '@mui/icons-material/QuizOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { LessonStep } from '../../types';
import { useParams, useRouter } from 'next/navigation';

interface ContentStepProps {
  step: LessonStep;
  onEditContent: (stepId: string) => void;
  onDelete: (stepId: string) => void;
}

export default function ContentStep({ step, onEditContent, onDelete }: ContentStepProps) {
  const router = useRouter();
  const params = useParams();
  const handleEditClick = (stepId: string) => {
    router.push(`/instructor/courses/${params.id}/edit/content/steps/${stepId}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
        // bgcolor: getStepColor(),
        bgcolor: 'customBackground.5',
        py: 1.5,
        pl: 2,
        pr: 1,
      }}
    >
      <Box sx={{ cursor: 'grab', mr: 1 }}>
        <DragIndicatorIcon sx={{ color: 'text.disabled' }} />
      </Box>

      {<DescriptionIcon color='primary' />}

      <Typography variant='body2' color='text.secondary' sx={{ ml: 1, flex: 1 }}>
        {step.title}
      </Typography>

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton size='small' onClick={() => handleEditClick(step.id)} title='Chỉnh sửa nội dung'>
          <EditNoteIcon fontSize='small' />
        </IconButton>

        <IconButton size='small' title='Xóa bước' onClick={() => onDelete(step.id)}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  );
}
