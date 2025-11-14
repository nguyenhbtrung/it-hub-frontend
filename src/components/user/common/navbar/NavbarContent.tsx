import { Toolbar, Typography, Button, Box } from '@mui/material';
import Link from '@/components/common/Link';

const navButtonSx = {
  color: 'text.primary',
  fontWeight: 500,
  '&:hover': {
    color: 'primary.dark',
  },
};

export default function NavbarContent() {
  console.log('nav content');
  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant='h6' color='primary'>
        IT Hub
      </Typography>
      <Box display='flex' gap={2}>
        <Button component={Link} href='/' sx={navButtonSx}>
          Trang chủ
        </Button>
        <Button component={Link} href='/courses' sx={navButtonSx}>
          Khoá học
        </Button>
        <Button component={Link} href='/competitions' sx={navButtonSx}>
          Cuộc thi
        </Button>
        <Button component={Link} href='/forum' sx={navButtonSx}>
          Diễn đàn
        </Button>
        <Button component={Link} href='/login' variant='contained'>
          Đăng nhập
        </Button>
      </Box>
    </Toolbar>
  );
}
