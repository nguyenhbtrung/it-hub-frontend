'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import { Box, ButtonGroup, IconButton, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function Toolbar({ editor }: { editor: any }) {
  if (!editor) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderRadius: 0,
      }}
    >
      <ButtonGroup size='small' sx={{ flexWrap: 'wrap', gap: 0.5 }}>
        <ToggleButtonGroup
          size='small'
          exclusive
          value={
            editor.isActive('heading', { level: 1 })
              ? 'h1'
              : editor.isActive('heading', { level: 2 })
                ? 'h2'
                : editor.isActive('heading', { level: 3 })
                  ? 'h3'
                  : null
          }
          sx={{ mr: 1 }}
        >
          <ToggleButton
            value='h1'
            size='small'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <TitleIcon fontSize='small' />
          </ToggleButton>
          <ToggleButton
            value='h2'
            size='small'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <TitleIcon fontSize='small' sx={{ fontSize: 14 }} />
          </ToggleButton>
          <ToggleButton
            value='h3'
            size='small'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <TitleIcon fontSize='small' sx={{ fontSize: 12 }} />
          </ToggleButton>
        </ToggleButtonGroup>

        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
          size='small'
        >
          <FormatBoldIcon fontSize='small' />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
          size='small'
        >
          <FormatItalicIcon fontSize='small' />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          color={editor.isActive('underline') ? 'primary' : 'default'}
          size='small'
        >
          <FormatUnderlinedIcon fontSize='small' />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
          size='small'
        >
          <FormatListBulletedIcon fontSize='small' />
        </IconButton>

        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
          size='small'
        >
          <FormatListNumberedIcon fontSize='small' />
        </IconButton>
      </ButtonGroup>
    </Paper>
  );
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        placeholder: 'Nhập mô tả chi tiết...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[200px] p-3',
      },
    },
    immediatelyRender: false,
  });

  // Update nội dung khi value thay đổi từ bên ngoài
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        '& .tiptap': {
          minHeight: 200,
          padding: 2,
          outline: 'none',
          '& h1': { fontSize: '1.5rem', fontWeight: 600, mt: 2, mb: 1 },
          '& h2': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1 },
          '& h3': { fontSize: '1.125rem', fontWeight: 600, mt: 2, mb: 1 },
          '& ul, & ol': { pl: 2 },
          '& p': { mb: 1 },
        },
        '& .tiptap p.is-empty:before': {
          color: 'text.disabled',
          content: 'attr(data-placeholder)',
          float: 'left',
          height: 0,
          pointerEvents: 'none',
        },
      }}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </Box>
  );
}
