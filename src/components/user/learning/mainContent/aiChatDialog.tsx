'use client';

import { Dialog, DialogContent, Box, TextField, IconButton, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useEffect, useRef, useState } from 'react';
import { ChatMenu } from './menu';
import MarkdownViewer from '@/components/common/markdownViewer';
import { API_BASE_URL } from '@/lib/fetcher/constants';
import { ApiError } from '@/lib/errors/ApiError';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  selectedText: string;
  accessToken: string;
  stepId: string;
};

type Flexibility = 'STRICT' | 'GUIDED' | 'OPEN';

export function AIChatDialog({ open, onClose, selectedText, accessToken, stepId }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [contextText, setContextText] = useState('');
  const [flexibility, setFlexibility] = useState<Flexibility>('GUIDED');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && selectedText) {
      setContextText(selectedText);
    }
  }, [open, selectedText]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const payload = {
      stepId,
      scope: 'lesson',
      question: input,
      selectedText: contextText || undefined,
      flexibility,
    };

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setContextText('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/ask/step`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        const result = await res.json();
        throw new ApiError(res.status, result.message, result.code || 'UNKNOWN_ERROR');
      }

      if (!res?.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          const updated = { ...last, content: accumulated };
          return [...prev.slice(0, -1), updated];
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
        },
      ]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md' sx={{ p: 0 }} slotProps={{ paper: { sx: { p: 0 } } }}>
      <DialogContent
        sx={{
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          p: 0,
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid #eee',
            p: 2,
            backgroundColor: '#f9f9f9',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <AutoAwesomeIcon color='primary' />
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Trợ lý học tập AI
          </Typography>
        </Box>

        {/* Chat */}

        {messages.length === 0 ? (
          <Box
            sx={{ flex: 1, overflowY: 'auto', p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography variant='h5' color='text.secondary' align='center'>
              Xin chào, hãy hỏi bất cứ thứ gì về bài giảng này
            </Typography>
          </Box>
        ) : (
          <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
            {messages.map((msg, idx) => (
              <ChatMessageRow key={idx} message={msg} />
            ))}
            <div ref={bottomRef} />
          </Box>
        )}

        {/* Bottom area */}
        <Box sx={{ borderTop: '1px solid #eee', p: 2 }}>
          {contextText && <ContextPreview text={contextText} onClear={() => setContextText('')} />}

          {/* Input */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ChatMenu value={flexibility} onChange={setFlexibility} />

            <TextField
              fullWidth
              placeholder='Nhập câu hỏi cho AI...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />

            <IconButton color='primary' onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function ChatMessageRow({ message }: { message: ChatMessage }) {
  if (message.role === 'assistant') {
    return (
      <Box
        sx={{
          width: '100%',
          mb: 2,
        }}
      >
        <MarkdownViewer content={message.content} />
      </Box>
    );
  }

  // User bubble
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 1,
      }}
    >
      <Paper
        sx={{
          p: 1.5,
          maxWidth: '75%',
          bgcolor: 'primary.main',
          color: 'white',
          whiteSpace: 'pre-wrap',
        }}
      >
        {message.content}
      </Paper>
    </Box>
  );
}

function ContextPreview({ text, onClear }: { text: string; onClear: () => void }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 1,
        mb: 1,
        display: 'flex',
        gap: 1,
        alignItems: 'flex-start',
        bgcolor: '#f9fafb',
      }}
    >
      <AutoAwesomeIcon fontSize='small' color='primary' />

      <Box sx={{ flex: 1 }}>
        <Typography variant='caption' color='text.secondary'>
          Ngữ cảnh đã chọn
        </Typography>
        <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap', maxHeight: 100, overflow: 'auto' }}>
          {text}
        </Typography>
      </Box>

      <IconButton size='small' onClick={onClear}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </Paper>
  );
}
