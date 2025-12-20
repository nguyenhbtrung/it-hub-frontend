'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from '@mui/material';
import {
  Help as HelpIcon,
  School as SchoolIcon,
  Forum as ForumIcon,
  WorkHistory as WorkHistoryIcon,
  Article as ArticleIcon,
  FolderOpen as FolderOpenIcon,
  Campaign as CampaignIcon,
  Label as LabelIcon,
  Close as CloseIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import PostEditor from '@/components/common/richText/editor/postEditor';

const postTypes = [
  { value: 'question', label: 'Câu hỏi', icon: <HelpIcon /> },
  { value: 'knowledge', label: 'Chia sẻ kiến thức', icon: <SchoolIcon /> },
  { value: 'discussion', label: 'Thảo luận', icon: <ForumIcon /> },
  { value: 'experience', label: 'Kinh nghiệm thực tế', icon: <WorkHistoryIcon /> },
  { value: 'news', label: 'Tin tức', icon: <ArticleIcon /> },
  { value: 'resource', label: 'Tài nguyên', icon: <FolderOpenIcon /> },
  { value: 'announcement', label: 'Thông báo', icon: <CampaignIcon /> },
];

const initialTags = ['#JavaSpring', '#Backend'];

export default function EditPostForm() {
  const theme = useTheme();
  const [postType, setPostType] = useState('question');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState('');

  const handlePostTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType !== null) {
      setPostType(newType);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    // Xử lý submit form
    console.log({
      postType,
      title,
      tags,
    });
  };

  return (
    <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Loại nội dung */}
      <Card
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <CardContent>
          <Typography
            variant='caption'
            sx={{
              display: 'block',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: 'text.secondary',
              mb: 2,
            }}
          >
            Chọn loại nội dung
          </Typography>

          <ToggleButtonGroup
            value={postType}
            exclusive
            onChange={handlePostTypeChange}
            aria-label='post type'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              '& .MuiToggleButtonGroup-grouped': {
                border: 1,
                '&:not(:first-of-type)': {
                  borderRadius: 1,
                  borderLeft: 1,
                  borderColor: 'divider',
                  ml: 0,
                },
                '&:first-of-type': {
                  borderRadius: 1,
                },
              },
            }}
          >
            {postTypes.map((type) => (
              <ToggleButton
                key={type.value}
                value={type.value}
                sx={{
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  borderColor: 'divider',
                  color: postType === type.value ? 'primary.contrastText' : 'text.secondary',
                  bgcolor: postType === type.value ? 'primary.main' : 'transparent',
                  '&:hover': {
                    bgcolor: postType === type.value ? 'primary.dark' : 'action.hover',
                  },
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                }}
              >
                <Stack direction='row' alignItems='center' spacing={1}>
                  {type.icon}
                  <Typography variant='body2' fontWeight='medium'>
                    {type.label}
                  </Typography>
                </Stack>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </CardContent>
      </Card>

      {/* Editor */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          // minHeight: 650,
          overflow: 'hidden',
        }}
      >
        {/* Tiêu đề */}
        <Box sx={{ p: 3, pb: 1 }}>
          <TextField
            fullWidth
            placeholder='Tiêu đề bài viết của bạn...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant='standard'
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: { xs: '1.5rem', md: '1.875rem' },
                fontWeight: 'bold',
                color: 'text.primary',
                '&::placeholder': {
                  color: 'text.disabled',
                },
              },
            }}
          />
        </Box>

        {/* Tags */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'action.hover',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
            <Stack direction='row' alignItems='center' spacing={0.5}>
              <LabelIcon fontSize='small' sx={{ color: 'text.secondary' }} />
              <Typography variant='body2' color='text.secondary' fontWeight='medium'>
                Tags (tối đa 5):
              </Typography>
            </Stack>

            <Stack direction='row' alignItems='center' spacing={1} flexWrap='wrap' flex={1}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    '& .MuiChip-deleteIcon': {
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'error.main',
                        bgcolor: 'error.lighter',
                      },
                    },
                  }}
                />
              ))}

              <TextField
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder='Thêm thẻ...'
                variant='standard'
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    minWidth: 120,
                    '&::placeholder': {
                      color: 'text.disabled',
                    },
                  },
                }}
                sx={{ flex: 1 }}
              />
            </Stack>
          </Stack>
        </Box>

        <PostEditor />
      </Paper>

      {/* Nút submit */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 2, pb: 4 }}>
        <Button
          variant='contained'
          size='large'
          startIcon={<SendIcon />}
          onClick={handleSubmit}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            boxShadow: 3,
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Đăng bài ngay
        </Button>
      </Box>
    </Box>
  );
}
