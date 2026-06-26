import AuthForm from '@/components/auth/AuthForm';
import { Typography } from '@mui/material';

export default function ForgotPasswordPage() {
  return (
    <>
      <Typography variant='h3' mb={4} mx={{ xs: 0, md: 2, lg: 4, xl: 6 }}>
        Quên mật khẩu
      </Typography>

      <AuthForm type='forgot' />
    </>
  );
}
