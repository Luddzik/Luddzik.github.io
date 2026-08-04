import type { MetadataRoute } from "next"
import { SITE_URL } from "./lib/brand"

/** Emitted as a static /robots.txt at build time by the export. */
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    /* Nothing user-facing lives here; it only exists to complete an OAuth redirect. */
    disallow: "/oauth2redirect",
  },
  sitemap: `${SITE_URL}/sitemap.xml`,
})

export default robots
