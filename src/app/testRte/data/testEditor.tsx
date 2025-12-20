'use client';
import { generateHTML } from '@tiptap/html';
import Editor from '../editor';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import Heading from '@tiptap/extension-heading';
import { renderToReactElement } from '@tiptap/static-renderer/pm/react';
// import { renderToHTMLString } from '@tiptap/static-renderer/pm/html'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
import { Box } from '@mui/material';
import Image from '@tiptap/extension-image';
import { Figure } from '../figure';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import ClientCodeBlockConfig from '../ClientCodeBlockConfig';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockComponent from '../CodeBlockComponent';

const lowlight = createLowlight(all);
const TestEditor = ({ content }: any) => {
  const output = renderToReactElement({
    content,
    extensions: [
      StarterKit,
      Underline,
      Italic,
      Bold,
      BulletList,
      OrderedList,
      ListItem,
      Image,
      Figure,
      //   CustomComponent,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
      Blockquote,
      Link,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
  });

  return (
    <Box className='tiptap' p={10} sx={{ border: '1px solid' }}>
      {output}
    </Box>
  );
};

export default TestEditor;
