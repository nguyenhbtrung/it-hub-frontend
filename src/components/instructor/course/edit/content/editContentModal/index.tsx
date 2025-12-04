'use client';

import { Modal, Box, Typography, IconButton, Button, Paper, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TitleIcon from '@mui/icons-material/Title';
import ImageIcon from '@mui/icons-material/Image';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import QuizIcon from '@mui/icons-material/Quiz';
import CodeIcon from '@mui/icons-material/Code';
import ContentBlockEditor from '../contentBlockEditor';
import { useState } from 'react';
import { Chapter, ContentBlockType } from '../../types';

interface EditContentModalProps {
  open: boolean;
  onClose: () => void;
  lessonId: string | null;
  chapters: Chapter[];
}

const contentBlocks = [
  { type: 'text' as ContentBlockType, icon: <TitleIcon />, label: 'Văn bản' },
  { type: 'image' as ContentBlockType, icon: <ImageIcon />, label: 'Hình ảnh' },
  { type: 'video' as ContentBlockType, icon: <SmartDisplayIcon />, label: 'Video' },
  { type: 'quiz' as ContentBlockType, icon: <QuizIcon />, label: 'Quiz' },
  { type: 'markdown' as ContentBlockType, icon: <CodeIcon />, label: 'Markdown' },
  { type: 'code' as ContentBlockType, icon: <CodeIcon />, label: 'Mã nguồn' },
];

export default function EditContentModal({ open, onClose, lessonId, chapters }: EditContentModalProps) {
  const lesson = chapters.flatMap((chapter) => chapter.lessons).find((lesson) => lesson.id === lessonId);

  const [blocks, setBlocks] = useState(lesson?.steps.find((s) => s.type === 'lecture')?.blocks || []);

  const addBlock = (type: ContentBlockType) => {
    const newBlock = {
      id: crypto.randomUUID(),
      type,
      title: `Khối ${type}`,
      content: '',
      order: blocks.length + 1,
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (blockId: string, updates: Partial<any>) => {
    setBlocks(blocks.map((block) => (block.id === blockId ? { ...block, ...updates } : block)));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 1200,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant='h6' fontWeight='semibold'>
            Chỉnh sửa nội dung bài giảng: {lesson?.title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Panel - Content Blocks */}
          <Box sx={{ width: '70%', p: 4, overflowY: 'auto', borderRight: 1, borderColor: 'divider' }}>
            {blocks.map((block) => (
              <ContentBlockEditor
                key={block.id}
                block={block}
                onUpdate={(updates) => updateBlock(block.id, updates)}
                onDelete={() => deleteBlock(block.id)}
              />
            ))}
          </Box>

          {/* Right Panel - Add New Blocks */}
          <Box sx={{ width: '30%', p: 4 }}>
            <Typography variant='subtitle1' fontWeight='semibold' gutterBottom>
              Thêm khối nội dung
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {contentBlocks.map((block) => (
                <Grid size={{ xs: 6 }} key={block.type}>
                  <Button
                    fullWidth
                    variant='outlined'
                    onClick={() => addBlock(block.type)}
                    sx={{
                      height: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'primary.light',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {block.icon}
                    <Typography variant='caption' fontWeight='medium'>
                      {block.label}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            p: 3,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Button variant='outlined' onClick={onClose}>
            Hủy
          </Button>
          <Button variant='contained'>Lưu nội dung</Button>
        </Box>
      </Box>
    </Modal>
  );
}
