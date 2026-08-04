import type { Config } from "tailwindcss"

/**
 * The site is built entirely from CSS Modules — there are no Tailwind utility
 * classes in `app/`. Tailwind is kept only for its preflight reset, which
 * `globals.css` builds on. The shadcn theme scaffolding that used to live here
 * went with the unused `components/ui` library.
 */
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
