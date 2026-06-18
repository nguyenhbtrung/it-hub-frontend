'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  courseId: string;
}

export default function Header({ title, courseId }: HeaderProps) {
  const router = useRouter();
  return (
    <Box
      component='header'
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        width: '100%',
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        px: { xs: 2, md: 3 },
        py: 1.5,
      }}
    >
      <Stack direction='row' alignItems='center' spacing={2}>
        {/* <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography>Quay lại Quản lý bài tập</Typography> */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(`/instructor/courses/${courseId}/edit/exercises`)}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'primary.main', bgcolor: 'transparent', boxShadow: 'none' },
          }}
        >
          Quay lại Quản lý bài tập
        </Button>
        <Divider orientation='vertical' variant='middle' flexItem />
        <Typography variant='h6' fontWeight='bold' noWrap>
          Bài tập: {title || 'Không có tiêu đề'}
        </Typography>
      </Stack>
    </Box>
  );
}
