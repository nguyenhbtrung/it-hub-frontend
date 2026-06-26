'use client';

import { getSession, signIn } from 'next-auth/react';
import { AuthFormProps } from '@/types/auth';
import { Box, TextField, Button, Link, Stack, InputAdornment, IconButton } from '@mui/material';
import { Suspense, useState } from 'react';
import { useNotification } from '@/contexts/notificationContext';
import { useRouter } from 'next/navigation';
import AuthNotify from './AuthNotify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { getAuthErrorMessage, signUpAction } from '@/features/auth';
import { getErrorMessage } from '@/lib/errors';

export default function AuthForm({ type }: AuthFormProps) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { notify } = useNotification();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const email = form.email.trim();
    const password = form.password.trim();

    if (type === 'login') {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        if (res?.error === 'CredentialsSignin' && res?.code === 'credentials') {
          notify('error', 'Email hoặc mật khẩu không đúng', { vertical: 'top', horizontal: 'center' });
          setSubmitting(false);
        } else {
          const session = await getSession();
          if (session?.role === 'admin') window.location.href = '/admin';
          else window.location.href = '/';
        }
      } else {
        notify('error', 'Đăng nhập thất bại', { vertical: 'top', horizontal: 'center' });
        setSubmitting(false);
      }
    }
    if (type === 'signup') {
      if (form.password !== form.confirmPassword) {
        notify('error', 'Mật khẩu không khớp', { vertical: 'top', horizontal: 'center' });
        setSubmitting(false);
        return;
      }

      const result = await signUpAction({
        email,
        password,
      });

      if (result?.success) {
        notify('success', 'Đăng ký tài khoản thành công', { vertical: 'top', horizontal: 'center' });
        router.push('/auth/login');
      } else {
        notify('error', getErrorMessage(result, getAuthErrorMessage), { vertical: 'top', horizontal: 'center' });
      }
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Suspense>
        <AuthNotify />
      </Suspense>
      <Box component='form' onSubmit={handleSubmit} px={{ xs: 0, md: 2, lg: 4, xl: 6 }}>
        <Stack spacing={3}>
          {/* EMAIL */}
          <TextField label='Email' name='email' value={form.email} onChange={handleChange} />

          {/* PASSWORD: login + register */}
          {(type === 'login' || type === 'signup') && (
            <TextField
              label='Mật khẩu'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}

          {/* CONFIRM PASSWORD: register */}
          {type === 'signup' && (
            <TextField
              label='Xác nhận mật khẩu'
              name='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge='end'>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}

          {/* BUTTON */}
          <Button variant='contained' size='large' type='submit' loading={submitting}>
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
    </Box>
  );
}
