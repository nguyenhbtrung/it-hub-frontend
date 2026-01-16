import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import 'next-auth/jwt';
import { signInUser } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { refreshAccessToken } from './lib/fetcher/refreshToken';
import { API_BASE_URL, REFRESH_ENDPOINT } from './lib/fetcher/constants';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken?: string;
    role?: string;
  }
  interface Session {
    accessToken: string;
    refreshToken?: string;
    expiresAt: number;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken?: string;
    expiresAt: number;
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log('credential', credentials);
        const res = await signInUser(credentials);
        if (res?.success && res?.data) {
          return {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            role: res.data.user.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    // error: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const decoded = jwtDecode(user.accessToken);
        token.expiresAt = decoded.exp ?? Math.floor(Date.now() / 1000) + 10 * 60;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        return token;
      }

      // if (Date.now() < token.expiresAt * 1000) {
      //   return token;
      // }

      // const res = await fetch(`${API_BASE_URL}${REFRESH_ENDPOINT}`, {
      //   method: 'POST',
      //   credentials: 'include',
      //   cache: 'no-store',
      //   headers: {
      //     Cookie: `refreshToken=${token?.refreshToken || ''}`,
      //   },
      // });

      // const json = await res.json();
      // if (json?.success && json?.data) {
      //   const data = json.data;
      //   console.log('data', data);

      //   const decoded = jwtDecode(data.accessToken);
      //   token.expiresAt = decoded.exp ?? Math.floor(Date.now() / 1000) + 10 * 60;
      //   token.accessToken = data.accessToken;
      //   const setCookieHeader = res.headers.get('set-cookie');
      //   console.log('setCookieHeader', setCookieHeader);
      //   if (setCookieHeader) {
      //     const match = setCookieHeader.match(/refreshToken=([^;]+)/);
      //     if (match) {
      //       console.log('match', match[1]);
      //       token.refreshToken = match[1];
      //     }
      //   }
      // }

      // console.log('token', token);
      return token;
    },
    async session({ session, token }) {
      // console.log('session-token', token);
      session.expiresAt = token.expiresAt;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.role = token.role;
      // console.log('session-session', session);
      return session;
    },
  },
});
