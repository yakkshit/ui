const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "cdn.cedzlabs.com", "www.youtube.com", "www.playbook.com", "prod.spline.design"],
  },
};

module.exports = withContentlayer(nextConfig);
