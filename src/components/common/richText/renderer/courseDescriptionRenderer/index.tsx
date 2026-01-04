import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import Heading from '@tiptap/extension-heading';
import { renderToReactElement } from '@tiptap/static-renderer/pm/react';

import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
import { Box } from '@mui/material';
import Link from '@tiptap/extension-link';
import { JSONContent } from '@tiptap/core';
import CalloutComponent from '../../components/calloutComponent/static';
import { ReactNodeViewContentProvider } from '@tiptap/react';

interface PostRendererProps {
  content: Node | JSONContent;
}

export default function CourseDescriptionRenderer({ content }: PostRendererProps) {
  const output = renderToReactElement({
    content,
    options: {
      nodeMapping: {
        callout: ({ node, children }) => {
          return (
            <ReactNodeViewContentProvider content={children}>
              <CalloutComponent attrs={node.attrs} />
            </ReactNodeViewContentProvider>
          );
        },
      },
    },
    extensions: [
      StarterKit,
      Underline,
      Italic,
      Bold,
      BulletList,
      OrderedList,
      ListItem,
      Link,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
  });

  return (
    <>
      <Box className='tiptap'>{output}</Box>
    </>
  );
}
