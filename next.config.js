/** @type {import('next').NextConfig} */
const { images } = require('next/image');

const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/dxs0yxeyr/image/upload/**',
        },
      ],
    },
}

module.exports = nextConfig
