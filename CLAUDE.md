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

This is a **Next.js 14 static site** for Pretty Awesome Games — a game development studio's marketing website. It deploys to GitHub Pages via GitHub Actions on push to `main`.

**Key architectural decisions:**
- Static export mode: images are unoptimized, no server-side rendering
- App Router (Next.js 13+) with client components (`"use client"`) for animations
- Build errors and TypeScript errors are ignored during CI (`next.config.mjs` sets `ignoreBuildErrors: true`) — don't rely on CI catching type errors

**Layout:** Single-page with smooth scrolling. The root layout (`app/layout.tsx`) wraps everything in a `ThemeProvider`. The main page (`app/page.tsx`) composes sections: Header → Hero → Games → Career → Contact → Footer.

**Styling:** Tailwind CSS + CSS Modules. Component-level styles use `.module.css` files alongside their component. Global CSS variables define the color palette (dark background `#1a1a1a`, orange accent `#ff6f3c`). Shadcn/UI components live in `components/ui/` and use `cn()` from `lib/utils.ts` for class merging.

**Animations:** Framer Motion is used throughout for entrance animations and interactive effects.

**Path alias:** `@/*` resolves to the project root (`pretty-awesome-games/`).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) automatically deploys on push to `main`. The workflow builds the Next.js app and publishes the `/out` directory to GitHub Pages. The custom domain is set via the `CNAME` file in the project root.
