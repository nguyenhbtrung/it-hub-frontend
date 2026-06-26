import AuthForm from '@/components/auth/AuthForm';
import { Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <>
      <Typography variant='h3' mb={4} mx={{ xs: 0, md: 2, lg: 4, xl: 6 }}>
        Chào mừng trở lại
      </Typography>

      <AuthForm type='login' />
    </>
  );
}
