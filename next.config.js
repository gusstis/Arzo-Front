module.exports = {
  assetPrefix:'https://aram.com.ar',
  output: 'standalone',
  experimental: { appDir: false, serverComponentsExternalPackages: ["mongoose"] },
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
  env: {
    devUrl: 'http://localhost:3000',
    prodUrl: 'https://aram.com.ar',
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'media-exp1.licdn.com', 'www.ellitoral.com', "ui-avatars.com", "static.vecteezy.com"],
    unoptimized: true,
  },
  reactStrictMode: true,
};

/*
// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig/*,
{
images: {
  domains: ['avatars.githubusercontent.com/*', 'localhost']
}}
*/
