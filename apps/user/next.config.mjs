import path, { dirname } from "path";
import { fileURLToPath } from "url";

import withPWA from "next-pwa";

// eslint-disable-next-line no-undef
const isProd = process.env.NODE_ENV === "production";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pwaConfig = withPWA({
  dest: "public",
  disable: !isProd,
  runtimeCaching: [],
  register: true,
  skipWaiting: true,
  clientsClaim: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@5unwan/ui"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@ui": path.resolve(__dirname, "../../packages/ui/src"), // __dirname 사용
    };

    return config;
  },
};

export default pwaConfig(nextConfig);
