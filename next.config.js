/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_DB_URL: '_DB_URL'
  },
}

module.exports = nextConfig;
