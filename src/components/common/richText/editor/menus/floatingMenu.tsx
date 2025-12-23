'use client';

import { FloatingMenu } from '@tiptap/react/menus';
import { useState, useEffect } from 'react';
import { IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/InfoOutline';
import { useRichTextEditorActions } from '@/hooks/useRichTextEditorAction';
import { EditorState } from '@tiptap/pm/state';

export function isInsideNode(state: EditorState, name: string) {
  const { $from } = state.selection;

  for (let depth = $from.depth; depth > 0; depth--) {
    if ($from.node(depth).type.name === name) {
      return true;
    }
  }
  return false;
}

export default function CustomFloatingMenu({ editor }: { editor: any }) {
  const [open, setOpen] = useState(false);

  // ===============================
  // Effect: register / cleanup events
  // ===============================
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (!editor.view || !editor.view.dom) return;

    const closeMenu = () => setOpen(false);

    editor.on('selectionUpdate', closeMenu);
    editor.on('blur', closeMenu);

    const dom = editor.view.dom;
    const handleClick = () => setOpen(false);
    dom.addEventListener('mousedown', handleClick);

    return () => {
      editor.off('selectionUpdate', closeMenu);
      editor.off('blur', closeMenu);
      dom.removeEventListener('mousedown', handleClick);
    };
  }, [editor]);

  // ===============================
  // Effect: toggle class on editor DOM
  // ===============================
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (!editor.view || !editor.view.dom) return;

    const dom = editor.view.dom;

    if (open) {
      dom.classList.add('menu-open');
    } else {
      dom.classList.remove('menu-open');
    }
  }, [open, editor]);

  const { addFigure } = useRichTextEditorActions(editor);

  // ===============================
  // Render guard (RẤT QUAN TRỌNG)
  // ===============================
  if (!editor || editor.isDestroyed || !editor.view?.dom) {
    return null;
  }

  return (
    <FloatingMenu editor={editor} options={{ offset: { mainAxis: -50 } }}>
      <Box
        sx={{
          display: isInsideNode(editor.state, 'callout') ? 'none' : 'flex',
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

          <IconButton size='small' onClick={() => editor.chain().focus().toggleCallout('note').run()}>
            <InfoIcon />
          </IconButton>
        </Box>
      </Box>
    </FloatingMenu>
  );
}
