import AuthForm from '@/components/auth/AuthForm';
import { Box, Typography, Paper } from '@mui/material';

export default function RegisterPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper sx={{ p: 5, maxWidth: 450, width: '100%' }} elevation={3}>
        <Typography variant='h4' fontWeight={700} textAlign='center' mb={4}>
          Đăng ký tài khoản
        </Typography>

        <AuthForm type='signup' />
      </Paper>
    </Box>
  );
}
