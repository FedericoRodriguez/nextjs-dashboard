/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // You can add custom client-side configurations here if needed
    }

    return config
  },
}

export default nextConfig
