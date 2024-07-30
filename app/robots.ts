import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: '/private/',
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        allow: ['/'],
        disallow: '/private/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
    ],
    sitemap: 'https://ui.cedzlabs.com/sitemap.xml',
  }
}
