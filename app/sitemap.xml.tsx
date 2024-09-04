import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseUrl = 'https://ui.cedzlabs.com'

  // Dynamically generate the sitemap entries
  const sitemapEntries = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Add more entries dynamically
  ]

  // Convert the entries to XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries
        .map(entry => `
          <url>
            <loc>${entry.url}</loc>
            <lastmod>${entry.lastModified}</lastmod>
            <changefreq>${entry.changeFrequency}</changefreq>
            <priority>${entry.priority}</priority>
          </url>
        `)
        .join('')}
    </urlset>`

  // Set the Content-Type header and return the XML
  context.res.setHeader('Content-Type', 'text/xml')
  context.res.write(sitemap)
  context.res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
