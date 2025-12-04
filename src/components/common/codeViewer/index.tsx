'use client';

import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { IconButton, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface CodeViewerProps {
  code: string;
  language?: string; // tuỳ chọn, nếu không truyền sẽ detect
}

export default function CodeViewer({ code }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // if (!language) {
    hljs.highlightAll();
    // }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <Box sx={{ position: 'relative', mb: 2 }}>
      <pre style={{ margin: 0 }}>
        <code className={`hljs`}>{code}</code>
      </pre>
      <IconButton
        size='small'
        onClick={handleCopy}
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          bgcolor: copied ? 'success.light' : 'background.paper',
        }}
      >
        <ContentCopyIcon fontSize='small' />
      </IconButton>
    </Box>
  );
}
