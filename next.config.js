/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "*", "avatars.githubusercontent.com", "cloudflare-ipfs.com", "picsum.photos"],
  },
  async rewrites() {
    return [
      {
        source: "/upload/:slug",
        destination: "http://localhost:9090/upload/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
