# Iskra Games — Rebrand & Site Redesign

**Status:** §4 site redesign is **implemented and building clean**. Brand/name work in §1
is still outstanding — see the checklist there.
**Last updated:** 2026-08-03

---

## 1. The decision

The studio is rebranding from **Pretty Awesome Games** to **Iskra Games**.

*Iskra* is Polish for **spark**. Chosen after evaluating and rejecting: Hard Mode Studio,
Kiln, Orrery, Elsewhere, Perigee, Meridian, Paper Lantern, Acorn, Kite, 8-Bit / 9-Bit,
Redshift, Lantern Studio.

**Why it won**

- Single word, which was the stated preference.
- Authentically Polish — the founder is Poland-based, so it isn't borrowed atmosphere
  the way the Japanese/Chinese lantern options would have been.
- Easy first-try pronunciation for English speakers (EES-kra); no diacritics.
- "Spark" is a good thing for a studio to be called, and it matches the warm accent
  colour the site was already built around.
- Almost uncontested in search, unlike "Lantern" or "8-bit".

**Known associations** — *Iskra* was Lenin's newspaper (*The Spark*, 1900), a faint
political echo for some Eastern European readers. More usefully, the PZL TS-11 **Iskra**
is a well-known Polish jet trainer.

### Domain

`iskragames.com` — **available as of 2026-08-03**, not yet purchased.

Unavailable: `iskra.com`, `iskrastudio.com`, `iskrastudios.com`, `studioiskra.com`.
This is why the name is **Iskra Games** rather than Iskra Studio.

> Availability was checked by DNS lookup (absence of nameservers), not the registry.
> **Confirm at a registrar before relying on it.**

### Still to do on the name

- [x] Buy `iskragames.com` — **purchased on Porkbun, 2026-08-04**
- [ ] Trademark check — USPTO / EUIPO classes 9 and 41
- [ ] App-store name collision check
- [ ] Decide whether the Polish company registration uses this name
- [ ] Update `CNAME` to `iskragames.com` at cutover. The file is **kept** (owner
      decision); note the domain is actually set in repo Settings → Pages, and a
      root-level `CNAME` is outside the deployed artifact. See §14.

---

## 2. Project lineup — what goes on the site

The two released mobile games are **no longer the story**. Both are being replaced.

| Project | What it is | Platform | Status | Show on site? |
|---|---|---|---|---|
| **Most Said** | Family Feud–style survey guessing game. Phaser 3 + TypeScript + Vite. Rebrand of the Thai trivia title (ศึกนักตอบ / "TT"). | Web portals (Poki) | In development | **Yes** |
| **ECIO Reborn** | Strategy — "Build. Battle. Conquer." Being rebuilt from the mobile version. | Steam | In development (WIP) | **Yes** |
| **Echoes of Stone** | Cozy restoration sim, formerly "Cozy Ruins". Unity URP, Steam EA → PS5. | — | In development | **NO — hide entirely** |

**Echoes of Stone must not appear anywhere on the site** — no name, no teaser, no
placeholder card. Explicit instruction, 2026-08-03.

### Source locations

- Most Said — `~/Documents/Personal/Dev/tt/web-game/`
- ECIO — `~/Documents/Personal/Dev/ECIOGame/`
- Echoes of Stone — `~/Documents/Personal/Dev/ruins-restoration/` (GDD: `EchoesOfStone_GDD.md`)

### Copy pulled from source

**Most Said** — from `web-game/index.html`:
> Name the answers everyone else gave. Five questions, forty-five seconds, three strikes.

Its own in-game identity: background `#0d0618`, off-white `#f4f0ff`, yellow `#ffd23d`.
Mark is four rounded slots with one lit.

**Key art — resolved 2026-08-04.** The Thai title's app icon is now the card art:
`~/Documents/Personal/MarketingMaterial/ศึกนักตอบ/icon/500x500.png`, copied into
`public/most-said-icon.png`. The interim four-slot panel is retired. Source folder
also holds a 512px "3000x3000" file (mislabelled) and store screenshots, if a wider
capsule is ever wanted.

**ECIO Reborn** — existing tagline:
> Build. Battle. Conquer.

`public/ecio_screenshot.png` exists in this repo and is still usable.

### Old links to remove

Both mobile store listings come off the site — the App Store and Play Store URLs for
`com.pag.tt` and `com.pag.ecioreborn` currently in `app/components/Games.tsx`.

---

## 3. Logo direction

**Typographic wordmark — no icon.** Explicit preference, 2026-08-03. Still holds.

> **Superseded 2026-08-03.** The spark-gap version below was built, shown, and
> **rejected** by the founder. Kept only so nobody proposes it again. The live
> direction is §3a.

<details>
<summary>Rejected: the spark-gap "I"</summary>

- **ISKRA** in Space Grotesk 700, uppercase, letter-spacing ~0.16em.
- Initial **I** replaced by a vertical bar broken by an angled spark gap, filled with
  the ember gradient.
- **GAMES** beneath in small tracked caps.

**Why it failed:** the broken bar reads as a rendering glitch or a typo rather than a
spark, and one orange fleck beside plain tracked caps is a default tech wordmark, not
an identity.

</details>

### 3a. Live direction — calligraphic, ember tittle

Founder asked for calligraphy, 2026-08-03. Art-directed register: **controlled brush
italic** — confident single gesture per letter, editorial discipline rather than
decorative flourish. Rejected registers: formal/copperplate scripts (Sacramento,
Parisienne, Italianno — wedding-invitation, and they disintegrate at small sizes);
text italics (EB Garamond, Cormorant — not calligraphy at all, and they read
boutique-agency rather than games); monoline signature scripts (Style Script — reads
as one person's autograph, no weight).

- **"iskra"** set **lowercase** in **Kaushan Script**.
- The **tittle on the i is the spark** — the dot burns in ignition orange. The dot is
  structurally part of the letterform, so nothing is bolted on, and unlike a trailing
  flourish it survives all the way down to favicon size.
- Implementation is not a circle pasted on top: a second copy of the word is stacked
  over the first, painted with the ember via `background-clip: text`, then clipped to
  the tittle alone. The glowing dot **is the font's own dot**, perfectly registered at
  any size. See `app/components/Wordmark.tsx`.
- **GAMES** beneath (or beside) in small tracked Karla caps, muted.
- Favicon is the **i** — brush stem plus burning tittle, drawn as SVG paths in
  `public/favicon.svg` so it carries no font dependency.

Rejected along the way: an **ink-flick** terminal (the tail a brush throws on lift-off).
It renders convincingly on every brush face, which is the problem — it's default
behaviour for the genre, not a chosen device. It also puts the brand's only warm colour
on the thinnest stroke in the mark, exactly the stroke that vanishes at 16px.

Fallback face if Kaushan's brush character ever reads too soda-brand: **Yellowtail**
(rounder, more mid-century) — swap is one import in `app/layout.tsx`.

Old assets retired: `logo_long.png`, `logo_long.svg`, `hollow-brawls-icon*.png`, and
the spark-gap `iskra-wordmark.svg` / `iskra-lockup.svg`.

---

## 4. Site redesign plan

Brief: modern, appealing, clean.

### Design tokens

> **Revised 2026-08-03**, alongside the logo. Dark surfaces were the one settled
> decision that survived; **the gradients were the defect**, not the darkness. Both
> three-stop gradients (logo and background) are gone. Near-black stays because it's
> neutral enough not to fight either game's key art on the Games section.

```
Surfaces   bg #0e0e12 · raised #16161b · sunken #0a0a0d      (flat, no gradient)
Structure  rule #2a2a32 · rule-soft #1e1e25
Ink        #f2ede6 · dim #a09a92 · faint #6b6660    (warm off-white = pale ink)
Ignition   spark #ff5a1f · warm #ffa04a             (flat, used sparingly)
Radius     4px / 10px · Shell 1200px
```

Text is warm off-white rather than clinical white, which reframes light type as pale
ink on dark paper — consistent with a hand-lettered brand.

### Typography

Replacing Poppins / Lato / Bungee (and the interim Space Grotesk / Inter) with:

- **Kaushan Script** — logo face **only**, never running text
- **Fraunces** — headings; ink-influenced terminals, same pen-and-chisel lineage as
  the brush lettering, enough personality to carry a heading without a gradient
- **Karla** — body and UI; humanist grotesque, warmer than the Inter default

Fraunces and Karla both load `latin-ext` for Polish diacritics. Kaushan is `latin`
only, which is fine — the name needs no diacritics.

### Page structure

`Header → Hero → Games → Studio → Contact → Footer`

- **Header** — sticky, backdrop blur, wordmark left, nav right (Games · Studio · Contact)
- **Hero** — **revised 2026-08-03.** The pill eyebrow, tech grid, radial bloom and
  gradient CTA were all cut: that vocabulary reads as generic SaaS and fought the
  hand-lettered brand. Instead the **wordmark itself is the hero's dominant visual**,
  set large where the brush face can actually perform, over faint horizontal ruled
  guide lines (brush lettering is written against guides). One declarative line in
  Fraunces, one flat outline CTA.
- **Signature element** — the ember from the wordmark's i, reused as punctuation
  site-wide: marker before each section eyebrow, full stop after each section heading.
  It's what carries the brand past the header, so the logo isn't a one-off asset that
  never reappears. See `app/components/SparkDot.tsx`.
- **Games** — two cards, art side alternating so the pair reads as a spread. ECIO
  Reborn uses its screenshot; Most Said leads with its app icon, staged the way a
  store listing shows one, over a blurred copy of itself so the panel is lit by the
  game's own colour.
- **Studio** — replaces the old "Not Hiring Currently" Career section. Short positioning
  paragraph plus a few facts (solo/indie, Poland, Unity + Phaser).
- **Contact** — email card. **Needs a new address** — `contact@prettyawesomegames.com`
  dies with the rebrand.
- **Footer** — wordmark, copyright, Privacy / Terms.

### Files to touch

**Rewrite:** `app/globals.css`, `app/layout.tsx` (fonts + metadata), `app/page.tsx`,
and components `Header`, `Hero`, `Games`, `Footer`, `Contact` (+ their `.module.css`).

**Create:** `app/components/Studio.tsx` + `Studio.module.css`, the three logo SVGs.

**Delete:** `About.tsx`, `AboutContact.tsx`, `BackgroundPaths.tsx`, `Career.tsx` and
their CSS modules — all unused or superseded.

**Also update:** `app/privacy-policy/page.tsx` and `app/terms/page.tsx` (brand name and
contact address), `package.json` name field, `CLAUDE.md`, `CNAME`.

Leave `public/app-ads.txt` alone until the mobile listings are actually retired.

---

## 5. Open questions for when we resume

1. **Contact email** — what replaces `contact@prettyawesomegames.com`?
2. **Socials** — any Discord / X / Bluesky to link, or drop the social row?
3. **Domain** — is `iskragames.com` bought? Determines whether `CNAME` changes now.
4. ~~**Most Said key art**~~ — **resolved 2026-08-04**: the Thai title's app icon
   is the card art. See §2.
5. **Steam page** — is there an ECIO Steam URL to link, or "coming soon" with no link?

---

## 6. Poki application

Separate but related — the form at the time of pausing had the studio name field blank.

- **Studio name:** Iskra Games
- **Portfolio field:** contract work under other companies **is fine to list** — that
  field is about track record, not IP ownership. Split it "Own titles / Contract work"
  and label each role. Check old contracts for confidentiality clauses before naming
  any client; describe under NDA without naming if needed.
- Contracted games can be listed as portfolio evidence but **cannot be submitted to
  Poki for publishing** — those rights aren't yours.

---

## 7. Implementation status

Built 2026-08-03, then **rebuilt the same day** after the founder rejected the logo and
asked for calligraphy plus a general "modern and appealing" pass. `npm run build` and
`tsc --noEmit` both pass; every section checked in-browser at 1440px and 430px.

**Done**

- Revised tokens (§4), Kaushan Script / Fraunces / Karla, page structure
  Header → Hero → Games → Studio → Contact → Footer.
- `Wordmark.tsx` — lowercase "iskra" with the burning tittle (§3a). Takes a number or
  a CSS length, so the hero passes a `clamp()` for fluid sizing. `stacked` adds the
  tracked GAMES line for the footer.
- `SparkDot.tsx` — the ember as reusable punctuation across every section.
- `public/favicon.svg` — the brush "i" with burning tittle, hand-drawn SVG paths.
- Hero rebuilt around the wordmark with ruled guide lines; SaaS vocabulary removed.
- Games is two wide editorial cards with ruled status/platform metadata and no store
  links; Most Said leads with the Thai title's app icon. Echoes of Stone appears
  nowhere.
- Contact: the address itself is the call to action, set large in Fraunces with a
  wipe underline. No gradient pill anywhere on the site.
- Studio replaces Career. Legal pages, `package.json`, `CLAUDE.md` rebranded.
- Brand strings centralised in `app/lib/brand.ts`.
- Deleted: `About`, `AboutContact`, `Career`, `BackgroundPaths`, `logo_long.*`,
  `hollow-brawls-icon*.png`, and the rejected spark-gap SVGs. (`BackgroundPaths` was
  used by `app/oauth2redirect/page.tsx`, not unused as §4 assumed — usage removed.)

**Deliberately not done**

- **`CNAME` is unchanged**, still `www.prettyawesomegames.com`. Pointing it at
  `iskragames.com` before the domain is bought would take the live site down. Change it
  in the same move as the DNS cutover.
- **`contact@iskragames.com` is a placeholder** and the mailbox does not exist yet
  (§5 Q1). It is in one place — `app/lib/brand.ts` — so it is a one-line fix.
- `public/app-ads.txt` and `public/tt_screenshot.png` left alone, per §4.

**Still open:** §5 Q2 (socials — the social row is currently omitted entirely), Q5
(no Steam link, so ECIO's card shows a "Steam" platform tag with no outbound link).

---

## 8. Motion pass — 2026-08-04

Brief: "make the website more modern, animate things more." The site's static
composition was already right, so nothing was restyled — the palette, type and layout
are untouched. What was missing was **time**: the page resolved all at once and then
sat there.

One idea carries all of it: **the ember is alive, everything else is still ink.**
Three expressions of it, and no fourth.

1. **Ignition** — the hero wordmark is written left to right, then the tittle is
   struck last and flares. Dots get added after the stroke is laid down, so this is
   how the mark would actually be made. Pure CSS keyframes in `Wordmark.module.css`
   behind an `ignite` prop; the header and footer marks stay still so the sequence
   keeps its weight. The hero's ruled guides draw in first — paper before ink.
2. **The fuse** — the header's bottom rule burns ignition orange with scroll
   progress, ember riding the leading edge (`ScrollFuse` in `Header.tsx`). A scroll
   bar is ordinary furniture; this is the mark continuing down the page.
3. **Breathing ember** — the wordmark's glow pulses slowly wherever the mark appears.
   The `SparkDot` punctuation deliberately does **not** pulse. One living thing.

Also in this pass:

- `SectionHeading.tsx` extracted from Games / Studio / Contact — eyebrow, heading and
  ember full stop now reveal on one staggered timeline, defined once. The full stop
  is *struck* rather than faded, echoing the tittle.
- Games cards alternate which side the art sits on, and hover now does real work:
  card lifts, border warms toward spark, art scales, the icon tilts.
- Scroll-spy nav — the active section's underline slides between items (`layoutId`).
- Studio facts arrive line by line rather than as a block.
- Contact gained a **Copy address** button beside the mailto link.
- Hero CTA fills from the left, like the fuse catching, with the arrow nudging down.
- Hero content parallaxes and fades as it scrolls away.

**Fixed along the way:** `section[id]` had no `scroll-margin-top`, so every in-page
anchor landed with its heading under the fixed header.

Every animation has a `prefers-reduced-motion: reduce` escape. Anything that only
runs on mount is plain CSS keyframes rather than Framer Motion — no client boundary,
no JS cost.

### Still open from this pass

- **Studio logo sting.** The ignition sequence in the hero is, deliberately, an
  animatic for the video bumper that goes in front of the games — same gesture, same
  timing. Hand it to whoever animates the sting as reference. Doing it properly needs
  the wordmark as **vector outlines**, not the Kaushan Script font, so the stroke can
  be drawn along a real path.

---

## 9. Type change and card art — 2026-08-04 (later)

### Fraunces + Karla rejected

Shown and turned down by the founder: *"not sure this looks very professional, looks
generic"* and, of the hero, *"looks very oldstyle and not fitting the game."* The
diagnosis was right — a high-contrast old-style serif reads editorial and literary,
which is the wrong register for a game studio, and it was fighting the brush logo
rather than supporting it.

**Replaced by Archivo alone**, chosen from three directions (the others: Bricolage
Grotesque + Instrument Sans; Clash Display + Satoshi, self-hosted). Archivo is
variable on weight *and* width, so:

- Headings run **expanded and heavy** — `font-variation-settings: "wdth" 118`, weight
  800, tracking −0.022em. The tokens are `--wdth-display` / `--wdth-normal` in
  `globals.css`.
- Body stays normal width at 400/500.
- **Contrast comes from size and width, not from mixing faces.** One superfamily is
  the whole system. Do not add a second text face.

Case is deliberate and not uniform: hero claim and card titles uppercase (short
enough to stay readable), section headings sentence case (too long for caps),
eyebrows and metadata small tracked caps.

Knock-on changes: the italic-serif taglines on the game cards became tracked caps in
spark; the contact address went from Fraunces 400 to Archivo Expanded 700; the hero's
outline CTA became a **solid** spark button, the one filled control on the page.

### Hero restructured

The literary opener (*"Iskra is Polish for spark. A small studio in Poland…"* set
large in serif italic) was the thing that read old. Replaced with a proper hierarchy:

1. the wordmark, ignited;
2. **A SMALL STUDIO IN POLAND, MAKING TWO GAMES.** — expanded caps, the claim;
3. a dim supporting line that still carries the name's meaning: *"One for Steam, one
   for the browser. Iskra is Polish for spark."*;
4. solid CTA.

### Both cards now lead with an app icon

`public/ecio-icon.png` — from `ECIOGame/Assets/_ECIO/GAME/Sprite/LOGO_V2/game_icon_v2_full.png`,
resampled 1024 → 512 (the original was 1.1 MB for a flat two-colour mark).

The founder reported the ECIO card showing a broken image. **The file was never
broken** — `public/ecio_screenshot.png` is a valid 1525×1099 PNG, tracked in git and
present in `out/`; it rendered correctly in a browser check. It was a stale dev server
or a cached failed request locally. But the wide key art cropped badly in a 16:10 box
(characters jammed left, dead canyon right), so it was replaced anyway.

Icons rather than screenshots for both, because the two games' key art is wildly
different in shape and icons are square — the pair now reads as one system. The
screenshot stays in `public/` unused, in case a wider capsule is wanted later.

### Hero background

`app/components/Embers.tsx` — embers drifting up behind the hero, on canvas. The
studio is named after a spark, so the ambient background is literally the thing the
name means rather than a generic particle field. 26 particles, masked out before they
reach the header, paused off-screen and on hidden tabs, absent entirely under reduced
motion.

### Logo animation — Asian brush

Founder's direction: *"I would like it to be calligraphed with the Asian brush."*
Applied to the web ignition and, more importantly, to the **sting brief** in §8.

On the web the write-on is no longer a `clip-path` wipe. It is an oversized, angled
`mask-image` whose `mask-position` animates, giving a soft feathered reveal edge
instead of a guillotine line, plus a `filter: blur()` that resolves soft → sharp —
ink bleeding into paper (にじみ *nijimi*) and then drying. The easing runs fast
through the middle and settles at the end, which is how a loaded brush actually moves.

**For the video sting**, the brief becomes: *iskra* written as one continuous
shodō-style gesture — tapered entry where the brush lands, pressure swelling through
the body of the stroke, dry-brush break-up (かすれ *kasure*) where it moves fastest,
and the tittle tapped in last as a separate 点 *ten*. That last tap is the ember; it
flares and settles. Still needs the wordmark as **vector outlines** — see §8.

---

## 10. Content revamp — 2026-08-04 (final pass)

Founder feedback: the copy *"is just not professional"*, and — the important part —
**"we will make more games so don't just say 'making two games'."**

### The rule that came out of it

**No copy anywhere may hard-code the size of the slate.** Removed: the hero's
*"making two games"*, its *"one for Steam, one for the browser"*, the Games heading
*"Two, made properly"*, and the Studio paragraph that described the lineup as
one strategy game plus one party game. All of it went stale the moment a third
project starts. The only place the lineup is enumerated is now the `Game[]` array in
`Games.tsx`.

### Hero hierarchy corrected

The big expanded claim was competing with the wordmark. Founder direction: *"want
logo to be primary thing that's big, and this text should be small."* So:

- The wordmark is now the `<h1>` — it carries the name, and its `aria-label`
  ("Iskra Games") is the page's accessible heading. The "GAMES" subline is
  `aria-hidden` so it isn't announced twice.
- Everything under it is body-sized. One line: **"An independent game studio in
  Poland. *Iskra* is Polish for spark."**
- The "one for Steam, one for the browser" line was cut entirely.

Heading outline is now h1 *Iskra Games* → h2 *What we're building* / *A spark is a
small thing that starts something* / *Say hello* → h3 game titles.

### Section copy

| Where | Was | Now |
|---|---|---|
| Games heading | "Two, made properly" | "What we're building" |
| Game cards | Status · Platform | **Genre** · Status · Platform — press can scan it |
| Studio ¶2 | named the two projects | "a handful of things at a time… whether it's a strategy game with genuine depth or a party game you understand in a single round" |
| Studio ¶3 | — | added: "Everything we ship is built in-house, from first prototype to store page." |
| Studio facts | Team / Built with / Shipping to | **Studio / Based in / Engines / Platforms** |
| Contact lede | "Press, publishing, collaborations…" | "Press enquiries, publishing and partnership conversations… We read everything and reply to what we can." |
| `<meta>` + OG | "A small independent game studio in Poland." | "Iskra Games is an independent game studio in Poland, building games for Steam and the browser." |

Legal pages were checked and left alone — already rebranded, and the boilerplate is
legal text rather than marketing copy.

### Embers sped up

First version was **12–28 second lifetimes at 9–26 px/s** — that reads as fog, not
fire. Now 34–96 px/s with buoyant acceleration, 3.7–7.7s lifetimes, 4–11 Hz
brightness flicker, and smaller embers rising faster than large ones so the field
doesn't move as one sheet. Count 26 → 38.

### Still open

- **Display face.** Archivo Expanded is in place and working, but a five-way
  comparison (Archivo / Bricolage Grotesque / Syne / Anybody / Unbounded) was
  rendered in the real hero copy and the recommendation is **Syne Extrabold for
  display, Archivo for body** — its geometric forms oppose the brush script rather
  than sitting in a mushy middle. Not applied; awaiting a decision.

---

## 11. Cleanup, lint and Syne — 2026-08-04 (final)

### The webfonts were never actually rendering

Found while verifying the Syne switch: `--font-display` and `--font-ui` were
composed in `:root` from `var(--font-syne)` / `var(--font-archivo)`, but
`next/font` was applying those variables to **`<body>`**. `:root` is `<html>`, so
the `var()` inside them resolved against an undefined value, the compositions
became invalid at computed-value time, and every element fell back to Tailwind
preflight's `ui-sans-serif` stack.

**The whole site had been rendering in the macOS system font** since `--font-ui`
was introduced, silently — no error, no warning. Every visual review in §9 and §10
was judging SF Pro, not Archivo. Fixed by moving the font variable classes to
`<html>`. Verified: h1/h2/address → Syne, body/nav → Archivo, wordmark → Kaushan.

The five-way comparison in §10 was unaffected — it loaded fonts directly from the
Google CDN rather than through the token chain, so that judgement still stands.

### Display face: Syne

Applied. Syne (600/700/800) for headings, game titles and the contact address;
Archivo for all running text and UI. The `wdth` axis tokens are gone — Syne is
weight-variable only.

### Dead weight removed

| Removed | Why |
|---|---|
| `components/` (50 shadcn files + theme-provider) | nothing in `app/` imported any of it |
| `hooks/`, `lib/utils.ts` | only used by the above |
| ~35 dependencies (all Radix, recharts, cmdk, embla, vaul, zod, react-hook-form, sonner, date-fns, lucide, react-icons…) | dependencies of the deleted library |
| `ecio_screenshot.png`, `tt_screenshot.png` | unreferenced since the cards moved to app icons |
| five `placeholder.*` files | v0 scaffolding |
| `app-ads.txt` | mobile ad-network file for retired store listings; founder confirmed redundant |
| two tracked `.DS_Store` files | — |
| shadcn theme scaffolding in `tailwind.config.ts` | Tailwind is now kept only for its preflight reset; there are no utility classes in `app/` |

**Deployed payload: 5.0 MB → 2.0 MB.**

### Lint now works

`npm run lint` previously did nothing but prompt to configure ESLint. Added
`.eslintrc.json` extending `next/core-web-vitals`.

It found **28 real errors** — unescaped `"` and `'` in the legal-page prose. Fixed
by converting them to proper typographic entities (`&ldquo;` / `&rdquo;` /
`&rsquo;`), which is the correct typesetting for that copy anyway.

`@next/next/no-img-element` is switched off with a documented reason: this is a
static export with `images.unoptimized`, so `next/image` does no optimisation and
only adds weight. Plain `<img>` is correct.

> **Consequence to be aware of:** `next build` runs ESLint, and
> `eslint.ignoreDuringBuilds` lives in the **dead** `next.config.mjs`. So a future
> lint error will now fail the deploy. Currently clean. Merging the two configs
> resolves this either way.

### Two findings that are still open

1. **`next.config.js` and `next.config.mjs` both exist; only `.js` is loaded.**
   `output: "export"` comes from `.js`. Everything in `.mjs` — including both
   "ignore errors" escape hatches — is inert. Merge them.
2. **The repo-root `CNAME` is not deployed.** The workflow uploads
   `pretty-awesome-games/out`; `CNAME` is outside it. The custom domain lives in
   **repo Settings → Pages**. §1's "Update `CNAME`" task is a no-op — retarget the
   domain in Settings instead.

Also still missing: an **Open Graph image**. Links shared to press or Discord
render as a bare text card.

---

## 12. Open items closed — 2026-08-04

### Next config merged

`next.config.js` deleted; everything now lives in **`next.config.mjs`**, which is
the only config file. Verified the export still produces `/out` afterwards.

**Type and lint errors now fail the build, deliberately.** The old `.mjs` set both
`ignoreBuildErrors` and `ignoreDuringBuilds` to `true`, but that file was never
loaded, so errors have always failed in practice — and the repo is clean under
both today. Keeping it strict means a broken push fails in CI instead of silently
deploying a broken site. Both flags are one-line flips if a deadline needs them.

Dropped in the merge: the `v0-user-next.config` import shim (that file doesn't
exist) and the three `experimental` build flags (never active, unproven here).

### Open Graph image

`public/og.png`, 1200×630, rendered with headless Chrome from a source file kept
at `scratchpad/og.html`. Composition is the hero's: the wordmark large with its
burning tittle, ruled practice-paper guides, the tagline, and the fuse running
along the bottom edge with the ember on its leading tip. Regenerate with:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --virtual-time-budget=6000 --screenshot=og.png --window-size=1200,630 file://…/og.html
```

Wired into `layout.tsx` along with `metadataBase`, `og:*`, a
`summary_large_image` Twitter card, and a title template (`%s — Iskra Games`).

> `metadataBase` resolves to `SITE_URL` — the **new** domain. Correct after the
> Pages cutover; until then shared links reference a domain that isn't live.
> One place to change: `SITE_DOMAIN` in `app/lib/brand.ts`.

### robots.txt and sitemap.xml

The site never had either. Added `app/robots.ts` and `app/sitemap.ts`, which the
static export emits as real files. `/oauth2redirect` is excluded from both — it
exists only to complete an OAuth handshake.

### Also

`.DS_Store` added to `.gitignore` and the tracked ones removed from the index.

### What is still genuinely blocked

| Item | Blocked on |
|---|---|
| `CNAME` / custom domain | founder — will confirm when ready. **Change it in repo Settings → Pages, not the `CNAME` file** (§11) |
| `contact@iskragames.com` | domain purchase, then a real mailbox |
| Trademark + app-store name checks | founder |
| ECIO Steam link | no Steam page yet |
| Social links | none exist; the row is omitted entirely |
| Committing | founder asked to hold |

---

## 13. Hero background — cursor as heat source, 2026-08-04

Founder asked whether the embers were enough or whether the hero could feel more
like a game, with a "wow factor".

**Diagnosis: the embers were conceptually right but passive.** Rising particles —
snow, dust, stars, embers — are a genre default on every landing page, and nothing
on the page reacted to the visitor. "Wow" on the modern web comes from reactivity,
not from a better ambient loop.

So the effect wasn't replaced, it was **made reactive**. One idea, extending the
existing one rather than adding a fifth:

- **The pointer carries a warm light** that lags behind the cursor — heat has
  weight, it doesn't snap to position.
- **Embers within ~190px flare and ride the draught**, pushed up and outward.
- **Clicking strikes a burst of 26–36 sparks** that arc up and fall away.
- **Layered-sine pseudo-turbulence** replaced the single sway, so embers eddy in
  convection currents instead of wobbling mechanically.

Why this and not something else: a spark is light in the dark, so a light you
carry through a dark room is the brand's own idea rather than a bolted-on effect —
and carrying a torch through darkness is a game mechanic, which answers the
"game feel" ask directly without turning the hero into a tech demo.

Constraints kept: `(pointer: fine)` only for the light (touch has no hover state),
paused off-screen and on hidden tabs, nothing at all under reduced motion, one
canvas layer, burst particles hard-capped.

---

## 14. Domain cutover — `iskragames.com`

Purchased on Porkbun, 2026-08-04. Repo is `Luddzik/Luddzik.github.io`, so the
GitHub Pages default domain is **`luddzik.github.io`**.

Apex (`iskragames.com`) is the canonical host — `brand.ts`, `metadataBase`,
`sitemap.xml` and `robots.txt` all already emit `https://iskragames.com`. `www`
gets a CNAME so GitHub can auto-redirect it to the apex.

### 1. DNS at Porkbun

**Delete Porkbun's default parking records first** (the `A` / `ALIAS` / `CNAME`
entries for `@` and `www` that ship with a new domain), or they will conflict.
There are no MX or TXT records to preserve yet.

Then add:

| Type | Host | Answer |
|---|---|---|
| `ALIAS` | *(blank / `@`)* | `luddzik.github.io` |
| `CNAME` | `www` | `luddzik.github.io` |

`ALIAS` is preferred over four `A` records because it tracks GitHub's IPs if they
ever change. Porkbun supports it. If you'd rather pin them, the A/AAAA sets are:

```
A     185.199.108.153   185.199.109.153   185.199.110.153   185.199.111.153
AAAA  2606:50c0:8000::153  2606:50c0:8001::153  2606:50c0:8002::153  2606:50c0:8003::153
```

### 2. GitHub

Repo → **Settings → Pages → Custom domain** → `iskragames.com` → Save. GitHub runs
a DNS check on save; if DNS hasn't propagated it fails, so do step 1 first and give
it a few minutes.

Then wait for the TLS certificate to issue (usually minutes, up to 24h) and tick
**Enforce HTTPS**. Ticking it before the cert exists just errors.

### 3. Retire the old domain

**A repo can only have one custom domain.** Setting `iskragames.com` means
`www.prettyawesomegames.com` stops serving — this is a hard cutover, not a period
where both work.

So at the old domain's registrar: remove the records pointing at GitHub Pages
(otherwise it serves a 404) and replace them with **URL forwarding to
`https://iskragames.com`**, so existing links and any search rankings survive.

**Keep the old domain registered** regardless — see §11 on why letting it lapse is
an account-takeover risk while any account still uses an `@prettyawesomegames.com`
address.

### 4. Nothing to change in code

`SITE_DOMAIN` in `app/lib/brand.ts` was already `iskragames.com`, so the metadata,
OG tags, sitemap and legal pages were all correct in advance.

**The root `CNAME` file stays** (owner decision, 2026-08-04) and still reads
`www.prettyawesomegames.com`. Update it to `iskragames.com` as part of the cutover
so it doesn't contradict Settings → Pages. Note that at the repo root it sits
outside the uploaded artifact (`pretty-awesome-games/out`), so it is a record of
intent rather than the mechanism — if it should actually be served, move it to
`pretty-awesome-games/public/CNAME`.

### Still to come

Email on the new domain (§ the Porkbun-vs-Workspace decision), then update
`CONTACT_EMAIL` in `brand.ts` if the address ends up as anything other than
`contact@`.
