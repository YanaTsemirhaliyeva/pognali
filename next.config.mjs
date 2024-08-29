/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: isProd ? '/pognali' : '',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
