'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import { Box } from '@mui/material';

import { useEffect } from 'react';

import type { JSONContent } from '@tiptap/react';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';

import Toolbar from '../toolbar/textOnly';
import { Placeholder } from '@tiptap/extensions';

interface RichTextEditorProps {
  value: JSONContent;
  onChange: (value: JSONContent) => void;
  borderRadius?: string | number;
  height?: string | number;
  placeholder?: string;
}

export default function EditorBase({
  value,
  onChange,
  borderRadius = 1,
  height = 300,
  placeholder = 'Nhập nội dung',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Italic,
      Bold,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    onCreate: ({ editor }) => {
      // Set attributes on the editor's root DOM element
      editor.view.dom.setAttribute('spellcheck', 'false');
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
    if (editor && JSON.stringify(value) !== JSON.stringify(editor.getJSON())) {
      editor.commands.setContent(value); // value là JSON
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        // height: 500,
        // position: 'relative',
        border: 1,
        borderColor: 'divider',
        borderRadius,
        overflow: 'auto',
        bgcolor: 'background.paper',
        '& .tiptap': {
          minHeight: height,
          padding: 2,
        },
      }}
    >
      <Toolbar editor={editor} />
      <Box sx={{ position: 'relative' }}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
