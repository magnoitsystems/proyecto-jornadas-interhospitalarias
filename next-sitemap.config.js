/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://proyecto-jornadas-interhospitalaria.vercel.app/', 
  generateRobotsTxt: true,                     
  sitemapSize: 7000,
  changefreq: 'daily',                         
  outDir: './public',                          
  robotsTxtOptions: {
    policies: [
      { userAgent: '*' , allow: '/' }
    ]
  },
};

export default config;
