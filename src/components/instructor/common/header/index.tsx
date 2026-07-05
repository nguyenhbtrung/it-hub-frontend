'use client';

import { Suspense, useState } from 'react';
import { AppBar, Toolbar, Button, InputBase, Box, Paper } from '@mui/material';
import { Search, School } from '@mui/icons-material';
import Link from '@/components/common/Link';
import { ApiResponse } from '@/lib/api';
import InstructorProfileMenu from './instructorProfileMenu';
import { useRouter } from 'next/navigation';

interface Props {
  profilePromise: Promise<ApiResponse<any>>;
}

export default function Header({ profilePromise }: Props) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (search.trim()) {
      router.push(`/instructor/courses?q=${encodeURIComponent(search.trim())}`);
    } else {
      router.push(`/instructor/courses`);
    }
  };

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
            component='form'
            onSubmit={handleSearchSubmit}
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
            <Button type='submit' sx={{ minWidth: 'auto', p: 0, mr: 1, color: 'text.secondary' }}>
              <Search sx={{ fontSize: 20 }} />
            </Button>

            <InputBase
              placeholder='Tìm kiếm khoá học...'
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

          <Suspense>
            <InstructorProfileMenu profilePromise={profilePromise} />
          </Suspense>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
