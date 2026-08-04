/**
 * Single source of truth for brand strings, so a change to the studio name or
 * contact address doesn't have to be chased through the legal pages.
 */
export const STUDIO_NAME = "Iskra Games"

/**
 * The registered domain. This is the *mail* domain and the brand name — it is
 * deliberately not the site's canonical host.
 */
export const SITE_DOMAIN = "iskragames.com"

/**
 * Canonical site host, and it is `www`.
 *
 * GitHub Pages is configured with `www.iskragames.com` as the custom domain, so
 * the apex 301-redirects to `www`. Everything derived from this — `metadataBase`,
 * `og:url`, `sitemap.xml`, the `robots.txt` sitemap line — has to match the host
 * that actually serves, or every canonical URL points at a redirect.
 *
 * If the custom domain is ever moved to the apex in repo Settings → Pages, drop
 * the `www.` here in the same change.
 */
export const SITE_HOST = `www.${SITE_DOMAIN}`

export const SITE_URL = `https://${SITE_HOST}`

/** Mail lives on the apex, not on `www`. */
export const CONTACT_EMAIL = `contact@${SITE_DOMAIN}`
