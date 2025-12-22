import { contentTypeLabelsMap } from '@/lib/const/post';
import ChatBubble from '@mui/icons-material/ChatBubble';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { NormalPost } from '@/types/forum';
import { useState } from 'react';
import { getContentTypeColor } from '@/lib/utils/postBadged';

interface PostCardProps {
  post: NormalPost;
}

export default function PostCard({ post }: PostCardProps) {
  const [savedPosts, setSavedPosts] = useState<number[]>([3]);

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
  };

  return (
    <Card
      key={post.id}
      sx={{
        p: 0,
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      <Stack direction='row'>
        {/* Vote section */}
        <Box
          sx={{
            p: 2,
            pr: 1,
            width: 64,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: 'action.hover',
            borderRight: 1,
            borderColor: 'divider',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        >
          <IconButton
            size='small'
            sx={{
              color: post.votes > 150 ? 'primary.main' : 'action.active',
              bgcolor: post.votes > 150 ? 'hero.main' : 'transparent',
              borderRadius: 1,
            }}
          >
            <ArrowDropUp sx={{ fontSize: 32 }} />
          </IconButton>
          <Typography variant='h6' fontWeight='bold' color={post.votes > 150 ? 'primary.main' : 'text.primary'}>
            {post.votes}
          </Typography>
          <IconButton size='small' sx={{ color: 'action.active', borderRadius: 1 }}>
            <ArrowDropDown sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>

        {/* Content section */}
        <Box sx={{ p: 3, flex: 1 }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' mb={1}>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Chip
                label={contentTypeLabelsMap[post.type]}
                size='small'
                sx={{
                  border: 1,
                  borderRadius: 0.5,
                  ...getContentTypeColor(post.type),
                }}
              />
              <Typography variant='caption' color='text.secondary'>
                •
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {post.time}
              </Typography>
            </Stack>
          </Stack>

          <Typography variant='h6' fontWeight='bold' gutterBottom sx={{ cursor: 'pointer' }}>
            {post.title}
          </Typography>

          <Typography variant='body2' color='text.secondary' paragraph>
            {post.content}
          </Typography>

          <Stack direction='row' spacing={1} mb={2}>
            {post.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size='small'
                sx={{
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' },
                }}
              />
            ))}
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' spacing={3}>
              <Button
                startIcon={<ChatBubble />}
                size='small'
                sx={{
                  color: 'text.secondary',
                  p: 0,
                  height: 25,
                  '&:hover': {
                    boxShadow: 'none',
                    bgcolor: 'transparent',
                    color: 'text.primary',
                  },
                }}
              >
                {post.comments} bình luận
              </Button>
              <Button
                startIcon={<Visibility />}
                size='small'
                sx={{
                  color: 'text.secondary',
                  p: 0,
                  height: 25,
                  '&:hover': {
                    boxShadow: 'none',
                    bgcolor: 'transparent',
                    color: 'text.primary',
                  },
                }}
              >
                {post.views} xem
              </Button>
            </Stack>

            <Stack direction='row' spacing={3}>
              <Button
                startIcon={<Edit />}
                size='small'
                sx={{
                  color: 'text.secondary',
                  p: 0,
                  height: 25,
                  '&:hover': {
                    boxShadow: 'none',
                    bgcolor: 'transparent',
                    color: 'text.primary',
                  },
                }}
              >
                Sửa
              </Button>
              <Button
                startIcon={<Delete />}
                size='small'
                sx={{
                  color: 'text.secondary',
                  p: 0,
                  height: 25,
                  '&:hover': {
                    boxShadow: 'none',
                    bgcolor: 'transparent',
                    color: 'text.primary',
                  },
                }}
              >
                Xoá
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
