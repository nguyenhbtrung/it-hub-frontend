'use client';

import { AppBar, Toolbar, IconButton, Typography, Box, Divider, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useParams, useRouter } from 'next/navigation';

interface EditStepHeaderProps {
  title: string;
  onSave: () => void;
}

export default function EditStepHeader({ title, onSave }: EditStepHeaderProps) {
  const { id } = useParams();
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
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
            onClick={handleGoBack}
            title='Quay lại'
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
              Chỉnh sửa bài giảng
            </Typography>
            <Typography variant='subtitle1' fontWeight='semibold'>
              {title}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
          <Button
            onClick={onSave}
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
