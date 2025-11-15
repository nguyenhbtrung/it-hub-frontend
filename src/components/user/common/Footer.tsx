'use cache';
import { Box, Grid, Typography, Link, Divider, Stack } from '@mui/material';

export default async function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        mt: 10,
        pt: 8,
        pb: 4,
        backgroundColor: 'footer.background',
        color: 'text.secondary',
      }}
    >
      <Grid container spacing={6} px={{ xs: 3, md: 10 }} justifyContent='space-between'>
        {/* ===== Branding ===== */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography variant='h6' fontWeight={700} color='text.primary' gutterBottom>
            IT Hub
          </Typography>
          <Typography variant='body2' sx={{ maxWidth: 260 }}>
            Nền tảng học tập trực tuyến dành cho sinh viên Công Nghệ Thông Tin: khoá học chất lượng, cuộc thi thực chiến
            và diễn đàn năng động.
          </Typography>
        </Grid>

        {/* ===== Column 1 ===== */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            Khám phá
          </Typography>
          <Stack spacing={1}>
            <Link href='/courses' underline='hover' color='text.secondary'>
              Khóa học
            </Link>
            <Link href='/competitions' underline='hover' color='text.secondary'>
              Cuộc thi
            </Link>
            <Link href='/forum' underline='hover' color='text.secondary'>
              Diễn đàn
            </Link>
            <Link href='/assistant' underline='hover' color='text.secondary'>
              Trợ lý học tập
            </Link>
          </Stack>
        </Grid>

        {/* ===== Column 2 ===== */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            Dành cho người học
          </Typography>
          <Stack spacing={1}>
            <Link href='/profile' underline='hover' color='text.secondary'>
              Hồ sơ cá nhân
            </Link>
            <Link href='/learning-paths' underline='hover' color='text.secondary'>
              Lộ trình học
            </Link>
            <Link href='/my-courses' underline='hover' color='text.secondary'>
              Khóa học của tôi
            </Link>
            <Link href='/certificates' underline='hover' color='text.secondary'>
              Chứng chỉ
            </Link>
          </Stack>
        </Grid>

        {/* ===== Column 3 ===== */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            Dành cho giảng viên
          </Typography>
          <Stack spacing={1}>
            <Link href='/instructor/apply' underline='hover' color='text.secondary'>
              Trở thành giảng viên
            </Link>
            <Link href='/instructor/dashboard' underline='hover' color='text.secondary'>
              Bảng điều khiển giảng viên
            </Link>
            <Link href='/instructor/resources' underline='hover' color='text.secondary'>
              Tài nguyên giảng dạy
            </Link>
          </Stack>
        </Grid>

        {/* ===== Column 4 ===== */}
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Typography variant='subtitle1' fontWeight={600} gutterBottom>
            Về chúng tôi
          </Typography>
          <Stack spacing={1}>
            <Link href='/about' underline='hover' color='text.secondary'>
              Giới thiệu
            </Link>
            <Link href='/contact' underline='hover' color='text.secondary'>
              Liên hệ
            </Link>
            <Link href='/privacy' underline='hover' color='text.secondary'>
              Chính sách bảo mật
            </Link>
            <Link href='/terms' underline='hover' color='text.secondary'>
              Điều khoản sử dụng
            </Link>
          </Stack>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 4, mx: { xs: 3, md: 10 } }} />

      {/* Bottom footer */}
      <Box
        px={{ xs: 3, md: 10 }}
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        gap={2}
      >
        <Typography variant='body2' color='text.secondary'>
          © {new Date().getFullYear()} IT Hub. All rights reserved.
        </Typography>

        <Stack direction='row' spacing={3}>
          <Link href='/privacy' underline='hover' color='text.secondary'>
            Chính sách bảo mật
          </Link>
          <Link href='/terms' underline='hover' color='text.secondary'>
            Điều khoản
          </Link>
          <Link href='/help' underline='hover' color='text.secondary'>
            Trung tâm trợ giúp
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
