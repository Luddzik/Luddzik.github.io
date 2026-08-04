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

**Two Next configs exist and only one is loaded.** `next.config.js` wins; `next.config.mjs` is **never read**. `output: "export"` lives in the `.js` one, which is why builds produce `/out`. The `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds` in the `.mjs` one are inert, so **type and lint errors do fail the build** — the opposite of what the `.mjs` file suggests. Merge them before relying on either.

**Key architectural decisions:**
- Static export mode: images are unoptimized, no server-side rendering
- App Router (Next.js 13+) with client components (`"use client"`) for animations
- Build errors and TypeScript errors are ignored during CI (`next.config.mjs` sets `ignoreBuildErrors: true`) — don't rely on CI catching type errors

**Layout:** Single-page with smooth scrolling. The main page (`app/page.tsx`) composes sections: Header → Hero → Games → Studio → Contact → Footer.

**Copy rules.**
- **Never hard-code how many games there are.** No "two games", no "Two, made properly", no "one for Steam, one for the browser". The studio intends to ship more, and copy that counts the slate goes stale the day a third project starts. Write copy that holds at two titles or ten. The `Game[]` array in `Games.tsx` and the `meta` list on each entry are the only places the lineup is enumerated.
- **The wordmark is the hero's largest element.** Nothing beneath it competes for size — the tagline under the mark is body-sized on purpose (2026-08-04 direction). Don't reintroduce a large display claim in the hero.
- Register is plain and professional: say what a thing is, don't sell it. Each game card carries Genre / Status / Platform so press can scan it.

**Styling:** Tailwind CSS + CSS Modules. Component-level styles use `.module.css` files alongside their component. Global CSS variables in `app/globals.css` define the palette — flat near-black surfaces (`#0e0e12` / `#16161b` / `#0a0a0d`), warm off-white ink (`#f2ede6`), and a single flat ignition orange (`--spark: #ff5a1f`). **There are no gradients in this design** — an earlier version used them everywhere and they were deliberately removed; don't reintroduce one. Shadcn/UI components live in `components/ui/` and use `cn()` from `lib/utils.ts` for class merging.

**Type:** three faces, each with one job.
- **Kaushan Script** — logo only, never running text.
- **Syne** (`--font-display`) — headings, game titles, the contact address. Its squared geometric forms sit in deliberate opposition to the brush wordmark.
- **Archivo** (`--font-ui`) — all running text and UI. Quiet by design.

Never set body copy in Syne; never set a heading in Archivo. Both load `latin-ext` for Polish diacritics.

**The font variables must stay on `<html>` in `app/layout.tsx`, not `<body>`.** `globals.css` composes `--font-display` / `--font-ui` from them inside `:root`, and `:root` *is* `<html>`. With the variables on `<body>`, those compositions resolve against an undefined value, become invalid at computed-value time, and **the entire site silently falls back to the system font stack** — no error, no warning, it just quietly stops using the webfonts. This bug shipped once; don't reintroduce it.

Rejected along the way: **Fraunces + Karla** (2026-08-04) — the high-contrast serif read editorial/literary rather than like a game studio; don't reintroduce a serif. **Archivo Expanded** as the display face — competent but neutral and cool where the brand is warm; Syne was chosen over it, and over Bricolage Grotesque, Anybody and Unbounded, from a rendered five-way comparison.

Case is deliberate: the hero claim and card titles are uppercase (short enough to stay readable), section headings are sentence case (they run too long for caps), eyebrows and metadata labels are small tracked caps.

**Brand strings:** studio name, domain, and contact address live in `app/lib/brand.ts` — import from there rather than hardcoding, so the legal pages stay in sync.

**Logo:** a typographic wordmark, not an icon — lowercase "iskra" in Kaushan Script with the tittle on the i burning as an ember (the name means "spark"). `app/components/Wordmark.tsx` does this by stacking a second copy of the word, painting it via `background-clip: text`, and clipping it to the tittle — so the glowing dot is the font's own dot and stays registered at any size. Don't replace it with a circle positioned on top; that was tried and drifts. `public/favicon.svg` is the same "i" as hand-drawn SVG paths.

**Signature element:** `app/components/SparkDot.tsx` reuses that ember as punctuation — before every section eyebrow, as the full stop after every section heading. It's what carries the brand past the header.

**Section headings:** `app/components/SectionHeading.tsx` renders eyebrow + heading + ember full stop for Games, Studio and Contact. Reveal timing lives there, not in the sections — change it once and every section stays in rhythm.

**Motion.** Framer Motion for anything scroll- or state-driven; plain CSS keyframes for anything that only needs to run on mount (they need no client boundary and cost no JS). Every animation has a `prefers-reduced-motion: reduce` escape.

The motion is all one idea — *the ember is alive, and everything else is still ink*:
- **Ignition** (hero only) — the wordmark is laid down as a single **Asian brush stroke**, then the tittle is struck last, the way the dot is tapped in after the stroke is finished. Pure CSS in `Wordmark.module.css`, gated behind the `ignite` prop so the header and footer marks stay still and the effect keeps its weight. The reveal is an oversized angled `mask-image` whose `mask-position` animates — a soft feathered edge, not a hard wipe — plus a `filter: blur()` resolving soft to sharp, which is wet ink bleeding into paper then drying. Don't go back to a `clip-path` wipe; that was the first version and read as a CSS effect rather than as ink.
- **The fuse** — the header's bottom rule burns orange with scroll progress, the ember riding its leading edge (`ScrollFuse` inside `Header.tsx`). It's the mark continuing down the page, not a progress widget.
- **Breathing ember** — the wordmark's glow pulses slowly, everywhere the mark appears. The `SparkDot` punctuation deliberately does *not* — one living thing, not a dozen.
- **The cursor is a heat source** — `app/components/Embers.tsx`, canvas, hero only. Embers drift up (the studio is named after a spark, so the ambient background *is* the thing the name means), and the pointer carries a warm light through them: embers nearby flare and ride the draught, and clicking strikes a burst of sparks. A passive particle field is a genre default; a dark room you carry a light through reads as a game. Ambient count 38, burst capped at 90. Motion uses layered-sine pseudo-turbulence, not a single sway — one sine wave reads mechanical. The light is `(pointer: fine)` only, since touch has no hover. Paused off-screen and on hidden tabs; absent under reduced motion. Canvas, not DOM nodes — animating this many elements' positions each frame would thrash layout.

Don't add a fifth idea without removing one.

**Path alias:** `@/*` resolves to the project root (`pretty-awesome-games/`).

## Deployment

GitHub Actions (`.github/workflows/nuxtjs.yml` — misnamed; it is a Next workflow) deploys on push to `main`. It builds the app and uploads `pretty-awesome-games/out` as the Pages artifact.

**`CNAME` (repo root) is kept deliberately — do not delete it.** Owner decision, 2026-08-04.

Two facts to hold alongside it. GitHub's docs state that with a custom Actions workflow "no `CNAME` file is created, and any existing `CNAME` file is ignored and is not required". And this workflow uploads `pretty-awesome-games/out` as the Pages artifact, so a file at the **repo root is outside the artifact** and cannot reach Pages either way. For a `CNAME` file to actually be served it would have to live at `pretty-awesome-games/public/CNAME`, which the build copies into `out/`.

So: the custom domain is set in **repo Settings → Pages**. Treat the root `CNAME` as the record of intent that it is, and keep its value in sync with Settings so the two never disagree.
