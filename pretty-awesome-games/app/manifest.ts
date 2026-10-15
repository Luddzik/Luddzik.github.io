import type { MetadataRoute } from "next"
import { STUDIO_NAME } from "./lib/brand"

/** Emitted as a static /manifest.webmanifest — carries the larger app icons. */
const manifest = (): MetadataRoute.Manifest => ({
  name: STUDIO_NAME,
  short_name: "Iskra",
  start_url: "/",
  display: "browser",
  background_color: "#0b0c0e",
  theme_color: "#0b0c0e",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
  ],
})

export default manifest
