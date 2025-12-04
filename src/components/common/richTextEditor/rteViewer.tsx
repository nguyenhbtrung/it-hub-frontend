import Box from '@mui/material/Box';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function RteViewer({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <Box
      sx={{
        // overflow: 'hidden',
        // bgcolor: 'background.paper',
        '& .tiptap': {
          // minHeight: 200,
          // padding: 2,
          // outline: 'none',
          '& h1': { fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 600, mt: 0, mb: 2 },
          '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 4, mb: 2 },
          '& h3': { fontSize: '1.25rem', fontWeight: 500, mt: 4, mb: 1 },
          '& ul, & ol': { pl: 4 },
          '& li': { pl: 1, mb: 1 },
          '& p': { color: 'text.secodary', mb: 2, lineHeight: 1.6, whiteSpace: 'pre-wrap' },
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
      <EditorContent editor={editor} />
    </Box>
  );
}
