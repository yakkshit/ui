const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/next',
  swcMinify: true,
  images: {
    domains: ["localhost", "cdn.cedzlabs.com", "www.cedzlabs.com", "github.com", "dummyjson.com", "static.wixstatic.com", "api.microlink.io", "api.unsplash.com",
      "www.youtube.com", "www.playbook.com", "prod.spline.design", "static.wixstatic.com", "edamam-product-images.s3.amazonaws.com", "media.licdn.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
};

module.exports = withContentlayer(nextConfig);
