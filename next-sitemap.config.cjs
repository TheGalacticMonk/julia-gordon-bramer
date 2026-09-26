const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'
const NORMALIZED_SITE_URL = SITE_URL.replace(/\/+$/, '')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: NORMALIZED_SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/blog/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${NORMALIZED_SITE_URL}/pages-sitemap.xml`,
      `${NORMALIZED_SITE_URL}/posts-sitemap.xml`,
    ],
    // Keep this output deliberately minimal and standards-compliant. The default
    // builder adds an optional Host line, and malformed host/sitemap lines are
    // rejected by some crawlers and Lighthouse.
    transformRobotsTxt: async () =>
      [
        'User-agent: *',
        'Disallow: /admin/',
        '',
        `Sitemap: ${NORMALIZED_SITE_URL}/sitemap.xml`,
        `Sitemap: ${NORMALIZED_SITE_URL}/pages-sitemap.xml`,
        `Sitemap: ${NORMALIZED_SITE_URL}/posts-sitemap.xml`,
        '',
      ].join('\n'),
  },
}
