'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Chip,
  IconButton,
  Grid,
} from '@mui/material';
import { useState } from 'react';

interface ViewAllTagsDialogProps {
  open: boolean;
  onClose: () => void;
  totalTags: number;
}

// Dữ liệu mẫu cho tất cả tags
const allTags = [
  'Java',
  'ReactJS',
  'DevOps',
  'CyberSecurity',
  'Python',
  'JavaScript',
  'TypeScript',
  'NodeJS',
  'AWS',
  'Docker',
  'Kubernetes',
  'MachineLearning',
  'AI',
  'DataScience',
  'WebDevelopment',
  'MobileDevelopment',
  'UIUX',
  'Database',
  'SQL',
  'NoSQL',
  'Git',
  'Agile',
  'Testing',
  'Security',
];

export default function ViewAllTagsDialog({ open, onClose, totalTags }: ViewAllTagsDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = allTags.filter((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle>
        <Typography variant='h6' fontWeight='bold'>
          Tất cả tags ({totalTags})
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Danh sách đầy đủ các tags bạn đang theo dõi
        </Typography>
      </DialogTitle>

      <DialogContent>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder='Tìm kiếm tags...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className='material-symbols-outlined'>search</span>
              </InputAdornment>
            ),
          }}
        />

        {/* Tags Grid */}
        <Grid container spacing={2}>
          {filteredTags.map((tag) => (
            <Grid size={{ xs: 6, sm: 4 }} key={tag}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  textAlign: 'center',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Chip
                  label={`#${tag}`}
                  size='small'
                  sx={{
                    mb: 1,
                    fontWeight: 'bold',
                    bgcolor: 'action.selected',
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <IconButton
                    size='small'
                    sx={{
                      bgcolor: 'error.light',
                      color: 'error.main',
                      '&:hover': { bgcolor: 'error.main', color: 'white' },
                    }}
                  >
                    <span className='material-symbols-outlined' style={{ fontSize: 16 }}>
                      notifications_off
                    </span>
                  </IconButton>
                  <Typography variant='caption' color='text.secondary'>
                    Bỏ theo dõi
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} color='inherit'>
          Đóng
        </Button>
        <Button
          variant='contained'
          onClick={onClose}
          startIcon={<span className='material-symbols-outlined'>check</span>}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
