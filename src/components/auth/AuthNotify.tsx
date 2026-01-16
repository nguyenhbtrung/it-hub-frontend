'use client';

import { useNotification } from '@/contexts/notificationContext';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthNotify() {
  const searchParams = useSearchParams();
  const { notify } = useNotification();

  useEffect(() => {
    const error = searchParams.get('error');
    const code = searchParams.get('code');
    if (error === 'CredentialsSignin' && code === 'credentials') {
      notify('error', 'Email hoặc mật khẩu không đúng', { vertical: 'top', horizontal: 'center' });
    }
  }, [searchParams, notify]);
  return null;
}
