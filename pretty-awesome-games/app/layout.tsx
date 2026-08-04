import type React from "react"
import type { Metadata } from "next"
import { Archivo, Kaushan_Script, Syne } from "next/font/google"
import { SITE_URL, STUDIO_NAME } from "./lib/brand"
import "./globals.css"

/**
 * Display face. Syne's squared, wide letterforms sit in deliberate opposition to
 * the brush wordmark — geometry against calligraphy — rather than meeting it in a
 * neutral middle, which is what the previous Archivo Expanded headings did.
 * Weight-variable only; there is no width axis, so headings get their presence
 * from weight and size.
 */
const syne = Syne({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
})

/** Body and UI. Quiet by design — the display face carries the personality. */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
})

/** Logo face only. Never running text. Latin-only — the name needs no diacritics. */
const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-kaushan",
})

const DESCRIPTION =
  "Iskra Games is an independent game studio in Poland, building games for Steam and the browser."

export const metadata: Metadata = {
  /*
   * Absolute URLs for OG and Twitter cards are resolved against this. It points
   * at the *new* domain, which is correct once the Pages custom domain is cut
   * over — until then, shared links will reference a domain that isn't live yet.
   * One place to change: SITE_DOMAIN in app/lib/brand.ts.
   */
  metadataBase: new URL(SITE_URL),
  title: {
    default: STUDIO_NAME,
    template: `%s — ${STUDIO_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: STUDIO_NAME,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: STUDIO_NAME,
    description: DESCRIPTION,
    siteName: STUDIO_NAME,
    url: SITE_URL,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Iskra Games — an independent game studio in Poland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: STUDIO_NAME,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * The font variables go on `<html>`, not `<body>`. `globals.css` composes
 * `--font-display` / `--font-ui` from them inside `:root`, and `:root` *is*
 * `<html>` — with the variables defined only on `<body>` those compositions
 * resolve against an undefined value, become invalid, and the entire site
 * silently falls back to the system font stack. Don't move them down.
 */
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={`${syne.variable} ${archivo.variable} ${kaushan.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
