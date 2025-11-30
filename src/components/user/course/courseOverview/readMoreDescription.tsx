'use client';

import { useState, useRef, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface ReadMoreDescriptionProps {
  text: string;
  maxHeight?: number;
}

export default function ReadMoreDescription({ text, maxHeight = 100 }: ReadMoreDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      if (scrollHeight > maxHeight) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOverflow(true);
      }
    }
  }, [text, maxHeight]);

  return (
    <Box sx={{ position: 'relative', my: 3 }}>
      <Typography
        ref={contentRef}
        variant='body1'
        color='text.secondary'
        sx={{
          maxHeight: expanded ? 'none' : `${maxHeight}px`,
          overflow: 'hidden',
          position: 'relative',
          transition: 'max-height 0.3s ease',
        }}
      >
        {text}
        {!expanded && isOverflow && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50px',
              background: 'linear-gradient(transparent, rgba(255,255,255,0.9))',
            }}
          />
        )}
      </Typography>

      {isOverflow && (
        <Button
          startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setExpanded(!expanded)}
          variant='text'
          color='primary'
          sx={{
            mt: 1,
            px: '4px',
            '&:hover': {
              color: 'primary.dark',
              backgroundColor: 'color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)',
              boxShadow: 'none',
            },
          }}
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </Button>
      )}
    </Box>
  );
}
