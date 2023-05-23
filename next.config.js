module.exports = {
  output: 'standalone',
  experimental: { appDir: false, serverComponentsExternalPackages: ["mongoose"] },
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
  env: {
    devUrl: 'http://localhost:3000',
    prodUrl: 'localhost:3000',
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'media-exp1.licdn.com', 'www.ellitoral.com', "ui-avatars.com", "static.vecteezy.com"],
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
