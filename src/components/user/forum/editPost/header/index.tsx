'use client';

import { AppBar, Toolbar, Box, Typography, Button, IconButton, useTheme, useMediaQuery, Divider } from '@mui/material';
import { ArrowBack as ArrowBackIcon, Send as SendIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function EditPostHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handleBack}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
            title='Quay lại Diễn đàn'
          >
            <ArrowBackIcon />
          </IconButton>

          <Divider orientation='vertical' variant='middle' flexItem />

          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              fontSize: { xs: '1.125rem', md: '1.25rem' },
            }}
          >
            Tạo bài viết mới
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant='text'
            sx={{
              display: { xs: 'none', sm: 'flex' },
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            Lưu nháp
          </Button>

          <Button
            variant='contained'
            startIcon={<SendIcon />}
            sx={{
              px: 3,
              fontWeight: 'bold',
              boxShadow: 1,
              '&:hover': {
                boxShadow: 2,
              },
            }}
          >
            {isMobile ? 'Đăng' : 'Đăng bài'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
