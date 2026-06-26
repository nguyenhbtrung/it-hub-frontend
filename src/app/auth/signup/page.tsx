import AuthForm from '@/components/auth/AuthForm';
import { Typography } from '@mui/material';

export default function RegisterPage() {
  return (
    <>
      <Typography variant='h3' mb={4} mx={{ xs: 0, md: 2, lg: 4, xl: 6 }}>
        Tham gia học, giảng dạy tại IT Hub
      </Typography>

      <AuthForm type='signup' />
    </>
  );
}
