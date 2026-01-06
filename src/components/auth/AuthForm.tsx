'use client';

import { signIn } from 'next-auth/react';
import { AuthFormProps } from '@/types/auth';
import { Box, TextField, Button, Link, Stack } from '@mui/material';
import { useState } from 'react';
import { useNotification } from '@/contexts/notificationContext';
import { SignUp } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type }: AuthFormProps) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { notify } = useNotification();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (type === 'login') {
      await signIn('credentials', {
        email: form.email,
        password: form.password,
        callbackUrl: '/',
      });
    }
    if (type === 'signup') {
      if (form.password !== form.confirmPassword) {
        notify('error', 'Mật khẩu không khớp', { vertical: 'top', horizontal: 'right' });
        return;
      }
      const res = await SignUp({
        email: form.email,
        password: form.password,
      });
      if (res?.success) {
        notify('success', 'Đăng ký tài khoản thành công', { vertical: 'top', horizontal: 'right' });
        router.push('/auth/login');
      } else {
        notify('error', res?.error?.message || 'Đăng ký tài khoản thất bại', { vertical: 'top', horizontal: 'right' });
        console.log('res', res);
      }
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        {/* EMAIL */}
        <TextField label='Email' name='email' fullWidth value={form.email} onChange={handleChange} />

        {/* PASSWORD: login + register */}
        {(type === 'login' || type === 'signup') && (
          <TextField
            label='Mật khẩu'
            name='password'
            type='password'
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
        )}

        {/* CONFIRM PASSWORD: register */}
        {type === 'signup' && (
          <TextField
            label='Xác nhận mật khẩu'
            name='confirmPassword'
            type='password'
            fullWidth
            value={form.confirmPassword}
            onChange={handleChange}
          />
        )}

        {/* BUTTON */}
        <Button variant='contained' size='large' fullWidth onClick={handleSubmit}>
          {type === 'login' ? 'Đăng nhập' : type === 'signup' ? 'Đăng ký' : 'Gửi yêu cầu đặt lại mật khẩu'}
        </Button>

        {/* EXTRA LINKS */}
        {type === 'login' && (
          <Stack direction='row' justifyContent='space-between'>
            <Link href='/auth/forgot-password'>Quên mật khẩu?</Link>
            <Link href='/auth/signup'>Tạo tài khoản</Link>
          </Stack>
        )}

        {type === 'signup' && (
          <Stack direction='row' justifyContent='space-between'>
            <Link href='/auth/login'>Đã có tài khoản? Đăng nhập</Link>
          </Stack>
        )}

        {type === 'forgot' && (
          <Stack direction='row' justifyContent='center'>
            <Link href='/auth/login'>Quay lại đăng nhập</Link>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
