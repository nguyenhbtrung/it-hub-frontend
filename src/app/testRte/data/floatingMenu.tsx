'use client';

import { FloatingMenu } from '@tiptap/react/menus';
import { useState, useEffect } from 'react';
import { IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';
import { useRichTextEditorActions } from '../useRichTextEditorAction';

export default function CustomFloatingMenu({ editor }: { editor: any }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const closeMenu = () => setOpen(false);

    // Đóng khi selection thay đổi hoặc mất focus
    editor.on('selectionUpdate', closeMenu);
    editor.on('blur', closeMenu);

    // Đóng khi click vào editor (kể cả cùng dòng)
    const handleClick = () => setOpen(false);
    editor.view.dom.addEventListener('mousedown', handleClick);

    return () => {
      editor.off('selectionUpdate', closeMenu);
      editor.off('blur', closeMenu);
      editor.view.dom.removeEventListener('mousedown', handleClick);
    };
  }, [editor]);

  const { addFigure } = useRichTextEditorActions(editor);

  if (!editor) return null;

  return (
    <FloatingMenu editor={editor} options={{ offset: { mainAxis: -50 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          '& .MuiIconButton-root': {
            border: '1px solid',
          },
        }}
      >
        <IconButton
          size='small'
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
          color={open ? 'primary' : 'default'}
        >
          <AddIcon />
        </IconButton>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 50,

            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            opacity: open ? 1 : 0,
            transform: open ? 'translateX(0)' : 'translateX(-10px)',
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          <IconButton size='small' onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <FormatQuoteIcon />
          </IconButton>

          <IconButton size='small' onClick={addFigure}>
            <ImageIcon />
          </IconButton>

          <IconButton size='small' onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            <CodeIcon />
          </IconButton>
        </Box>
      </Box>
    </FloatingMenu>
  );
}
