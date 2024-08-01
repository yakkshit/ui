const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "cdn.cedzlabs.com", "www.cedzlabs.com",
      "www.youtube.com", "www.playbook.com", "prod.spline.design", "static.wixstatic.com"],
  },
};

module.exports = withContentlayer(nextConfig);
