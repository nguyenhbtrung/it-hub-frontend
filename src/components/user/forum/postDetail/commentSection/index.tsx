'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  IconButton,
  Stack,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Paper,
  Divider,
} from '@mui/material';
import {
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  Code as CodeIcon,
  Image as ImageIcon,
  Send as SendIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import CommentEditor from '@/components/common/richText/editor/commentEditor';
import { CommentCard } from '../commentCard';

const comments = [
  {
    id: 1,
    author: {
      name: 'Trần Minh',
      role: 'student',
      reputation: '450',
      reputationLevel: 'bronze',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB7kN1EYTfmpNq9rXZRU8krYQEG0t0VAQlqPHhQe2t0HJu7OredD2FOlrPMsB99ZTbk0Sh-VfQ5bWgngKmAIL_4U-850YxdcXFtgXLwUlvfuCJaXWm3aJuTQ3QkUXnP48i0cM_rufkWERuQ9OcBmzzMtWCcIN2agZYvq-fkQYHTD1WwZdalUikaQxEXzMOLoSuEPxUmYUNQa9vhbhlfsn-r0baMiW8YlWKO2xH6orlWiiwi5kgL3HbcnBPlzmUzRvwGPEorx9zgnSw',
    },
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Bạn thử sử dụng ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold',
                },
              ],
              text: 'Composite Index',
            },
            {
              type: 'text',
              text: ' (Index tổng hợp) cho cả 3 trường ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'title',
            },
            {
              type: 'text',
              text: ', ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'category',
            },
            {
              type: 'text',
              text: ', ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'publish_year',
            },
            {
              type: 'text',
              text: ' xem sao. MySQL sẽ tối ưu hơn khi có index bao phủ cả điều kiện ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'WHERE',
            },
            {
              type: 'text',
              text: '. Ngoài ra, việc dùng ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'LIKE %keyword%',
            },
            {
              type: 'text',
              text: ' sẽ không sử dụng index hiệu quả đâu, bạn nên xem xét dùng Full-text Search.',
            },
          ],
        },
        {
          type: 'paragraph',
        },
      ],
    },
    time: '1 giờ trước',
    votes: 12,
    replies: [
      {
        id: 2,
        author: {
          name: 'Nguyễn Văn A',
          role: 'student',
          isAuthor: true,
          reputation: '1.5k',
          reputationLevel: 'silver',
          avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCM2NQFbdteqaHSRPEptfuN9gluoTE1J0nlk4vS7eZCr5RlxzHTVCPEDH6QhB0RGBXTSPKyTppLHXkKPwFdk-Mj8NL7TKaBJrsT7pCTYSDVuRFIrxAA2C1nj7CUYiNslXafAYXZddaHCmBjW1XATbO6NwK7al4DfLMrnNxx1ZhsFwV-D6yv0bzn4zQczzTWa_8_rPSQN_L_MOrEyFFh2fgcKZI9QQeZrVrPPOo20ZPpY8q4F-uV1PkBPN86Zh0KKWHtdx3aGhkxU00',
        },
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Cảm ơn bạn! Mình sẽ thử tạo composite index. Về Full-text search, Spring Data JPA có hỗ trợ native không hay mình phải viết native query?',
                },
              ],
            },
          ],
        },
        time: '45 phút trước',
        votes: 2,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    author: {
      name: 'Lê Hoàng',
      role: 'instructor',
      reputation: '2.8k',
      reputationLevel: 'silver',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC80ucLoQ6nf4gVeAYUSXevClm6wwb-0xaio927Sfm_-sUK28V_DTOzJ7Ep8khh0qR5C8C62uy1M3nLguT0_fr8irzfegW9wSmnurfP0WfiITzjiJyar1JPNwcPGDxSRb6ln9zHyred8EBG16c0DxklDhyC25HI53XJsS39PnkDOpWKYb2xKp4dpEh5hN1sowF9wSBki9kFpiQXiB8JNdx8wxYL4R0XRr_5fb4xLkRnqvWESwLDxBxK7xAMalBLfBTMGGo9PV_44Qk',
    },
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Ngoài index, bạn check xem cấu hình ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'code',
                },
              ],
              text: 'innodb_buffer_pool_size',
            },
            {
              type: 'text',
              text: ' của MySQL nhé. Với 2GB RAM cho container thì có thể cấp khoảng 1GB cho buffer pool để caching tốt hơn.',
            },
          ],
        },
      ],
    },
    time: '30 phút trước',
    votes: 5,
    replies: [],
  },
];

export default function CommentSection() {
  const [sortBy, setSortBy] = useState('best');
  const [comment, setComment] = useState('');

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Submit comment:', comment);
    setComment('');
  };

  const CommentItem = ({ comment }: { comment: any }) => (
    // <Box>
    <CommentCard data={comment} />
    // </Box>
  );

  const StarIcon = () => (
    <Box
      component='span'
      sx={{
        fontSize: 12,
        color: 'warning.main',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      ★
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 3, md: 4 } }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ mb: 4 }}
      >
        <Stack direction='row' alignItems='center' spacing={1}>
          <Typography variant='h6' fontWeight='bold'>
            Bình luận
          </Typography>
          <Chip
            label={comments.length}
            size='small'
            sx={{
              bgcolor: 'action.hover',
              color: 'text.secondary',
              fontWeight: 'bold',
            }}
          />
        </Stack>

        <Stack direction='row' alignItems='center' spacing={1}>
          <Typography variant='body2' color='text.secondary'>
            Sắp xếp theo:
          </Typography>
          <FormControl variant='standard' size='small'>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              sx={{
                color: 'text.primary',
                fontWeight: 'medium',
                '&:before, &:after': { borderBottom: 'none' },
                '& .MuiSelect-select': { paddingRight: 3 },
              }}
            >
              <MenuItem value='best'>Hay nhất</MenuItem>
              <MenuItem value='newest'>Mới nhất</MenuItem>
              <MenuItem value='oldest'>Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {/* Comment input */}
      <Stack direction='row' spacing={2} sx={{ mb: 4 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.lighter',
            color: 'primary.main',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          NV
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <CommentEditor />
          {/* <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Viết bình luận của bạn để thảo luận...'
              variant='outlined'
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' },
                },
              }}
            />
            <Stack direction='row' spacing={1} position='absolute' bottom={-50}>
              <IconButton size='small' sx={{ color: 'text.secondary' }} title='In đậm'>
                <FormatBoldIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size='small' sx={{ color: 'text.secondary' }} title='In nghiêng'>
                <FormatItalicIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size='small' sx={{ color: 'text.secondary' }} title='Chèn code'>
                <CodeIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size='small' sx={{ color: 'text.secondary' }} title='Chèn ảnh'>
                <ImageIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          </Box> */}
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Box />
            <Button variant='contained' startIcon={<SendIcon />} onClick={handleSubmit} sx={{ fontWeight: 'bold' }}>
              Gửi bình luận
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Comments list */}
      <Stack spacing={5}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Stack>

      {/* Load more */}
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
        <Button
          variant='outlined'
          endIcon={<ExpandMoreIcon />}
          sx={{
            color: 'text.secondary',
            borderColor: 'divider',
            '&:hover': { borderColor: 'primary.main' },
          }}
        >
          Xem thêm bình luận
        </Button>
      </Box>
    </Box>
  );
}
