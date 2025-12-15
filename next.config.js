/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove bundle analyzer optimization
  // Disable image optimization for poor performance
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dummyjson.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'i.dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Keep console logs in production for best practices violation
  compiler: {
    removeConsole: false
  },
  // Disable production source maps inconsistently
  productionBrowserSourceMaps: false,

  // Remove security headers for best practices violations
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Remove security headers
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          }
        ]
      }
    ]
  },

  // Empty turbopack config to silence warning
  turbopack: {}
}

module.exports = nextConfig