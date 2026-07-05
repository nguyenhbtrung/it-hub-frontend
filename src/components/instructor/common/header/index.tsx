'use client';

import { useState } from 'react';
import { AppBar, Toolbar, Avatar, Button, InputBase, Box, Paper } from '@mui/material';
import { Search, School } from '@mui/icons-material';
import Link from '@/components/common/Link';
import { ApiResponse } from '@/lib/api';
import InstructorProfileMenu from './instructorProfileMenu';

interface Props {
  profilePromise: Promise<ApiResponse<any>>;
}

export default function Header({ profilePromise }: Props) {
  const [search, setSearch] = useState('');

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        backgroundColor: 'customBackground.4',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(8px)',
        height: 64,
      }}
    >
      <Toolbar sx={{ px: 4, gap: 4 }}>
        {/* Search Bar */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 384,
              height: 40,
              px: 2,
              borderRadius: 1,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Search sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder='Tìm kiếm...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                flex: 1,
                fontSize: '0.875rem',
                '& input::placeholder': {
                  color: 'text.secondary',
                },
              }}
            />
          </Paper>
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            href={'/'}
            variant='outlined'
            startIcon={<School />}
            sx={{
              height: 40,
              borderColor: 'divider',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'divider',
                backgroundColor: 'action.hover',
              },
            }}
          >
            Trang học viên
          </Button>

          <InstructorProfileMenu profilePromise={profilePromise} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
