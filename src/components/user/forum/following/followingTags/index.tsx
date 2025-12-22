'use client';

import { Paper, Typography, Box, TextField, InputAdornment, Grid, Button, IconButton, Chip } from '@mui/material';
import { useState } from 'react';
import ViewAllTagsDialog from '../viewAllTagsDialog';
import { Tag } from '../types';
import NotificationsOff from '@mui/icons-material/NotificationsOff';
import SearchIcon from '@mui/icons-material/Search';

interface FollowingTagsProps {
  tags: Tag[];
  totalTags: number;
}

export default function FollowingTags({ tags, totalTags }: FollowingTagsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          mb: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 3,
            pb: 3,
            borderBottom: '1px solid',
            borderColor: 'divider',
            gap: 2,
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            Tags đang theo dõi
          </Typography>
          <TextField
            placeholder='Tìm tags...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size='small'
            sx={{ width: { xs: '100%', sm: 256 } }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon color='action' />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Tags Grid */}
        <Grid container spacing={2}>
          {filteredTags.map((tag) => (
            <Grid size={{ xs: 12, sm: 6 }} key={tag.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    boxShadow: 1,
                  },
                  transition: 'all 0.2s',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip
                    label={`#${tag.name}`}
                    size='small'
                    sx={{
                      width: 'fit-content',
                      bgcolor: 'action.hover',
                      color: 'text.primary',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      },
                    }}
                    clickable
                  />
                  <Typography variant='caption' color='text.secondary'>
                    {tag.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    {tag.hasNewPosts ? (
                      <>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                            animation: 'pulse 1.5s infinite',
                          }}
                        />
                        <Typography variant='caption' color='success.main' fontWeight='medium'>
                          {tag.newPosts} bài viết mới tuần này
                        </Typography>
                      </>
                    ) : (
                      <Typography variant='caption' color='text.secondary'>
                        {tag.newPosts > 0 ? `${tag.newPosts} bài viết mới tuần này` : 'Không có bài viết mới'}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <IconButton
                  size='small'
                  sx={{
                    bgcolor: 'hero.main',
                    color: 'primary.main',
                    borderRadius: 0.5,
                  }}
                  title='Bỏ theo dõi'
                >
                  <NotificationsOff />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* View All Button */}
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Button
            onClick={() => setDialogOpen(true)}
            sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}
          >
            Xem tất cả {totalTags} tags
          </Button>
        </Box>
      </Paper>

      {/* Dialog */}
      <ViewAllTagsDialog open={dialogOpen} onClose={() => setDialogOpen(false)} totalTags={totalTags} />
    </>
  );
}
