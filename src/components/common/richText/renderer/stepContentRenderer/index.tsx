'use client';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import Heading from '@tiptap/extension-heading';
import { renderToReactElement } from '@tiptap/static-renderer/pm/react';

import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
import { Box } from '@mui/material';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import { Figure } from '../../extensions/figure';
import { JSONContent } from '@tiptap/core';
import { Callout } from '../../extensions/callout';
import CalloutComponent from '../../components/calloutComponent/static';
import { ReactNodeViewContentProvider } from '@tiptap/react';
import ClientCodeBlockConfig from '@/components/common/clientCodeBlockConfig';

interface StepContentRendererProps {
  content: Node | JSONContent;
}

const lowlight = createLowlight(all);

export default function StepContentRenderer({ content }: StepContentRendererProps) {
  const output = renderToReactElement({
    content,
    options: {
      nodeMapping: {
        // render the custom node with the intended node view React component
        callout: ({ node, children }) => {
          // To pass the content down into the NodeViewContent component, we need to wrap the custom component with the ReactNodeViewContentProvider
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
      Image,
      Figure,
      //   CustomComponent,
      Callout,
      CodeBlockLowlight.configure({ lowlight }).extend({
        renderHTML({ node, HTMLAttributes }) {
          return [
            'div',
            { class: 'code-block-wrapper' },
            ['button', { class: 'copy-button', 'data-code': node.textContent }, 'Copy'],
            [
              'pre',
              {},
              [
                'code',
                { ...HTMLAttributes, class: `language-${node.attrs.language || 'plaintext'}` },
                node.textContent,
              ],
            ],
          ];
        },
      }),
      Blockquote,
      Link,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
  });

  return (
    <>
      <ClientCodeBlockConfig />
      <Box className='tiptap'>{output}</Box>
    </>
  );
}
