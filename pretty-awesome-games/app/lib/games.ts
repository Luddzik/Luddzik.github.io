/**
 * The lineup. This array is the only place the games are enumerated — the home
 * slashes, the Games index, each game's own page, the Press kit and the footer's
 * "play now" link are all derived from it. Never write copy elsewhere that counts
 * the games; it goes stale the day the next project starts.
 *
 * Echoes of Stone must not appear here, in any form (REBRAND.md §2).
 */

export interface Fact {
  label: string
  value: string
}

export interface Screenshot {
  /** Web-sized image shown on the page. */
  src: string
  /** Full-resolution original offered as the download. */
  download: string
  label: string
  alt: string
}

export interface Game {
  /** Also the hash route of the game's page: `#neuroshift`. */
  slug: string
  title: string
  /** Small tracked caps above the title on the home slash. */
  kicker: string
  /** The two short lines under the title on the home slash. */
  lines: [string, string]
  tagline: string
  description: string
  /** Genre / Status / Platform — what press scans for. Shown on the game page and the index. */
  meta: Fact[]
  /** Longer form of the same, for the press kit. */
  pressFacts: Fact[]
  demo?: { label: string; href: string }
  /** What exists but isn't linkable yet. */
  note?: string
  art: {
    /** Full-bleed environment behind the characters. */
    world: string
    /** Transparent character group, composited over the world. */
    characters: string
    alt: string
  }
  /**
   * Particle colours for the game page's ambient VFX, taken from the key art so
   * the effect reads as part of the game's world rather than the studio's.
   */
  palette: string[]
  screenshots: Screenshot[]
  footage?: { src: string; poster: string }
  /** Plain-text fact sheet for press. */
  factSheet?: string
}

export const games: Game[] = [
  {
    slug: "neuroshift",
    title: "NeuroShift",
    kicker: "In development / PC",
    lines: ["Turn-based squad tactics.", "Built from what you kill."],
    tagline: "Build your squad from what you kill.",
    description:
      "Take a crew down the lift, tear parts off the machines you destroy, bolt them onto your own units, and decide how deep you dare to go — nothing you carry is yours until you ride back up.",
    meta: [
      { label: "Status", value: "In development" },
      { label: "Genre", value: "Turn-based squad tactics" },
      { label: "Platform", value: "PC (Steam)" },
      { label: "Players", value: "Offline single player" },
    ],
    pressFacts: [
      { label: "Developer", value: "Iskra Games · Poland" },
      { label: "Genre", value: "Turn-based squad-tactics roguelite" },
      { label: "Platform / mode", value: "PC (Steam) · Offline single player" },
      { label: "Availability", value: "In development · Free demo on itch.io" },
    ],
    demo: { label: "Play the free demo", href: "https://luddzik.itch.io/neuroshift" },
    note: "Steam page coming soon.",
    art: {
      world: "/media/neuroshift/world.webp",
      characters: "/media/neuroshift/crew.webp",
      alt: "The NeuroShift squad — three units over an alien city",
    },
    palette: ["#3fd8ff", "#9dff4a", "#ff4fd8", "#ed874b"],
    screenshots: [
      {
        src: "/media/neuroshift/combat.webp",
        download: "/media/neuroshift/neuroshift-combat.png",
        label: "Gameplay screenshot",
        alt: "NeuroShift combat screenshot",
      },
      {
        src: "/media/neuroshift/assembly.webp",
        download: "/media/neuroshift/neuroshift-assembly.png",
        label: "Squad assembly",
        alt: "NeuroShift squad assembly screenshot",
      },
    ],
    footage: {
      src: "/media/neuroshift/neuroshift-gameplay.mp4",
      poster: "/media/neuroshift/combat.webp",
    },
    factSheet: "/media/neuroshift/neuroshift-facts.txt",
  },
]

/** How many games get a slash on the home page; the rest live on the Games index. */
export const FEATURED_LIMIT = 3

export const featuredGames = games.slice(0, FEATURED_LIMIT)

/** The footer's "play now" link goes to the first game with something playable. */
export const playableGame = games.find((game) => game.demo)

export const findGame = (slug: string) => games.find((game) => game.slug === slug)
