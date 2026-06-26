import { Box, Typography, Paper, Stack } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Link from '@/components/common/Link';
import LoginInstruction from '@/components/auth/LoginInstruction';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url("/images/auth/login_background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: {
            xs: 'none',
            md: 'flex',
          },
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'rgba(6,41,73,0.65)',
            color: 'white',
            p: 4,
            borderRadius: 1,
            maxWidth: 600,
          }}
        >
          <LoginInstruction />
        </Paper>
      </Box>

      <Box
        sx={{
          flex: 1,
          justifyContent: { xs: 'flex-start', md: 'center' },
          display: 'flex',
          flexDirection: 'column',
          py: 4,
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Stack
          component={Link}
          href='/'
          direction='row'
          spacing={0.5}
          alignItems='center'
          sx={{
            width: 'fit-content',
            mb: 3,
            mx: { xs: 0, md: 2, lg: 4, xl: 6 },
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <HomeOutlinedIcon fontSize='small' />
          <Typography variant='body2'>Quay lại trang chủ</Typography>
        </Stack>

        {children}

        <Box my={4} display={{ xs: 'block', md: 'none' }}>
          <LoginInstruction />
        </Box>
      </Box>
    </Box>
  );
}
