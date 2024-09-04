import { NextResponse } from 'next/server';
import { MetadataRoute } from 'next';
import { docsConfig } from '@/config/docs';

export const runtime = 'edge';

export default function sitemap(): MetadataRoute.Sitemap {
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
      if (section.items) {
        section.items.forEach(item => {
          if (item.href) {
            urls.push(createEntry(item.href));
          }
          item.items?.forEach(subItem => {
            if (subItem.href) {
              urls.push(createEntry(subItem.href));
            }
          });
        });
      }
    });

    return urls;
  };

  const sitemapEntries = getUrlsFromConfig();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...sitemapEntries,
  ];
}

export async function GET() {
  const sitemapEntries = sitemap();
  return NextResponse.json(sitemapEntries, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
