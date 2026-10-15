# Iskra — revision 7, polished / revision 09

Open index.html. This proposal is based directly on revision 07, retaining its front-page composition, expanding slash panels, artwork, headline, orange CTA, numbered selectors and studio identity. Production and earlier proposals are unchanged.

## Reference
Reviewed the supplied 30.83-second Recording 2026-10-15 083942.mp4. Intro frames sampled at 300ms intervals from 7.5–12 seconds; the game-entry sequence was inspected at 200ms intervals around 18–20.8 seconds. The important reference behaviors are a staged diagonal reveal, a stationary navigation frame, a direct dissolve into the game canvas, and compact legible information. FromSoftware is the motion/composition reference, not a source of artwork or brand assets.

## Result
- 2.4-second entrance: the Iskra wordmark reveals, the fine diagonal opens into the real homepage artwork, the logo settles into the header, and navigation/copy appear. The live page itself is revealed; there is no substituted loading image. Skip, Escape, session memory, deep-link bypass and reduced-motion bypass are supported. Replay intro is available in the preview footer.
- 640ms overlapping page dissolves, with a separate short exit/entry for text groups to avoid superimposed paragraphs. Text stays still and sharp. The header and footer stay fixed in their layout throughout.
- Game details remain a full page. Facts are 15px on desktop and 14px on phones, with a stable dark area behind them. Game artwork has restrained background drift; character floating is removed. Pause background remains available.
- Company, Press and Contact retain readable content widths, contrast, persistent navigation and internal scrolling. Gameplay remains a page with native controls and no forced autoplay.
- Revision 07's one-game default and 3/8-entry layout specimen previews remain. Specimens are explicitly labeled.

## Review artifacts
- previews/motion-preview.mp4: 8.2-second, 24fps deterministic browser capture of entrance and navigation through game, company and press.
- previews/intro-t*.png: exact animation timestamps.
- previews/intro-final.png: final homepage.
- previews/game-desktop.png, company-desktop.png, press-desktop.png, contact-desktop.png: desktop compositions.
- previews/*-390.png and *-320.png: mobile layouts.
- previews/checks.json: browser checks.

## Validation
Rendered in local headless Chrome at 1440, 820, 390 and 320px widths, plus 1440x700 and 390x740. Inspected desktop/mobile and exact-time entrance screenshots. No viewport horizontal overflow, no horizontal overflow on inner pages, no page runtime exceptions. The intentionally oversized slash artwork is clipped within the homepage; its internal scrollWidth exceeds its clientWidth on narrow screens by design, without horizontal navigation. Rapid clicks settle on the latest route; the mobile menu opens and closes on navigation; reduced motion disables ambient animation and intro. Script syntax and 20 local asset references pass, with no missing anchors or duplicate IDs.

Browser screenshots and deterministic animation captures verify appearance and timing, not a hardware frame-rate benchmark. Fonts currently load from Google Fonts. Shared media lives in sibling design folders, so preserve those paths when sharing this local preview.
