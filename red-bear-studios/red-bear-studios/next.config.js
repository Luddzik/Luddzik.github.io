/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/red-bear-studios",
  assetPrefix: "/red-bear-studios/",
}

module.exports = nextConfig

