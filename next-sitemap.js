/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://facerea.ro',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000,             // The maximum number of entries per sitemap
  changefreq: 'weekly',          // Indicates how often the content at a URL is likely to change
  priority: 0.7,                 // Indicates the priority of URLs on your site
  exclude: ['/admin/*', '/login'], // Paths to exclude from the sitemap
};