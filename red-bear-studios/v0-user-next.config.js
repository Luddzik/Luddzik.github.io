/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ensure that the base path is set correctly for GitHub Pages
  basePath: "/red-bear-studios",
}

module.exports = nextConfig

