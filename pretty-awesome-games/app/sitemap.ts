import type { MetadataRoute } from "next"
import { SITE_URL } from "./lib/brand"

/**
 * Emitted as a static /sitemap.xml at build time. The site is a single page plus
 * two legal pages; `/oauth2redirect` is deliberately absent, matching robots.ts.
 */
const sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date()

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ]
}

export default sitemap
