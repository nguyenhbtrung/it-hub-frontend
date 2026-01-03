'use client';

import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LessonStep } from '../../types';
import { useParams, useRouter } from 'next/navigation';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

interface ContentStepProps {
  step: LessonStep;
  onEditContent: (stepId: string) => void;
  onUpdateStep: (stepId: string, updates: Partial<LessonStep>) => void;
  onDelete: (stepId: string) => void;
}

export default function ContentStep({ step, onUpdateStep, onDelete }: ContentStepProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [localTitle, setLocalTitle] = useState(step.title);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const params = useParams();

  const handleSave = () => {
    onUpdateStep(step.id, {
      title: localTitle,
    });
    setIsEditing(false);
  };

  const handleEditContentClick = (stepId: string) => {
    router.push(`/instructor/courses/${params.id}/edit/content/steps/${stepId}`);
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
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
      <Box {...listeners} sx={{ cursor: 'grab', mr: 1 }}>
        <DragIndicatorIcon sx={{ color: 'text.disabled' }} />
      </Box>

      {<DescriptionIcon color='primary' />}

      {/* <Typography variant='body2' color='text.secondary' sx={{ ml: 1, flex: 1 }}>
        {step.title}
      </Typography> */}
      {isEditing ? (
        <TextField
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          variant='outlined'
          size='small'
          fullWidth
          sx={{ maxWidth: 300, ml: 1 }}
        />
      ) : (
        <Typography variant='body2' color='text.secondary' sx={{ ml: 1, flex: 1 }}>
          {step.title}
        </Typography>
      )}
      {isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, ml: 2, flex: 1 }}>
          <Button variant='outlined' onClick={() => setIsEditing(false)}>
            Hủy
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Lưu bài học
          </Button>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <IconButton size='small' onClick={() => handleEditContentClick(step.id)} title='Chỉnh sửa nội dung'>
          <EditNoteIcon fontSize='small' />
        </IconButton>

        <IconButton size='small' onClick={() => setIsEditing((prev) => !prev)} title='Chỉnh sửa tiêu đề'>
          <EditIcon fontSize='small' />
        </IconButton>

        <IconButton size='small' title='Xóa bước' onClick={() => onDelete(step.id)}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  );
}
