/**
 * The lineup. This array is the only place the games are enumerated — the home
 * slashes, the Games index, each game's own page, the Press kit and the footer's
 * store link are all derived from it. Never write copy elsewhere that counts
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
  /** Where players can get or wishlist the game — its store page. */
  store?: { label: string; href: string }
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
   * Key of this game's own background animation in `components/ambience/`.
   * Every game gets a unique one, drawn behind its characters.
   */
  ambience: string
  screenshots: Screenshot[]
  /** The trailer on YouTube — embedded on the game's gameplay page, loaded only on play. */
  footage?: { youtubeId: string; poster: string }
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
      { label: "Availability", value: "In development · Wishlist on Steam" },
    ],
    store: { label: "Wishlist on Steam", href: "https://store.steampowered.com/app/5451690/NEUROSHIFT/" },
    art: {
      world: "/media/neuroshift/world.webp",
      characters: "/media/neuroshift/crew.webp",
      alt: "The NeuroShift squad — three units over an alien city",
    },
    ambience: "neuroshift",
    screenshots: [
      {
        src: "/media/neuroshift/auto-battle.webp",
        download: "/media/neuroshift/neuroshift-auto-battle.jpg",
        label: "Combat, auto battle",
        alt: "NeuroShift combat on auto battle",
      },
      {
        src: "/media/neuroshift/command-deck.webp",
        download: "/media/neuroshift/neuroshift-command-deck.jpg",
        label: "Combat, command deck",
        alt: "NeuroShift combat with the command deck open",
      },
      {
        src: "/media/neuroshift/loadout.webp",
        download: "/media/neuroshift/neuroshift-loadout.jpg",
        label: "Swapping a weapon part",
        alt: "NeuroShift weapon swap comparing part stats",
      },
      {
        src: "/media/neuroshift/survey.webp",
        download: "/media/neuroshift/neuroshift-survey.jpg",
        label: "The Survey",
        alt: "NeuroShift survey map choosing the next contact",
      },
      {
        src: "/media/neuroshift/strike.webp",
        download: "/media/neuroshift/neuroshift-strike.jpg",
        label: "Combat, a strike lands",
        alt: "NeuroShift combat with a strike landing",
      },
      {
        src: "/media/neuroshift/assembly.webp",
        download: "/media/neuroshift/neuroshift-assembly.jpg",
        label: "Squad assembly",
        alt: "NeuroShift squad assembly with fitted parts",
      },
      {
        src: "/media/neuroshift/base.webp",
        download: "/media/neuroshift/neuroshift-base.jpg",
        label: "The base",
        alt: "NeuroShift base interior",
      },
      {
        src: "/media/neuroshift/preparation.webp",
        download: "/media/neuroshift/neuroshift-preparation.jpg",
        label: "Preparation",
        alt: "NeuroShift squad preparation before a descent",
      },
      {
        src: "/media/neuroshift/extract.webp",
        download: "/media/neuroshift/neuroshift-extract.jpg",
        label: "Extract or go deeper",
        alt: "NeuroShift survey choosing to extract or go deeper",
      },
    ],
    footage: {
      youtubeId: "crmBUCCD96g",
      poster: "/media/neuroshift/trailer.webp",
    },
    factSheet: "/media/neuroshift/neuroshift-facts.txt",
  },
]

/** How many games get a slash on the home page; the rest live on the Games index. */
export const FEATURED_LIMIT = 3

export const featuredGames = games.slice(0, FEATURED_LIMIT)

/** The footer's store link goes to the first game that has a store page. */
export const storeGame = games.find((game) => game.store)

export const findGame = (slug: string) => games.find((game) => game.slug === slug)
