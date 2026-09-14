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

/**
 * The legal entity behind the brand.
 *
 * "Iskra Games" is a **trading name, not a registered company**. The business is the
 * founder's Polish sole proprietorship — a *jednoosobowa działalność gospodarcza*
 * ("JDG"), registered in CEIDG under his own name. A JDG has no KRS number and no
 * share capital; NIP and REGON are the identifiers that exist.
 *
 * Polish and EU rules want the *entity* identifiable wherever the brand trades, which
 * is why the legal pages and the footer carry this block rather than only "Iskra Games".
 *
 * `HAS_LEGAL_ENTITY` below is false while any field is empty, and every component that
 * renders the block checks it first — so an unfilled entry renders *nothing at all*
 * rather than a placeholder that reads like a real registration number on a live legal
 * page. The details were supplied from the CEIDG entry on 2026-09-14.
 */
interface LegalEntityDetails {
  name: string
  address: string[]
  nip: string
  regon: string
}

/**
 * Typed rather than `as const` on purpose: `as const` narrows each field to its own
 * string literal, at which point `HAS_LEGAL_ENTITY`'s emptiness checks stop compiling
 * ("no overlap with \"\"") and the guard would have to be cast away. Keeping the fields
 * plain `string` keeps that guard real, so blanking a field out again — during a change
 * of address, say — hides the block instead of shipping a half-filled one.
 */
export const LEGAL_ENTITY: LegalEntityDetails = {
  /**
   * Exactly as CEIDG has it under *Firma przedsiębiorcy* — for a JDG that is simply the
   * owner's name, with no trading name attached to the registration. Keep the `ć`: it is
   * the registered spelling, and both webfonts load `latin-ext` for exactly this reason.
   */
  name: "Ludwik Baćmaga",
  /** Registered business address, one array entry per line as it should print. */
  address: ["ul. Andrzeja Struga 18", "26-610 Radom, Poland"],
  /** Tax identifier (Numer Identyfikacji Podatkowej) — 10 digits. */
  nip: "5214177201",
  /** Statistical identifier (REGON) — 9 digits for a sole proprietorship. */
  regon: "545534372",
}

/** True only once the registration details above are actually filled in. */
export const HAS_LEGAL_ENTITY =
  LEGAL_ENTITY.name !== "" &&
  LEGAL_ENTITY.address.length > 0 &&
  LEGAL_ENTITY.nip !== "" &&
  LEGAL_ENTITY.regon !== ""

/**
 * One-line entity identifier for tight slots such as the site footer. Empty while
 * the registration details are unfilled, so the caller can skip rendering entirely.
 */
export const LEGAL_ENTITY_LINE = HAS_LEGAL_ENTITY
  ? `${LEGAL_ENTITY.name} · NIP ${LEGAL_ENTITY.nip} · ${LEGAL_ENTITY.address.join(", ")}`
  : ""

/** The country whose law governs the Terms, and where the business is registered. */
export const JURISDICTION = "Poland"
