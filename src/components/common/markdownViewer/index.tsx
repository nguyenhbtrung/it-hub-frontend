'use client';

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import Box from '@mui/material/Box';
// import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <Box className='tiptap'>
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const isBlock = className && className.startsWith('language-');
            return isBlock ? (
              <pre>
                <code className={className ? className : 'hljs'} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code className='hljs'>{children}</code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
