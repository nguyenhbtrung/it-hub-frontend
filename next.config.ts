import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL('https://img-c.udemycdn.com/**'),
      new URL('https://picsum.photos/**'),
      new URL('https://lh3.googleusercontent.com/**'),
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
