// CommentCard.tsx
import { Avatar, Box, Button, Chip, IconButton, Paper, Stack, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { roleLabelsMap } from '@/lib/const/user';
import { getReputationColor, getReputationIcon, getRoleColor } from '@/lib/utils/postBadged';
import CommentRenderer from '@/components/common/richText/renderer/commentRenderer';
import { JSONContent } from '@tiptap/core';

interface Author {
  name: string;
  avatar: string;
  role: string;
  reputation: number;
  reputationLevel: string;
  isAuthor?: boolean;
}

export interface CommentData {
  id: string;
  author: Author;
  content: Node | JSONContent;
  time: string;
  votes: number;
  replies?: CommentData[];
}

interface CommentCardProps {
  data: CommentData;
  isReply?: boolean;
}

export const CommentCard = ({ data, isReply = false }: CommentCardProps) => {
  return (
    <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
      <Avatar
        src={data.author.avatar}
        sx={{
          width: isReply ? 32 : 40,
          height: isReply ? 32 : 40,
          border: 1,
          borderColor: 'divider',
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: isReply ? 'info.lighter' : 'action.hover',
            border: 1,
            borderColor: isReply ? 'info.light' : 'divider',
          }}
        >
          {/* Author info */}
          <Stack direction='row' alignItems='center' flexWrap='wrap' gap={1} sx={{ mb: 1 }}>
            <Typography variant='body2' fontWeight='bold'>
              {data.author.name}
            </Typography>
            {isReply && data.author.isAuthor && (
              <Chip
                label='Tác giả'
                size='small'
                sx={{
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  fontSize: '0.625rem',
                  height: 20,
                  fontWeight: 'bold',
                  borderRadius: 0.5,
                  textTransform: 'uppercase',
                }}
              />
            )}
            <Chip
              label={roleLabelsMap[data.author.role]}
              size='small'
              sx={{
                // height: 20,
                ...getRoleColor(data.author.role),
              }}
            />
            <Chip
              icon={<Box display='flex'>{getReputationIcon(data.author.reputationLevel)}</Box>}
              label={data.author.reputation}
              size='small'
              sx={{
                // fontSize: '0.625rem',
                // height: 20,
                ...getReputationColor(data.author.reputationLevel),
              }}
            />
            <Typography variant='caption' color='text.secondary'>
              • {data.time}
            </Typography>
          </Stack>

          {/* Content */}
          <CommentRenderer content={data.content} />

          {/* Actions */}
          <Stack direction='row' alignItems='center' spacing={1}>
            <IconButton size='small' sx={{ color: 'text.secondary' }}>
              <ArrowUpwardIcon sx={{ fontSize: 18 }} />
              <Typography variant='caption' sx={{ ml: 0.5 }}>
                {data.votes}
              </Typography>
            </IconButton>

            <IconButton size='small' sx={{ color: 'text.secondary' }}>
              <ArrowDownwardIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <Button variant='text' size='small' sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
              Phản hồi
            </Button>
          </Stack>
        </Paper>

        {data.replies && data.replies.length > 0 && (
          <Box sx={{ pl: { xs: 2, sm: 4 }, borderLeft: 2, borderColor: 'divider', mt: 2 }}>
            {data.replies.map((reply) => (
              <CommentCard key={reply.id} data={reply} isReply />
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
};
