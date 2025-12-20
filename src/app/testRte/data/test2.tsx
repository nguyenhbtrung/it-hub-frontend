// 'use client';
import Box from '@mui/material/Box';
import StarterKit from '@tiptap/starter-kit';
import { renderToReactElement } from '@tiptap/static-renderer/pm/react';
import React from 'react';
import { MyCustomComponentWithoutContent } from './test2.client';
import { Node } from '@tiptap/core';

const CustomNodeExtensionWithoutContent = Node.create({
  name: 'customNodeExtensionWithoutContent',
  atom: true,
  renderHTML() {
    return ['div', { class: 'my-custom-component-without-content' }] as const;
  },
  //   addNodeView() {
  //     return ReactNodeViewRenderer(MyCustomComponentWithoutContent);
  //   },
});

const TestEditor = ({ content }: any) => {
  const output = renderToReactElement({
    extensions: [StarterKit, CustomNodeExtensionWithoutContent],
    options: {
      nodeMapping: {
        // render the custom node with the intended node view React component
        customNodeExtensionWithoutContent: MyCustomComponentWithoutContent,
      },
    },
    content: {
      type: 'doc',
      content: [
        {
          type: 'customNodeExtensionWithoutContent',
        },
      ],
    },
  });

  return (
    <Box className='tiptap' p={10} sx={{ border: '1px solid' }}>
      {output}
    </Box>
  );
};

export default TestEditor;
