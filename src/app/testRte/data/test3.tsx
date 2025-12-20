'use client';
import Box from '@mui/material/Box';
import { Node } from '@tiptap/core';
import { NodeViewContent, ReactNodeViewContentProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { renderToReactElement } from '@tiptap/static-renderer/pm/react';

const CustomNodeExtensionWithContent = Node.create({
  name: 'customNodeExtensionWithContent',
  content: 'text*',
  group: 'block',
  renderHTML() {
    return ['div', { class: 'my-custom-component-with-content' }, 0] as const;
  },
  //   addNodeView() {
  //     return ReactNodeViewRenderer(MyCustomComponentWithContent)
  //   },
});

function MyCustomComponentWithContent() {
  return (
    <div className='custom-component-with-content'>
      Custom component with content in React!
      <NodeViewContent />
    </div>
  );
}

const TestEditor = ({ content }: any) => {
  const output = renderToReactElement({
    extensions: [StarterKit, CustomNodeExtensionWithContent],
    options: {
      nodeMapping: {
        customNodeExtensionWithContent: ({ children }) => {
          // To pass the content down into the NodeViewContent component, we need to wrap the custom component with the ReactNodeViewContentProvider
          return (
            <ReactNodeViewContentProvider content={children}>
              <MyCustomComponentWithContent />
            </ReactNodeViewContentProvider>
          );
        },
      },
    },
    content: {
      type: 'doc',
      content: [
        {
          type: 'customNodeExtensionWithContent',
          // rich text content
          content: [
            {
              type: 'text',
              text: 'Hello, world!',
            },
            {
              type: 'heading',
              attrs: {
                level: 1,
              },
              content: [
                {
                  type: 'text',
                  text: 'grwgr',
                },
              ],
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'k',
                        },
                        {
                          type: 'text',
                          marks: [
                            {
                              type: 'bold',
                            },
                          ],
                          text: 'kkk',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'kkkk',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
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
