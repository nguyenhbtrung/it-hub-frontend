'use client';

import { useState } from 'react';
import { Box, Typography, TextField, IconButton, Paper } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ContentBlock } from '../../types';

interface ContentBlockEditorProps {
  block: ContentBlock;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onDelete: () => void;
}

export default function ContentBlockEditor({ block, onUpdate, onDelete }: ContentBlockEditorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);

  const getBlockLabel = () => {
    switch (block.type) {
      case 'text':
        return 'Khối văn bản';
      case 'image':
        return 'Khối hình ảnh';
      case 'video':
        return 'Khối video';
      case 'quiz':
        return 'Khối quiz';
      default:
        return 'Khối nội dung';
    }
  };

  const handleSave = () => {
    onUpdate({ content });
    setIsEditing(false);
  };

  return (
    <Paper
      elevation={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        border: 1,
        borderColor: isHovered ? 'primary.main' : 'divider',
        borderRadius: 2,
        p: 2,
        mb: 2,
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
    >
      {isHovered && (
        <Box
          sx={{
            position: 'absolute',
            left: -12,
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'grab',
          }}
        >
          <DragIndicatorIcon sx={{ color: 'text.disabled' }} />
        </Box>
      )}

      <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
        {getBlockLabel()}
      </Typography>

      {block.type === 'text' ? (
        isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant='outlined'
            size='small'
          />
        ) : (
          <Typography variant='body2' color='text.primary'>
            {content || 'Đây là nơi để soạn thảo nội dung văn bản cho bài giảng...'}
          </Typography>
        )
      ) : block.type === 'image' ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            border: 2,
            borderStyle: 'dashed',
            borderColor: 'divider',
            bgcolor: 'action.hover',
            p: 3,
          }}
        >
          {content ? (
            <Box
              component='img'
              src={content}
              alt='Hình ảnh'
              sx={{ maxWidth: '100%', maxHeight: 200, borderRadius: 1 }}
            />
          ) : (
            <UploadFileIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
          )}
        </Box>
      ) : null}

      {isHovered && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: 8,
            display: 'flex',
            gap: 0.5,
            bgcolor: 'background.paper',
            borderRadius: 20,
            border: 1,
            borderColor: 'divider',
            p: 0.5,
            boxShadow: 1,
          }}
        >
          <IconButton
            size='small'
            onClick={() => {
              if (block.type === 'text') {
                setIsEditing(!isEditing);
                if (isEditing) handleSave();
              }
            }}
          >
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton size='small' onClick={onDelete}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
}
