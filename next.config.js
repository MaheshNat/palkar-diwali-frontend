/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    const experiments = config.experiments || {};
    config.experiments = { ...experiments, asyncWebAssembly: true };
    config.output.assetModuleFilename = "static/[hash][ext]";
    config.output.publicPath = "/_next/";
    config.module.rules.push({
      test: /\.wasm/,
      type: "asset/resource",
    });
    return config;
  },
  output: 'standalone',
};
module.exports = nextConfig;
