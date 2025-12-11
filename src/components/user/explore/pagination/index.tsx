// app/courses/components/Pagination.tsx
'use client';

import { Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Pagination() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
      <IconButton
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
        size='small'
      >
        <ChevronLeftIcon />
      </IconButton>

      <Button variant='contained' sx={{ minWidth: 36, height: 36 }}>
        1
      </Button>

      <Button variant='outlined' sx={{ minWidth: 36, height: 36 }}>
        2
      </Button>

      <Button variant='outlined' sx={{ minWidth: 36, height: 36 }}>
        3
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>...</Box>

      <Button variant='outlined' sx={{ minWidth: 36, height: 36 }}>
        10
      </Button>

      <IconButton
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
        }}
        size='small'
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
