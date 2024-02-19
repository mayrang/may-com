/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "*", "avatars.githubusercontent.com", "cloudflare-ipfs.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
