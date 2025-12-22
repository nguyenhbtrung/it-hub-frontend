'use client';

import { Box, Typography, Link, Stack, Avatar, Chip, IconButton } from '@mui/material';
import {
  Feed as FeedIcon,
  Recommend as RecommendIcon,
  ArrowUpward as ArrowUpwardIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

interface RelatedPostsProps {
  type: 'author' | 'related';
}

const authorPosts = [
  {
    id: 1,
    title: 'Lộ trình học Spring Boot từ cơ bản đến nâng cao trong 3 tháng',
    author: {
      name: 'Nguyễn Văn A',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCsLwgES4ifj0XawAzyqd-rDfFcm8NhUMKO2CVQJdUKLehJ9-5z5nMyudiFbjqMrXoFlL6oita9JRcWvlF1t857-nlX603J0gBTmq2yQtoLScAljXJ_b_n5zrGsiUOtw8MvKpTzgiNWHEruMuP6A1Jpugq4L1lx1ri1xCPFcrKRdiL1ojimLwxw4JT4QPog3npTYiMGw3_mkbsQiKt9hMsgba03HwedhF1T1C4XsXNQnrfhdX-GzPy93GZVH5SIow67ksR8hHNy0vw',
    },
    votes: 342,
    comments: 56,
  },
  {
    id: 2,
    title: 'Cách cấu hình Security trong Microservices với JWT và OAuth2',
    author: {
      name: 'Nguyễn Văn A',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCsLwgES4ifj0XawAzyqd-rDfFcm8NhUMKO2CVQJdUKLehJ9-5z5nMyudiFbjqMrXoFlL6oita9JRcWvlF1t857-nlX603J0gBTmq2yQtoLScAljXJ_b_n5zrGsiUOtw8MvKpTzgiNWHEruMuP6A1Jpugq4L1lx1ri1xCPFcrKRdiL1ojimLwxw4JT4QPog3npTYiMGw3_mkbsQiKt9hMsgba03HwedhF1T1C4XsXNQnrfhdX-GzPy93GZVH5SIow67ksR8hHNy0vw',
    },
    votes: 189,
    comments: 23,
  },
  {
    id: 3,
    title: 'Review sách Clean Code - Những bài học đắt giá cho lập trình viên',
    author: {
      name: 'Nguyễn Văn A',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCsLwgES4ifj0XawAzyqd-rDfFcm8NhUMKO2CVQJdUKLehJ9-5z5nMyudiFbjqMrXoFlL6oita9JRcWvlF1t857-nlX603J0gBTmq2yQtoLScAljXJ_b_n5zrGsiUOtw8MvKpTzgiNWHEruMuP6A1Jpugq4L1lx1ri1xCPFcrKRdiL1ojimLwxw4JT4QPog3npTYiMGw3_mkbsQiKt9hMsgba03HwedhF1T1C4XsXNQnrfhdX-GzPy93GZVH5SIow67ksR8hHNy0vw',
    },
    votes: 512,
    comments: 98,
  },
];

const relatedPosts = [
  {
    id: 1,
    title: 'So sánh hiệu năng giữa JPA và Hibernate Native Query',
    author: {
      name: 'Trần Minh',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB7kN1EYTfmpNq9rXZRU8krYQEG0t0VAQlqPHhQe2t0HJu7OredD2FOlrPMsB99ZTbk0Sh-VfQ5bWgngKmAIL_4U-850YxdcXFtgXLwUlvfuCJaXWm3aJuTQ3QkUXnP48i0cM_rufkWERuQ9OcBmzzMtWCcIN2agZYvq-fkQYHTD1WwZdalUikaQxEXzMOLoSuEPxUmYUNQa9vhbhlfsn-r0baMiW8YlWKO2xH6orlWiiwi5kgL3HbcnBPlzmUzRvwGPEorx9zgnSw',
    },
    votes: 89,
    comments: 45,
  },
  {
    id: 2,
    title: 'Hướng dẫn Indexing trong MySQL: B-Tree vs Hash Index',
    author: {
      name: 'Lê Hoàng',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC80ucLoQ6nf4gVeAYUSXevClm6wwb-0xaio927Sfm_-sUK28V_DTOzJ7Ep8khh0qR5C8C62uy1M3nLguT0_fr8irzfegW9wSmnurfP0WfiITzjiJyar1JPNwcPGDxSRb6ln9zHyred8EBG16c0DxklDhyC25HI53XJsS39PnkDOpWKYb2xKp4dpEh5hN1sowF9wSBki9kFpiQXiB8JNdx8wxYL4R0XRr_5fb4xLkRnqvWESwLDxBxK7xAMalBLfBTMGGo9PV_44Qk',
    },
    votes: 156,
    comments: 32,
  },
  {
    id: 3,
    title: 'Giải pháp xử lý Full-text Search tiếng Việt tốt nhất hiện nay?',
    author: {
      name: 'Phạm Dũng',
    },
    votes: 42,
    comments: 18,
  },
];

export default function RelatedPosts({ type }: RelatedPostsProps) {
  const posts = type === 'author' ? authorPosts : relatedPosts;
  const title = type === 'author' ? 'Bài viết khác từ tác giả' : 'Bài viết liên quan';
  const icon = type === 'author' ? <FeedIcon color='primary' /> : <RecommendIcon color='success' />;

  const PostItem = ({ post }: any) => (
    <Box
      component='a'
      href='#'
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderRadius: 1,
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          bgcolor: 'action.hover',
          '& .title': { color: 'primary.main' },
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          className='title'
          variant='subtitle2'
          fontWeight='medium'
          sx={{
            mb: 1,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </Typography>

        <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 1 }}>
          {post.author.avatar ? (
            <Avatar src={post.author.avatar} sx={{ width: 20, height: 20 }} />
          ) : (
            <Avatar sx={{ width: 20, height: 20, bgcolor: 'action.selected' }}>
              <PersonIcon sx={{ fontSize: 12 }} />
            </Avatar>
          )}
          <Typography variant='caption' color='text.secondary'>
            {post.author.name}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={2}>
          <Chip
            icon={<ArrowUpwardIcon sx={{ fontSize: 12 }} />}
            label={post.votes}
            size='small'
            sx={{
              height: 20,
              fontSize: '0.625rem',
              bgcolor: 'transparent',
              color: 'text.secondary',
              '& .MuiChip-icon': { fontSize: 12 },
            }}
          />
          <Chip
            icon={<ChatBubbleOutlineIcon sx={{ fontSize: 12 }} />}
            label={post.comments}
            size='small'
            sx={{
              height: 20,
              fontSize: '0.625rem',
              bgcolor: 'transparent',
              color: 'text.secondary',
              '& .MuiChip-icon': { fontSize: 12 },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 3 }}>
        <Stack direction='row' alignItems='center' spacing={1}>
          {icon}
          <Typography variant='h6' fontWeight='bold'>
            {title}
          </Typography>
        </Stack>

        {type === 'author' && (
          <Link
            href='#'
            sx={{
              color: 'primary.main',
              fontWeight: 'medium',
              fontSize: '0.875rem',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Xem tất cả
          </Link>
        )}
      </Stack>

      {/* Posts list */}
      <Stack spacing={2}>
        {posts.map((post, index) => (
          <Box key={post.id}>
            <PostItem post={post} />
            {index < posts.length - 1 && <Box sx={{ height: 1, bgcolor: 'divider', mx: 2 }} />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
