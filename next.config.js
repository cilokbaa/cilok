/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  experimental: {
    swcLoader: true,
    swcFileReading: true,
    forceSwcTransforms: false
  }
};

module.exports = nextConfig;
