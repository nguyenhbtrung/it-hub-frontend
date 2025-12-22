'use client';

import { cloneElement, useState } from 'react';
import { Box, Typography, Chip, Avatar, IconButton, Button, Stack, Paper, Divider, Tooltip } from '@mui/material';
import {
  Verified as VerifiedIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  Flag as FlagIcon,
  PersonAdd as PersonAddIcon,
  Info as InfoIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Download as DownloadIcon,
  ContentCopy as ContentCopyIcon,
  Label as LabelIcon,
} from '@mui/icons-material';
import { getPostContentTypeMeta, getReputationColor, getReputationIcon, getRoleColor } from '@/lib/utils/postBadged';
import { roleLabelsMap } from '@/lib/const/user';
import PostRenderer from '@/components/common/richText/renderer/postRenderer';

interface PostContentProps {
  post: any;
}

export default function PostContent({ post }: PostContentProps) {
  const [votes, setVotes] = useState(post.votes);
  const [saved, setSaved] = useState(false);

  const contentTypeMeta = getPostContentTypeMeta(post.type);

  const handleVote = (type: 'up' | 'down') => {
    if (type === 'up') {
      setVotes(votes + 1);
    } else {
      setVotes(votes - 1);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };
  console.log('attachment', post.attachments);

  return (
    <Box sx={{ p: { xs: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 2 }}>
          <Chip
            icon={
              <Box sx={{ display: 'flex' }}>
                {cloneElement(contentTypeMeta.icon, {
                  sx: { color: contentTypeMeta.color.color, fontSize: 18 },
                })}
              </Box>
            }
            label={contentTypeMeta.label}
            size='small'
            sx={{
              border: 1,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              ...contentTypeMeta.color,
            }}
          />
          <Typography variant='body2' color='text.secondary'>
            • Đăng {post.time}
          </Typography>
        </Stack>

        <Typography
          variant='h4'
          sx={{
            fontWeight: 'bold',
            mb: 3,
            lineHeight: 1.3,
            fontSize: { xs: '1.5rem', md: '1.875rem' },
          }}
        >
          {post.title}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Author info */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Stack direction='row' alignItems='center' spacing={2}>
            <Box sx={{ position: 'relative' }}>
              <Avatar src={post.author.avatar} sx={{ width: 48, height: 48, border: 1, borderColor: 'divider' }} />
              {post.author.isOnline && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    bgcolor: 'success.main',
                    borderRadius: '50%',
                    border: 2,
                    borderColor: 'background.paper',
                  }}
                  title='Online'
                />
              )}
            </Box>

            <Box>
              <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 0.5 }}>
                <Typography variant='h6' fontWeight='bold'>
                  {post.author.name}
                </Typography>
                <VerifiedIcon sx={{ color: 'primary.main' }} titleAccess='Thành viên uy tín' />
                <Chip
                  label={roleLabelsMap[post.author.role]}
                  size='small'
                  sx={{
                    border: 1,
                    borderRadius: 1,
                    // fontSize: '0.625rem',
                    height: 20,
                    ...getRoleColor(post.author.role),
                  }}
                />
                <Tooltip title='Theo dõi'>
                  <IconButton
                    size='small'
                    sx={{
                      bgcolor: 'action.hover',
                      '&:hover': { bgcolor: 'primary.lighter', color: 'primary.main' },
                    }}
                  >
                    <PersonAddIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Stack direction='row' alignItems='center' spacing={2}>
                <Chip
                  icon={<Box>{getReputationIcon(post.author.reputationLevel)}</Box>}
                  label={post.author.reputation}
                  size='small'
                  sx={{
                    fontSize: '0.75rem',
                    height: 24,
                    ...getReputationColor(post.author.reputationLevel),
                  }}
                />
                <Typography variant='caption' color='text.secondary'>
                  Thành viên tích cực
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Tooltip title='Báo cáo bài viết'>
            <IconButton
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'error.main', bgcolor: 'error.lighter' },
              }}
            >
              <FlagIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ mb: 4 }}>
        {/* {post.content.map((item: any, index: number) => {
          switch (item.type) {
            case 'paragraph':
              return (
                <Typography key={index} paragraph sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  {item.text}
                </Typography>
              );

            case 'code':
              return (
                <Box key={index} sx={{ position: 'relative', my: 2 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      opacity: 0,
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    <Tooltip title='Sao chép code'>
                      <IconButton
                        onClick={() => handleCopyCode(item.code)}
                        sx={{
                          bgcolor: 'grey.800',
                          color: 'common.white',
                          '&:hover': { bgcolor: 'grey.700' },
                        }}
                      >
                        <ContentCopyIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: 'grey.900',
                      color: 'grey.100',
                      p: 3,
                      borderRadius: 2,
                      border: 1,
                      borderColor: 'grey.700',
                      overflow: 'auto',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    }}
                  >
                    <pre style={{ margin: 0 }}>
                      <code>{item.code}</code>
                    </pre>
                  </Paper>
                </Box>
              );

            case 'note':
              return (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    my: 2,
                    borderRadius: 2,
                    bgcolor: 'info.lighter',
                    border: 1,
                    borderColor: 'info.light',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <InfoIcon sx={{ color: 'info.main', mt: 0.5 }} />
                  <Typography variant='body2' sx={{ color: 'info.dark' }}>
                    <strong>Ghi chú:</strong> {item.text}
                  </Typography>
                </Paper>
              );

            case 'attachment':
              return (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    my: 2,
                    borderRadius: 2,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.selected' },
                    width: { xs: '100%', sm: 'fit-content' },
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: 'error.lighter',
                      color: 'error.main',
                      borderRadius: 1,
                    }}
                  >
                    <PictureAsPdfIcon />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant='body2'
                      fontWeight='medium'
                      noWrap
                      sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                      {item.filename}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {item.size} • Tải lên lúc {item.time}
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' },
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Paper>
              );

            default:
              return null;
          }
        })} */}
        <PostRenderer content={post.content} />
        {post.attachments.map((item: any, index: number) => {
          return (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 2,
                my: 2,
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'action.hover',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.selected' },
                width: { xs: '100%', sm: 'fit-content' },
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: 'error.lighter',
                  color: 'error.main',
                  borderRadius: 1,
                }}
              >
                <PictureAsPdfIcon />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant='body2' fontWeight='medium' noWrap sx={{ '&:hover': { color: 'primary.main' } }}>
                  {item.filename}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {item.size} • Tải lên lúc {item.time}
                </Typography>
              </Box>
              <IconButton
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main', bgcolor: 'primary.lighter' },
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Paper>
          );
        })}
      </Box>

      {/* Tags */}
      <Divider sx={{ mb: 3 }} />
      <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1} sx={{ mb: 3 }}>
        <Typography
          variant='body2'
          color='text.secondary'
          fontWeight='medium'
          sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
        >
          <LabelIcon sx={{ fontSize: 18, mr: 0.5 }} />
          Tags:
        </Typography>
        {post.tags.map((tag: string, index: number) => (
          <Chip
            key={index}
            label={tag}
            component='a'
            href='#'
            clickable
            sx={{
              borderRadius: 16,
              bgcolor: 'action.hover',
              '&:hover': {
                bgcolor: 'primary.lighter',
                color: 'primary.main',
                border: 1,
                borderColor: 'primary.light',
              },
            }}
          />
        ))}
      </Stack>

      {/* Actions */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Stack direction='row' alignItems='center'>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 16,
              bgcolor: 'action.hover',
              border: 1,
              borderColor: 'divider',
              p: 0.5,
            }}
          >
            <IconButton
              onClick={() => handleVote('up')}
              sx={{
                borderRadius: '50%',
                '&:hover': { bgcolor: 'common.white', color: 'warning.main' },
              }}
            >
              <ArrowUpwardIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <Typography fontWeight='bold' sx={{ px: 2, minWidth: 32, textAlign: 'center' }}>
              {votes}
            </Typography>
            <IconButton
              onClick={() => handleVote('down')}
              sx={{
                borderRadius: '50%',
                '&:hover': { bgcolor: 'common.white', color: 'info.main' },
              }}
            >
              <ArrowDownwardIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Paper>
        </Stack>

        <Stack direction='row' spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button
            variant='text'
            startIcon={<BookmarkBorderIcon />}
            onClick={() => setSaved(!saved)}
            sx={{
              flex: { xs: 1, sm: 'none' },
              color: saved ? 'primary.main' : 'text.secondary',
              borderColor: saved ? 'primary.main' : 'divider',
            }}
          >
            {saved ? 'Đã lưu' : 'Lưu bài'}
          </Button>
          <Button
            variant='text'
            startIcon={<ShareIcon />}
            sx={{
              flex: { xs: 1, sm: 'none' },
              color: 'text.secondary',
              borderColor: 'divider',
            }}
          >
            Chia sẻ
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
