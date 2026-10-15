import { findGame } from "./games"

/**
 * The home page is one fixed frame with views dissolving inside it, routed by
 * hash so it works on static hosting and every view stays deep-linkable:
 *
 *   #games  #company  #press  #contact      sections
 *   #<slug>                                 a game's page
 *   #<slug>/gameplay                        its footage
 *   #press-<anchor>                         a heading inside Press
 */
export type Section = "home" | "games" | "company" | "press" | "contact"

export type Route =
  | { kind: "section"; section: Section }
  | { kind: "game"; slug: string }
  | { kind: "gameplay"; slug: string }

const SECTIONS: Section[] = ["home", "games", "company", "press", "contact"]

export const NAV: { section: Section; label: string }[] = [
  { section: "games", label: "Games" },
  { section: "company", label: "Company" },
  { section: "press", label: "Press" },
  { section: "contact", label: "Contact" },
]

export const parseRoute = (hash: string): Route => {
  const name = decodeURIComponent(hash.replace(/^#/, ""))
  if (name.startsWith("press-")) return { kind: "section", section: "press" }
  if ((SECTIONS as string[]).includes(name)) return { kind: "section", section: name as Section }

  const [slug, sub] = name.split("/")
  const game = findGame(slug)
  if (game && sub === "gameplay" && game.footage) return { kind: "gameplay", slug }
  if (game) return { kind: "game", slug }
  return { kind: "section", section: "home" }
}

/** Stable key for a view — one per section, one per game, one per game's footage. */
export const routeKey = (route: Route) =>
  route.kind === "section" ? route.section : `${route.kind}:${route.slug}`

/** Which nav item a route lives under. Game pages belong to Games. */
export const navSection = (route: Route): Section =>
  route.kind === "section" ? route.section : "games"

export const routeTitle = (route: Route) => {
  if (route.kind === "section") {
    return route.section === "home"
      ? "Iskra Games"
      : `${route.section[0].toUpperCase()}${route.section.slice(1)} — Iskra Games`
  }
  const title = findGame(route.slug)?.title ?? ""
  return route.kind === "gameplay"
    ? `${title} gameplay — Iskra Games`
    : `${title} — Iskra Games`
}
