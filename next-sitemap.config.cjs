// next-sitemap.config.cjs
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://applecidervinegar.com.ua',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.8,

  // 1) ИСКЛЮЧАЕМ checkout из sitemap.xml
  exclude: ['/admin', '/checkout', '/checkout/*'],

  // 2) НАСТРАИВАЕМ robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin', '/checkout', '/checkout/*'],
      },
    ],
  },
}
