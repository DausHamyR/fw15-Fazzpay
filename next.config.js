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
          pathname: '/dxs0yxeyr/image/upload/v1686241563/fazzpay-master/**',
        },
      ],
    },
}

module.exports = nextConfig
