# Iskra — Spark / Play revision 2

Created by Codex, 2026-10-14. Design proposal for owner review. Production Next.js files remain unchanged.

## Open locally
- index.html: full site with motion and screenshot viewer.
- identity.html: new logo, single-colour variants and favicon sizes.
- portfolio-test.html: explicitly labelled second-game layout test. No second game is announced on the main page.

No dependency install or server required. Keep this folder beside ../iskra-directions, which holds the original game artwork.

## Direction
Retain the owner's chosen Spark / Play composition and orange palette. Build a coherent identity from original SVG lettering and an asymmetric spark silhouette. Use charcoal for the studio section, warm paper for content, and a limited acid accent. Player CTA leads. Publishing/investment and press contacts remain secondary. No invented traction, awards, partners or launch dates.

Brand outputs live in brand/: SVG wordmark, symbol, full lockups (ink, light, orange), avatar, favicon.svg, favicon.ico (16/32/48), PNG favicons, apple-touch-icon.png, 192px and 512px app icons. site.webmanifest references the app icons. All lettering is vector paths, with no font dependency. These are proposed brand assets, pending owner visual selection.

## Portfolio growth
The lead game has a full-width feature. Additional games use the portfolio-grid below it, with each game's own title, art, status, genre and destination. That grid is absent from the main page while there is only one announced game. The test page includes explicit design-only placeholders. During integration into Next.js, centralize game data in an array and render the lead and additional items from it; never ship the layout-test placeholders.

## Motion research and implementation
- Emil Kowalski, CSS Transitions: https://animations.dev/learn/css-animations/transitions — short, interruptible hover transitions and explicit animated properties. Used for buttons, artwork and screenshot links.
- Google web.dev, Transitions: https://web.dev/learn/css/transitions — prioritize transform/opacity. Used for the 550–800ms entrance, 650ms once-only scroll reveals, and 240–280ms screenshot viewer transitions.
- Google web.dev, prefers-reduced-motion: https://web.dev/articles/prefers-reduced-motion — OS preference respected in CSS and JS and when changed live.

Pointer artwork movement is capped at 6px horizontal and 5px vertical and disabled for coarse pointers. One looping type strip carries the studio identity; it pauses offscreen, when the tab is hidden, on hover, and via the persistent Pause motion control. No scroll hijacking, loading gate, flashing or sound. Content remains visible without JS; screenshot links retain a direct-image fallback. Native dialog supports Escape, arrow keys, previous/next controls and focus return.

## Verification
Run node design/iskra-spark-play-r2/render-review.mjs from the repository root. Requires installed Chrome and Node 24. Starts an isolated headless browser, renders local pages, exports icons and closes the browser. Observations are recorded in previews/checks.json. Screenshots cover 1440, 820, 390 and 320px widths; identity and portfolio expansion views are included.

Game art provenance: ../iskra-directions/README.md. Legal entity and contact copied from current app/lib/brand.ts. Demo destination preserved from current Games.tsx. Native interactive browsing tools were unavailable; browser render and interaction verification uses the local headless test runner. No deployment or commit performed.

Final checks: no page overflow, broken source images or hero/art overlap at 1440/820/390/320px. Pause, resume, viewer opening, next image, Escape close and live reduced-motion changes all passed. Local page and asset references verified. Desktop, tablet, mobile and screenshot-viewer renders visually reviewed after correcting image aspect ratios.
