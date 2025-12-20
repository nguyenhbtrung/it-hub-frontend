'use client';

import './styles.scss';
import 'highlight.js/styles/atom-one-dark.css';

import Box from '@mui/material/Box';
import { ReactNode, useEffect } from 'react';
import hljs from 'highlight.js';

interface ContentRenderProps {
  output: ReactNode;
}

export default function ContentRender({ output }: ContentRenderProps) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <Box className='tiptap' p={10} sx={{ border: '1px solid' }}>
      {output}
    </Box>
  );
}
