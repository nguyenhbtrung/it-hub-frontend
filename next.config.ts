import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('https://img-c.udemycdn.com/**')],
  },
};

export default nextConfig;
