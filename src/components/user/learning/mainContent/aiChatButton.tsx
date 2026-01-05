'use client';

import Button from '@mui/material/Button';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useAiChatStore } from '@/store/useAiChatStore';

export default function AiChatButton() {
  const { openDialog, setSelectedText } = useAiChatStore();

  const handleOpenChat = () => {
    openDialog();
    setSelectedText('');
  };
  return (
    <Button
      startIcon={<AutoAwesomeIcon />}
      size='small'
      variant='text'
      onClick={handleOpenChat}
      sx={{ p: 1.5, py: 0.5, color: 'text.primary' }}
    >
      Hỏi AI
    </Button>
  );
}
