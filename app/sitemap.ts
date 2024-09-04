import { MetadataRoute } from 'next';
import { docsConfig } from '@/config/docs'; // Adjust the import path as needed

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ui.cedzlabs.com';

  // Define the type for the URL entries
  type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: 'weekly';
    priority: number;
  };

  // Function to create sitemap entries for a given URL
  const createEntry = (path: string, priority: number = 0.8): SitemapEntry => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority,
  });

  // Function to extract URLs from the docsConfig
  const getUrlsFromConfig = (): SitemapEntry[] => {
    const urls: SitemapEntry[] = [];

    // Add mainNav items
    docsConfig.mainNav.forEach(item => {
      if (item.href) {
        urls.push(createEntry(item.href));
      }
    });

    // Add sidebarNav items
    docsConfig.sidebarNav.forEach(section => {
      if (section.href) urls.push(createEntry(section.href));

      section.items?.forEach(subItem => {
        if (subItem.href) urls.push(createEntry(subItem.href));

        subItem.items?.forEach(subSubItem => {
          if (subSubItem.href) urls.push(createEntry(subSubItem.href));
        });
      });
    });

    return urls;
  };

  // Create the sitemap entries
  const sitemapEntries = getUrlsFromConfig();

  // Include the base URL as a main entry
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
