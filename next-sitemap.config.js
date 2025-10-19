/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://applecidervinegar.com.ua',
  generateRobotsTxt: true, // генерирует robots.txt
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.8,
  exclude: ['/admin'], // например, если у тебя есть админка Payload
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin'] },
    ],
  },
}
