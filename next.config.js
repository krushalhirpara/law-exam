/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    domains: ['lowstudy.com'],
  },
  async redirects() {
    return [
      {
        source: '/saurashtra-university/llb/semester-3/:subject/unit-:unitNumber(\\d+)',
        destination: '/saurashtra-university/llb/semester-3/:subject/unit/unit-:unitNumber/',
        permanent: true,
      },
      {
        source: '/saurashtra-university/llb/sem-3/:path*',
        destination: '/saurashtra-university/llb/semester-3/:path*',
        permanent: true,
      },
      {
        source: '/saurashtra-university/llb-3yr/:path*',
        destination: '/saurashtra-university/llb/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
