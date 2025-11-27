import 'server-only';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { cache } from 'react';
import { jwtPayload } from '@/types/jwt';

export const verifySession = cache(async () => {
  const token = (await cookies()).get('accessToken')?.value;
  let session: jwtPayload | null = null;

  if (token) {
    try {
      session = jwtDecode(token);
    } catch (err) {
      console.error('Invalid JWT:', err);
      session = null;
    }
  }

  return session;
});
