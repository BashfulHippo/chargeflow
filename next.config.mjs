/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel automatically handles output mode, no need for 'standalone'

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Optimize images (no external domains needed for this project)
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production (keep errors/warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

export default nextConfig;
