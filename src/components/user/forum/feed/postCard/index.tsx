import { contentTypeLabelsMap } from '@/lib/const/post';
import { roleLabelsMap } from '@/lib/const/user';
import ChatBubble from '@mui/icons-material/ChatBubble';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import Bookmark from '@mui/icons-material/Bookmark';
import { NormalPost } from '../../types';
import { useState } from 'react';
import Verified from '@mui/icons-material/Verified';
import Diamond from '@mui/icons-material/Diamond';
import MilitaryTech from '@mui/icons-material/MilitaryTech';

interface PostCardProps {
  post: NormalPost;
}

export default function PostCard({ post }: PostCardProps) {
  const [savedPosts, setSavedPosts] = useState<number[]>([3]);

  const toggleSave = (postId: number) => {
    setSavedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
  };

  const getReputationIcon = (level: string) => {
    switch (level) {
      case 'verified':
        return <Verified sx={{ fontSize: 12, color: 'badged.lightBlue.text' }} />;
      case 'diamond':
        return <Diamond sx={{ fontSize: 12, color: 'badged.purple.text' }} />;
      case 'military':
        return <MilitaryTech sx={{ fontSize: 12, color: 'badged.yellow2.text' }} />;
      default:
        return <Verified sx={{ fontSize: 12 }} />;
    }
  };

  const getReputationColor = (level: string) => {
    switch (level) {
      case 'verified':
        return { bgcolor: 'badged.lightBlue.bg', color: 'badged.lightBlue.text', borderColor: 'badged.lightBlue.text' };
      case 'diamond':
        return { bgcolor: 'badged.purple.bg', color: 'badged.purple.text', borderColor: 'badged.purple.text' };
      case 'military':
        return { bgcolor: 'badged.yellow2.bg', color: 'badged.yellow2.text', borderColor: 'badged.yellow2.text' };
      default:
        return {};
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'instructor':
        return { bgcolor: 'badged.yellow.bg', color: 'badged.yellow.text' };
      case 'student':
        return { bgcolor: 'badged.blue.bg', color: 'badged.blue.text' };
      case 'admin':
        return { bgcolor: 'error.light', color: 'error.main' };
      default:
        return {};
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'question':
        return { bgcolor: 'badged.red.bg', color: 'badged.red.text' };
      case 'knowledge':
        return { bgcolor: 'badged.blue.bg', color: 'badged.blue.text' };
      case 'discussion':
        return { bgcolor: 'badged.purple.bg', color: 'badged.purple.text' };
      case 'experience':
        return { bgcolor: 'badged.yellow2.bg', color: 'badged.yellow2.text' };
      case 'news':
        return { bgcolor: 'badged.lightBlue.bg', color: 'badged.lightBlue.text' };
      case 'resource':
        return { bgcolor: 'badged.green.bg', color: 'badged.green.text' };
      case 'announcement':
        return { bgcolor: 'badged.yellow.bg', color: 'badged.yellow.text' };
      default:
        return { bgcolor: '#e5e7eb', color: '#374151' }; // fallback: xám trung tính
    }
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
              <Avatar src={post.author.avatar} sx={{ width: 24, height: 24 }} />
              <Typography variant='body2' fontWeight='bold'>
                {post.author.name}
              </Typography>

              {post.author.reputation && (
                <Chip
                  icon={<Box>{getReputationIcon(post.author.reputationLevel)}</Box>}
                  label={post.author.reputation}
                  size='small'
                  sx={{
                    height: 20,
                    // border: 1,
                    borderRadius: 0.5,
                    ...getReputationColor(post.author.reputationLevel),
                  }}
                />
              )}

              <Chip
                label={roleLabelsMap[post.author.role]}
                size='small'
                sx={{
                  height: 20,
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  borderRadius: 0.5,
                  ...getRoleColor(post.author.role),
                }}
              />

              <Typography variant='caption' color='text.secondary'>
                •
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {post.time}
              </Typography>
            </Stack>

            <Chip
              label={contentTypeLabelsMap[post.type]}
              size='small'
              sx={{
                border: 1,
                borderRadius: 0.5,
                ...getContentTypeColor(post.type),
              }}
            />
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

            <IconButton
              onClick={() => toggleSave(post.id)}
              sx={{
                height: 25,
                width: 25,
                '&:hover': {
                  boxShadow: 'none',
                  bgcolor: 'transparent',
                  color: 'primary.main',
                },
              }}
            >
              {savedPosts.includes(post.id) ? <Bookmark sx={{ color: 'primary.main' }} /> : <BookmarkBorder />}
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
