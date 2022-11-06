/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Compression should not even change anything by setting it like this
  compress: true,
  // Disable TrailingSlash Redirects
  trailingSlash: false,
  // powered-by header disable/enable
  poweredByHeader: false,
  // CORS
  crossOrigin: 'anonymous',
  // SourceMaps
  productionBrowserSourceMaps: true,
  // internationalization
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
