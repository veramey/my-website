/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.GITHUB_PAGES ? '/my-website' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
