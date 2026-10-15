# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev       # Start local dev server

# Production
npm run build     # Build for static export (outputs to /out)
npm run start     # Start production server

# Code quality
npm run lint      # Run ESLint
```

All commands should be run from the `pretty-awesome-games/` subdirectory.

## Architecture

This is a **Next.js 14 static site** for **Iskra Games** — a game development studio's marketing website. It deploys to GitHub Pages via GitHub Actions on push to `main`.

The studio rebranded from "Pretty Awesome Games"; the directory is still named `pretty-awesome-games/`. `REBRAND.md` at the repo root records the brand decisions and what is still outstanding — read it before touching branding, copy, or `CNAME`.

**One Next config:** `next.config.mjs` (static `output: "export"` → `/out`). Type and lint errors **fail the build** on purpose.

**Key architectural decisions:**
- Static export mode: images are unoptimized, no server-side rendering
- App Router (Next.js 13+) with client components (`"use client"`) for animations

**Layout — the 2026-10 redesign (design reference: `design/iskra-polish-r9/`, motion reference: FromSoftware's site).** The home page is one **stationary frame** — header and footer never move — with views dissolving inside it, like a game's front end. `app/page.tsx` renders `app/components/Shell.tsx`, which owns routing, transitions and the entrance. Routing is by **hash** (`app/lib/routes.ts`) so it works on static hosting and every view is a shareable link: `#games`, `#company`, `#press`, `#contact`, `#<slug>` (a game's page), `#<slug>/gameplay`, `#press-<anchor>`. All views are always in the DOM (good for SEO); only the active one (plus the leaving one, mid-dissolve) is unhidden. Legal pages (`/privacy-policy`, `/terms`, `/oauth2redirect`) are ordinary scrolling routes that reuse `SiteHeader base="/"` + `SiteFooter` and share `components/LegalPage.module.css`.

- **Home** (`views/HomeView.tsx`) — the first game's title and every "01 / NAME" bar are aligned to the header logo's gutter **by measurement** (the skew drifts lower content left by an amount that depends on window height; re-measured on resize, font load and after the skew's transition). Don't replace it with fixed padding. Each featured game is a skewed slash; the focused one opens wide and comes into colour. **The whole artwork links to the game's page**, not just the Discover button (touch: first tap focuses, second goes through).
- **Game page** (`views/GameView.tsx`) — the game's world full-bleed behind compact facts, Back (×) on the right, Esc also goes back. Its background is alive: world drifting, the game's own ambience moving through it, pointer parallax between the layers. **Every game gets its own unique background animation** (owner rule): it lives in `components/ambience/<Game>Ambience.tsx`, is registered in `components/ambience/index.ts`, and the game names it via `ambience: "<key>"` in `games.ts`. Reusable engines (e.g. `SmokeField`) sit in the same folder; NeuroShift's is thin neon-tinted fog drifting steadily left → right (strength, density and wind are per-game props on `SmokeField`). The scene stacks **world → smoke → characters → scrim → text** — effects stay *behind* the characters. Characters do **not** bob — only the light on them breathes (r9 decision). The home slash runs the same smoke behind its characters. "Pause background" is kept for accessibility.
- **Games / Company / Press / Contact / Gameplay** — `views/ContentViews.tsx`, readable columns on the flat `--surface`.

**Transitions** (in `Shell.tsx`): the old scene stays painted underneath while the new one dissolves in over 640ms; text groups (`data-tgroup`) move separately — old text out in 130ms, new text in after 170ms — so paragraphs never superimpose. Entering a game, its scene settles from scale 1.06. Rapid clicks settle on the latest route. **Entrance**: first visit per session only — wordmark drawn, a diagonal cut opens into the real home page, the mark flies into the header (2.4s). Skippable; absent on deep links and under reduced motion. An inline script in `layout.tsx` decides before first paint (`html[data-intro]` / `html[data-route-pending]`) so nothing flashes.

**Copy rules.**
- **Never hard-code how many games there are.** No "two games", no "our current project is X". Write copy that holds at one title or ten. `app/lib/games.ts` is the only place the lineup is enumerated — home slashes (first 3), Games index, game pages, Press kit and the footer's Steam link all derive from it. **Echoes of Stone never appears.**
- Register is plain and professional: say what a thing is, don't sell it. Each game carries Genre / Status / Platform so press can scan it.

**Styling:** CSS Modules per component (Tailwind is only kept for preflight). Tokens in `app/globals.css`: frame `#0b0c0e`, page `#0c0d0f`, surface `#131619`, ink `#f0f1ef` / body `#c3cbd0` / dim `#a9b3ba`, one accent `--accent: #ed874b`. Shared button/kicker/link styles: `views/Ui.module.css`. The only gradients are **scrims over game art** for legibility — don't add decorative ones.

**Type:** **Barlow Condensed** (`--font-display`) for titles, nav and labels; **Barlow** (`--font-ui`) for everything you read. Both load `latin-ext` for Polish diacritics.

**The font variables must stay on `<html>` in `app/layout.tsx`, not `<body>`.** `globals.css` composes `--font-display` / `--font-ui` from them inside `:root`, and `:root` *is* `<html>`. With the variables on `<body>` the whole site silently falls back to the system font stack. This bug shipped once; don't reintroduce it.

**Brand strings:** studio name, domain, and contact address live in `app/lib/brand.ts` — import from there rather than hardcoding, so the legal pages stay in sync.

**The studio name is a trading name, not a company.** The business is the founder's Polish sole proprietorship (*jednoosobowa działalność gospodarcza*), registered in CEIDG under his own name — so there is no KRS number and no share capital. **Publish only what the law requires: name, address, email, NIP** (UŚUDE art. 5 ust. 2; Prawo przedsiębiorców art. 20 ust. 3 — checked 2026-10-15). REGON and the CEIDG entry are deliberately not shown; there's no separate VAT number to show (NIP is it). Those details live in `LEGAL_ENTITY` in `app/lib/brand.ts` and render through `app/components/LegalEntity.tsx` (both legal pages), the page footer, and the Contact view (the fixed home-frame footer has no room for it). **Every field is blank until the registration details are filled in, and `HAS_LEGAL_ENTITY` gates every render** — an unfilled entry shows nothing rather than a placeholder that reads like a real NIP on a live legal page. Fill `LEGAL_ENTITY` and both appear on their own. The Terms name Polish law and carry no arbitration clause: EU consumers can sue in their own country regardless, so the clause was unenforceable where it mattered.

**Logo:** the **ISKRA** geometric wordmark, its I broken by the same diagonal as the home slashes. `app/components/Wordmark.tsx` draws it as inline paths (`currentColor`); `public/brand/wordmark.svg` / `wordmark-ink.svg` are the same geometry for press download — keep them in step. Favicons (`favicon.ico/.svg`, 16/32/48 PNG, apple-touch, 192/512 via `app/manifest.ts`) are the broken I alone. `public/og.png` is the share card. The Kaushan Script brush wordmark is retired.

**Background effects — smoke only, behind the characters (owner direction, 2026-10-15).** A foreground spark/particle field with a cursor glow and click bursts was built and rejected as looking cheap and sitting on top of everything. Don't reintroduce foreground particles, cursor glows or click effects.

**Canvas performance rules** (`components/ambience/`) — measured on this site, not guessed:
- **Never use `ctx.shadowBlur`**; glow comes from pre-rendered sprites blitted with `drawImage`.
- **Never call `createRadialGradient` per frame.**
- **No CSS `mask-image` on the canvas**; fold fades into particle alpha.
- Smoke is all low frequencies: the backing store runs at **half** CSS resolution, sprites are noise puffs built once, puff count scales with viewport area. The loop is **stopped** (not just hidden) when its view isn't active, the tab is hidden, or the viewer paused it; nothing renders under reduced motion.

**Media:** game art lives in `public/media/<slug>/` — web-sized WebP for display, full PNGs only as press downloads. Don't ship multi-MB PNGs for display.

**Motion:** every animation has a `prefers-reduced-motion: reduce` escape (global rule in `globals.css`, plus JS checks for WAAPI and canvas).

**Path alias:** `@/*` resolves to the project root (`pretty-awesome-games/`).

## Deployment

GitHub Actions (`.github/workflows/nuxtjs.yml` — misnamed; it is a Next workflow) deploys on push to `main`. It builds the app and uploads `pretty-awesome-games/out` as the Pages artifact.

**`CNAME` (repo root) is kept deliberately — do not delete it.** Owner decision, 2026-08-04.

Two facts to hold alongside it. GitHub's docs state that with a custom Actions workflow "no `CNAME` file is created, and any existing `CNAME` file is ignored and is not required". And this workflow uploads `pretty-awesome-games/out` as the Pages artifact, so a file at the **repo root is outside the artifact** and cannot reach Pages either way. For a `CNAME` file to actually be served it would have to live at `pretty-awesome-games/public/CNAME`, which the build copies into `out/`.

So: the custom domain is set in **repo Settings → Pages**. Treat the root `CNAME` as the record of intent that it is, and keep its value in sync with Settings so the two never disagree.
