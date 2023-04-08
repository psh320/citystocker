/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: "export",
};

module.exports = nextConfig;
