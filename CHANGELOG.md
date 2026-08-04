# Changelog

## 2026-08-03 — Rebrand to Iskra Games + site redesign

Nothing in this entry is committed. The working tree holds the full change set.

Design rationale and the decisions behind all of this live in `REBRAND.md`; this file
is the record of what changed in the code and how to review it.

**Scale:** 31 tracked files changed (+352 / −1391). 8 genuinely new source files, 5 CSS
modules rewritten from scratch, 8 components deleted, 4 binary assets removed.

---

### Two rounds, one diff

This happened in two passes on the same day. The diff only shows the end state, so if
you watched the first version go by, note that it is gone:

1. **First pass** — implemented the plan recorded in `REBRAND.md` §3–§4: "ISKRA" in
   Space Grotesk with a spark-gap `I`, a three-stop ember gradient, Inter body text,
   and a hero built from a pill eyebrow, a tech grid, a radial bloom and a gradient
   CTA.
2. **Second pass** — you rejected that logo and asked for calligraphy plus a general
   "modern and appealing" pass. The mark, the palette, the type stack and the hero
   were all replaced. The rejected direction is preserved in `REBRAND.md` §3 inside a
   collapsed block so it doesn't get proposed again.

---

### Brand identity

| | |
|---|---|
| **Logo** | Lowercase "iskra" in Kaushan Script, tittle on the i burning as an ember |
| **Headings** | Fraunces |
| **Body / UI** | Karla |
| **Surfaces** | `#0e0e12` · `#16161b` · `#0a0a0d` — flat, no gradients |
| **Ink** | `#f2ede6` warm off-white, `#a09a92` dim, `#6b6660` faint |
| **Accent** | `#ff5a1f` ignition orange, flat, used sparingly |

**New — `app/components/Wordmark.tsx` + `.module.css`**
Renders the mark. The ember is not a circle drawn on top: a second copy of the word is
stacked over the first, painted with the ember via `background-clip: text`, then
clipped to the tittle alone. The glowing dot is therefore the font's own dot and stays
registered at every size. A positioned circle was tried first and drifted at display
size — don't go back to it. Accepts a number (px) or any CSS length, so the hero passes
a `clamp()` for fluid sizing; `stacked` adds the tracked GAMES line for the footer.

**New — `app/components/SparkDot.tsx` + `.module.css`**
The same ember reused as punctuation: before every section eyebrow, as the full stop
after every section heading. This is what carries the brand past the header so the logo
isn't a one-off asset.

**Replaced — `public/favicon.svg`**
The brush "i" with its burning tittle, drawn as hand-authored SVG paths so it carries no
font dependency. This is the reason the mark is lowercase: the previous version's spark
was a thin stroke that vanished at 16px, whereas a stem plus a dot survives.

---

### Sections

`app/page.tsx` composes **Header → Hero → Games → Studio → Contact → Footer**.

- **Hero** — rebuilt. The wordmark itself is now the dominant visual, set large over
  faint ruled guide lines (brush lettering is written against guides). The pill eyebrow,
  tech grid, radial bloom and gradient CTA were all cut — that vocabulary reads as
  generic SaaS and fought the hand-lettered brand. One declarative line in Fraunces, one
  flat outline CTA.
- **Games** — two wide editorial cards with ruled status/platform metadata. No store
  links. ECIO Reborn uses its screenshot; Most Said gets a bespoke four-slot panel in
  its own `#0d0618` / `#ffd23d` palette, since no key art exists yet.
- **Studio** — new section replacing Career. Positioning copy plus a ruled fact list.
- **Contact** — the email address *is* the call to action, set large in Fraunces with a
  wipe underline. No button, no gradient pill.
- **Footer** — stacked lockup, legal links, copyright.

**New — `app/components/Section.module.css`** holds the shared eyebrow / heading / lede
furniture, imported by Games, Studio and Contact rather than duplicated three times.

---

### Content and configuration

- **`app/lib/brand.ts`** (new) — studio name, domain and contact address in one place,
  so the legal pages can't drift out of sync. Import from here rather than hardcoding.
- **Legal pages** (`privacy-policy`, `terms`, `oauth2redirect`) — brand strings only:
  "Pretty Awesome Games" → "Iskra Games", `prettyawesomegames.com` → `iskragames.com`.
  Their layout was untouched and still renders correctly on the new palette.
- **`package.json`** — name `my-v0-project` → `iskra-games-site`.
- **`CLAUDE.md`** — updated so future sessions don't reintroduce the old system. It now
  states explicitly that there are no gradients in this design and how the wordmark
  works.

### Removed

- Components: `About`, `AboutContact`, `Career`, `BackgroundPaths` (+ their CSS
  modules). `BackgroundPaths` turned out to be used by `app/oauth2redirect/page.tsx`,
  not unused as the plan assumed — that usage was removed with it.
- Assets: `logo_long.png`, `logo_long.svg`, `hollow-brawls-icon.png`,
  `hollow-brawls-icon-unreal.png` (~1.9 MB of retired branding).
- Throwaway `/logo-lab` exploration routes used to compare calligraphic candidates.

---

### Deliberately not done

- **`CNAME` is unchanged**, still `www.prettyawesomegames.com`. `iskragames.com` has not
  been bought. Repointing it now would take the live site down on the next push to
  `main` — it should move as part of the DNS cutover.
- **`contact@iskragames.com` is a placeholder.** That mailbox does not exist. It is a
  one-line change in `app/lib/brand.ts`.
- **`public/app-ads.txt`** left alone until the mobile listings are actually retired.
- No social links — the row was omitted rather than inventing accounts.
- No Steam URL for ECIO — its card shows a Steam platform tag with no outbound link.

---

### Verification

- `npm run build` — passes, 5 static routes.
- `npx tsc --noEmit` — clean. Worth running deliberately: `next.config.mjs` sets
  `ignoreBuildErrors: true`, so the build alone will not catch type errors.
- Every section checked in-browser at 1440px and 430px, plus the privacy policy page.

### Reviewing the diff

`git status` looks more alarming than the change actually is. Five CSS modules
(`Header`, `Hero`, `Games`, `Contact`, `Footer`) show as a staged deletion *and* an
untracked file at the same path, because they were removed and rewritten rather than
edited. Staging everything collapses each pair back into a normal modification.

Separately, and pre-existing rather than caused by this work: `pretty-awesome-games/.DS_Store`
and `pretty-awesome-games/public/.DS_Store` are tracked and not in any `.gitignore`, so
one of them shows as modified purely because files moved around in that directory. Worth
`git rm --cached`-ing both and adding `.DS_Store` to `.gitignore` before committing.
