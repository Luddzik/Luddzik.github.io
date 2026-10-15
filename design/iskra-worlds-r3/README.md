# Iskra — A spark. A world. (revision 3)

Created by Codex, 2026-10-14. Local design prototype; no changes to production Next.js files, no deployment or commit.

## Review
- index.html: live scroll-driven portfolio. Starts in a three-world design-demo mode.
- motion.html: recorded browser walkthrough.
- identity.html: Strike identity development, logo scale tests and two alternative concepts.
- research.html: primary-source research and rationale.

Open the HTML directly. Keep this directory next to iskra-directions, whose assets are reused. No dependencies or server required.

## Owner feedback addressed
The previous page was primarily a NeuroShift landing page with minor hover animation and an overpowering orange palette. This version starts with Iskra, gives each selected game its own scroll chapter, and adds a full collection independent of the cinematic sequence. The base palette is ink, chalk and smoke, with ember used sparingly. The logo explores two flints creating a spark rather than a decorative starburst. All brand concepts remain proposals.

## Portfolio architecture
Games are data records in games.js. Each holds title, ID, genre, status, platform, colour, background, optional foreground, optional video, hook and destination. Real production entries can be added without adding layout markup. The review selector creates fixtures for 1/3/8/24-entry tests. Only NeuroShift is real; every other entry is explicitly labelled a design specimen.

Selected scroll chapters are capped at three to keep the experience finite. The directory lists the whole collection, with search, category filters and eight-at-a-time expansion. Production integration should remove the review toolbar and fixtures, take all real catalog entries, and choose featured games explicitly rather than relying on source order. There is no architecture-level three-game limit. No next game has been announced or named in this prototype.

## Motion
Native scrolling drives chapter progress through a passive listener and requestAnimationFrame. A sticky viewport opens its inset frame, scales the environment, moves the foreground independently and transitions NeuroShift into its real gameplay loop. The sequence reverses with scroll. Other world studies illustrate different palettes and scene treatments. There is no wheel interception or forced scroll snapping.

Motion-off and prefers-reduced-motion remove the sticky chapters and their extra scroll distance, stop video, and present static content. Gameplay is muted by default, loaded only when needed and paused outside the visible chapter or when the document is hidden. A native dialog supports user-controlled video playback and Escape.

## Brand outputs
Original path-based wordmark, flint symbol, monochrome variant, inverse lockup, dimensional SVG interpretation and favicon.svg are in brand/. export-brand.mjs renders PNG/ICO/touch/app variants using installed Chrome. No font download or raster tracing is required.

## Asset provenance
- NeuroShift crew and environment: ../iskra-directions/assets, originally from the Unity project main-menu redesign assets.
- NeuroShift directory cover: pretty-awesome-games/public/neuroshift-icon.png.
- Gameplay loop: an eight-second silent extract beginning at 00:05 of D:/Development/Unity/ECIOGame/Builds/trailer/final/NEUROSHIFT-trailer-v6-generic-1080p.mp4; encoded to 1280px, CRF 25, approximately 1.7 MB.
- demo-valley.svg and demo-orbit.svg: original geometric design fixtures by Codex. They are not real game artwork.
- All identity vectors: original SVG paths by Codex.

## Research
- https://www.pentagram.com/work/nuverse/story — identity as a related system of symbol, motion and applications.
- https://housemarque.com/games — clear portfolio entries across multiple titles.
- https://www.supergiantgames.com/ — studio continuity with independently identifiable games.
- https://www.apple.com/airpods-pro/ — user-requested storytelling reference; content structure reviewed, exact animation not instrumented or copied.
- https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/ — scroll position as a timeline; applied via JS for the prototype's browser consistency.

## Verification
Run node design/iskra-worlds-r3/render-review.mjs from the repository root (Node 24 + installed Chrome). It renders desktop/tablet/mobile views, checks scroll aperture changes and gameplay, exercises catalog modes/search/filter/load more, verifies dialog Escape and reduced-motion fallback, and records a sequence of screenshots. The sequence is encoded to previews/scroll-walkthrough.mp4 at 24fps. Raw frames are ignored by Git. checks.json contains the observations.

Native browser connector tooling was unavailable; verification uses an isolated headless Chrome. No field performance testing on physical mobile hardware has been performed.

Final results: no horizontal overflow at 1440/820/390/320px; primary scene actions remain inside the viewport. Scroll changes frame aperture; gameplay loads, is visible and plays. 1/3/8/24-entry modes, display of all 24 entries, real-game filter, specific-title search, empty-search state, trailer dialog/Escape and reduced-motion fallback passed. Desktop, mobile, game scenes, directory and identity renders visually reviewed. Local asset/page references checked. Final walkthrough contains 336 browser frames at 24fps (14 seconds).
