'use cache';
import { Box, Typography, Container, Link } from '@mui/material';

export default async function Footer() {
  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper', py: 4 }}>
      <Container maxWidth='lg'>
        <Typography variant='body2' color='text.secondary' align='center'>
          © {new Date().getFullYear()} IT Learning Platform. Tất cả quyền được bảo lưu.
        </Typography>
        <Typography variant='body2' color='text.secondary' align='center' mt={1}>
          <Link href='/about' underline='hover'>
            Giới thiệu
          </Link>{' '}
          ·{' '}
          <Link href='/contact' underline='hover'>
            Liên hệ
          </Link>{' '}
          ·{' '}
          <Link href='/privacy' underline='hover'>
            Chính sách bảo mật
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
