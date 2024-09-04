import { NextResponse } from 'next/server';
import { docsConfig } from '@/config/docs';

export const runtime = 'edge';

export default function sitemap() {
  const baseUrl = 'https://ui.cedzlabs.com';

  type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: 'weekly';
    priority: number;
  };

  const createEntry = (path: string, priority: number = 0.8): SitemapEntry => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority,
  });

  const getUrlsFromConfig = (): SitemapEntry[] => {
    const urls: SitemapEntry[] = [];

    docsConfig.mainNav.forEach(item => {
      if (item.href) {
        urls.push(createEntry(item.href));
      }
    });

    docsConfig.sidebarNav.forEach(section => {
      section.items?.forEach(item => {
        if (item.href) {
          urls.push(createEntry(item.href));
        }
        item.items?.forEach(subItem => {
          if (subItem.href) {
            urls.push(createEntry(subItem.href));
          }
        });
      });
    });

    return urls;
  };

  const sitemapEntries = getUrlsFromConfig();

  const sitemapXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries
        .map(
          entry => `
            <url>
              <loc>${entry.url}</loc>
              <lastmod>${entry.lastModified.toISOString()}</lastmod>
              <changefreq>${entry.changeFrequency}</changefreq>
              <priority>${entry.priority}</priority>
            </url>
          `
        )
        .join('')}
    </urlset>
  `;

  return NextResponse.json({
    sitemap: sitemapXml
  }, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
