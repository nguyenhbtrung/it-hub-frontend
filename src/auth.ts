import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import 'next-auth/jwt';
import { signInUser } from './services/auth.service';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    role?: string;
  }
  interface Session {
    accessToken: string;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const res = await signInUser(credentials);
        if (res?.success && res?.data) {
          return {
            accessToken: res.data.accessToken,
            // role: data.data.user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        // token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      // session.role = token.role;

      return session;
    },
  },

  // ... cấu hình khác
});
