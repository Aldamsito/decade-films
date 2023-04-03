/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/repository-name' : '',
  images: {
    domains: ["image.tmdb.org"],
  }
}

module.exports = nextConfig
