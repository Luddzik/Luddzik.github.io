# Iskra — motion revision 07

Open index.html. Local proposal; production unchanged. Builds on revision 06.

Reference: https://www.fromsoftware.jp/ww/ and the three owner screenshots dated 2026-10-15 (081813, 081849, 081919). The reference uses full-canvas game artwork, compact game facts, a small gameplay thumbnail, direct links and persistent company navigation. This revision adapts that composition using only Iskra/NeuroShift assets.

## Experience
- Approximately 1.45-second brand entrance, once per session. Skip or Escape exits immediately. Deep links and reduced-motion users skip it automatically. No wait for fonts or asset downloads.
- Cancellable 180ms exit / 580ms entrance navigation. Hash routes support direct links and browser history.
- NeuroShift is a full page, not a dialog. Slowly drifting planet and squad layers with sparse sparks; manual pause, reduced-motion support and background-tab pause.
- Compact facts, gameplay thumbnail, demo link and press link. Gameplay opens its own routed view with native playback controls; no forced autoplay.
- Persistent Company / Press / Contact routes preserve publisher access. Existing press downloads retained.
- Escape returns gameplay to the game and the game to the entrance.

## Verification
JavaScript syntax, 20 local asset references, hash anchors, duplicate IDs and absence of dialogs checked. Controller tests with a DOM stub pass for page routing, rapid navigation cancellation, selected navigation, background pause, reduced motion, video pause, unknown-route recovery, introduction and skipping. These are logic tests, not browser layout tests. Browser surfaces are unavailable; terminal initialization also fails. Desktop/mobile layout and actual animation smoothness still require browser review.

Fonts load from Google Fonts. Shared media remains in the sibling proposal folders. Keep that folder structure when sharing this preview.
