import type React from "react"
import type { Metadata, Viewport } from "next"
import { Barlow, Barlow_Condensed } from "next/font/google"
import { SITE_URL, STUDIO_NAME } from "./lib/brand"
import "./globals.css"

/** Titles, navigation and labels. */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
})

/** Everything you read. */
const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
})

const DESCRIPTION =
  "Iskra Games is an independent game studio in Poland, building games for PC."

export const metadata: Metadata = {
  /*
   * Absolute URLs for OG and Twitter cards are resolved against this.
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
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

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
}

/*
 * Runs before first paint, home page only. If the entrance is going to play
 * (first visit this session, no deep link, motion allowed) it hides the frame,
 * so the finished page doesn't flash up and then get re-hidden by the intro.
 * On a deep link (`/#press`) it hides the views instead, so the home page
 * doesn't flash before the linked view takes over. The timer is the safety net
 * in case the app never boots.
 */
const BOOT_GATE = `try{var d=document.documentElement,h=location.hash;if(location.pathname==="/"){if(h&&h!=="#home"){d.setAttribute("data-route-pending","")}else if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&sessionStorage.getItem("iskra-entered")!=="1"){d.setAttribute("data-intro","")}setTimeout(function(){d.removeAttribute("data-intro");d.removeAttribute("data-route-pending")},4000)}}catch(e){}`

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
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_GATE }} />
      </head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
