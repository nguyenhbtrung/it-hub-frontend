'use client';

import { AppBar, Toolbar, IconButton, Typography, Box, Divider, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import { useRouter } from 'next/navigation';

export default function CourseHeader() {
  const router = useRouter();

  return (
    <AppBar
      position='static'
      color='inherit'
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        height: 64,
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => router.back()}
            title='Quay lại Quản lý Khóa học'
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Divider orientation='vertical' flexItem />
          <Box>
            <Typography variant='caption' color='text.secondary'>
              Chỉnh sửa khóa học
            </Typography>
            <Typography variant='subtitle1' fontWeight='semibold'>
              Lập trình Web Frontend Nâng cao
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
          <Button
            variant='outlined'
            endIcon={<VisibilityIcon />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.primary',
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            Xem trước
          </Button>
          <Button
            variant='contained'
            endIcon={<SaveIcon />}
            sx={{
              bgcolor: 'primary.main',
              fontWeight: 'bold',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            Lưu thay đổi
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
