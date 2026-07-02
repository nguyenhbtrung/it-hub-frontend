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
import { TableKit } from '@tiptap/extension-table';

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

        tableCell: ({ node, children }) => {
          return (
            <td colSpan={node.attrs?.colspan} rowSpan={node.attrs?.rowspan}>
              {children}
            </td>
          );
        },

        tableHeader: ({ node, children }) => {
          return (
            <th colSpan={node.attrs?.colspan} rowSpan={node.attrs?.rowspan}>
              {children}
            </th>
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
      TableKit,
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
