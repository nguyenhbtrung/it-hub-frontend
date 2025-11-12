import { Box, Typography, Button, Grid, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Box
      component='section'
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },
        // background: 'linear-gradient(to bottom right, #E3F2FD, #E8EAF6)',
        backgroundColor: 'hero.light',
      }}
    >
      <Grid
        container
        spacing={8}
        alignItems='center'
        justifyContent='center'
        sx={{ px: { xs: 3, md: 10 }, maxWidth: '1600px', mx: 'auto' }}
      >
        {/* LEFT CONTENT */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4}>
            {/* Tag */}
            <Box>
              <Box
                sx={{
                  display: 'inline-block',
                  bgcolor: 'hero.dark',
                  color: 'hero.contrastText',
                  px: 2,
                  py: 1,
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                Không gian học tập & chia sẻ dành riêng cho sinh viên CNTT
              </Box>
            </Box>

            {/* Heading */}
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '2.25rem', md: '3.5rem' },
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              Học Công Nghệ Thông Tin{' '}
              <Box component='span' sx={{ color: 'primary.main' }}>
                Hiệu Quả
              </Box>{' '}
              Hơn
            </Typography>

            {/* Subheading */}
            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
                fontSize: '1.1rem',
                maxWidth: 600,
              }}
            >
              Tham gia khóa học chuyên sâu, trao đổi kiến thức cùng cộng đồng, thử sức với các cuộc thi lập trình và
              nhận hỗ trợ từ trợ lý AI thông minh.
            </Typography>

            {/* Buttons */}
            <Stack direction='row' spacing={2} flexWrap='wrap'>
              <Button
                size='large'
                variant='contained'
                endIcon={<ArrowForwardIcon />}
                sx={{ fontWeight: 600, borderRadius: 3, px: 3 }}
              >
                Bắt đầu học ngay
              </Button>
              {/* <Button
                size='large'
                variant='outlined'
                startIcon={<PlayArrowIcon />}
                sx={{ fontWeight: 600, borderRadius: 3, px: 3 }}
              >
                Xem demo
              </Button> */}
            </Stack>

            {/* Stats */}
            {/* <Stack direction='row' spacing={6} pt={2}>
              {[
                { label: 'Khóa học', value: '500+' },
                { label: 'Sinh viên', value: '10K+' },
                { label: 'Cuộc thi', value: '50+' },
              ].map((item) => (
                <Box key={item.label}>
                  <Typography variant='h4' sx={{ color: 'primary.main', fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                  <Typography color='text.secondary'>{item.label}</Typography>
                </Box>
              ))}
            </Stack> */}
          </Stack>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            sx={{
              height: 380,
              borderRadius: 4,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Image
              src='/hero.png'
              alt='Sinh viên CNTT học tập trực tuyến'
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
