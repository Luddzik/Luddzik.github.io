/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: "/red-bear-studios",
}

module.exports = nextConfig

