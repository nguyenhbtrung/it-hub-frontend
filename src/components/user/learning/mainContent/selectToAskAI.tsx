'use client';

import { useEffect, useRef, useState } from 'react';
import { Popper, Button, Paper } from '@mui/material';
import { AIChatDialog } from './aiChatDialog';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { useAiChatStore } from '@/store/useAiChatStore';

interface SelectToAskAIProps {
  children: React.ReactNode;
  accessToken: string;
  stepId: string;
}

export default function SelectToAskAI({ children, accessToken, stepId }: SelectToAskAIProps) {
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const { open, openDialog, closeDialog, selectedText, setSelectedText } = useAiChatStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setAnchorRect(null);
        return;
      }

      const text = selection.toString().trim();
      if (!text) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const container = containerRef.current;
      if (container && container.contains(selection.anchorNode) && container.contains(selection.focusNode)) {
        setSelectedText(text);
        setAnchorRect(rect);
      } else {
        setAnchorRect(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <>
      <div ref={containerRef}>{children}</div>

      <Popper
        open={Boolean(anchorRect)}
        anchorEl={{
          getBoundingClientRect: () => anchorRect!,
        }}
        placement='top'
        modifiers={[{ name: 'offset', options: { offset: [0, 10] } }]}
      >
        <Paper elevation={3} sx={{ p: 0 }}>
          <Button startIcon={<AutoAwesomeIcon />} size='small' variant='outlined' onClick={openDialog}>
            Hỏi AI
          </Button>
        </Paper>
      </Popper>
      <AIChatDialog
        open={open}
        onClose={closeDialog}
        selectedText={selectedText}
        accessToken={accessToken}
        stepId={stepId}
      />
    </>
  );
}
