/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

const nextConfig = {
  output: "export",
  basePath: (isProd && !isVercel) ? "/Portfolio" : "",
  assetPrefix: (isProd && !isVercel) ? "/Portfolio/" : "",
  images: {
    unoptimized: true,
  },
  env: {
    VERCEL: process.env.VERCEL || "",
  },
};

export default nextConfig;
