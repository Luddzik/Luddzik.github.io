"use client"

import type React from "react"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import SiteHeader from "./SiteHeader"
import SiteFooter from "./SiteFooter"
import Wordmark from "./Wordmark"
import HomeView from "./views/HomeView"
import GameView from "./views/GameView"
import {
  CompanyView,
  ContactView,
  GameplayView,
  GamesIndexView,
  PressView,
} from "./views/ContentViews"
import { games } from "../lib/games"
import { inert } from "../lib/inert"
import { navSection, parseRoute, routeKey, routeTitle, type Route } from "../lib/routes"
import styles from "./Shell.module.css"

interface ViewDef {
  key: string
  label: string
  kind: "home" | "content" | "game"
  render: (active: boolean) => React.ReactNode
}

const VIEWS: ViewDef[] = [
  { key: "home", label: "Games", kind: "home", render: (a) => <HomeView active={a} /> },
  { key: "games", label: "Games", kind: "content", render: () => <GamesIndexView /> },
  { key: "company", label: "Company", kind: "content", render: () => <CompanyView /> },
  { key: "press", label: "Press and media", kind: "content", render: () => <PressView /> },
  { key: "contact", label: "Contact", kind: "content", render: () => <ContactView /> },
  ...games.map<ViewDef>((game) => ({
    key: `game:${game.slug}`,
    label: game.title,
    kind: "game",
    render: (a) => <GameView game={game} active={a} />,
  })),
  ...games
    .filter((game) => game.footage)
    .map<ViewDef>((game) => ({
      key: `gameplay:${game.slug}`,
      label: `${game.title} gameplay`,
      kind: "content",
      render: (a) => <GameplayView game={game} active={a} />,
    })),
]

const EASE = "cubic-bezier(.22,.61,.36,1)"
const SESSION_KEY = "iskra-entered"

const HOME: Route = { kind: "section", section: "home" }

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * The home page: a stationary frame — header and footer never move — with
 * views dissolving inside it, the way a game's front end works. Routing is by
 * hash (see lib/routes.ts) so it runs on static hosting and every view is a
 * real, shareable link.
 *
 * A route change keeps the old scene fully painted underneath, dissolves the
 * new one in over 640ms, and moves text separately — the old text leaves fast,
 * the new arrives late — so paragraphs never sit superimposed mid-fade. Rapid
 * clicks always settle on the latest route.
 *
 * The first visit of a session opens with the entrance: the wordmark is
 * drawn, a diagonal cut opens into the real home page (not a loading image),
 * and the mark flies up into the header. Skippable, and absent under reduced
 * motion, on deep links and on repeat visits.
 */
const Shell: React.FC = () => {
  const [route, setRoute] = useState<Route>(HOME)
  const [leaving, setLeaving] = useState<string | null>(null)
  const [intro, setIntro] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLAnchorElement>(null)
  const entranceLogoRef = useRef<HTMLDivElement>(null)
  const cutRef = useRef<HTMLSpanElement>(null)
  const viewRefs = useRef(new Map<string, HTMLElement>())

  const activeKey = routeKey(route)
  const activeKeyRef = useRef(activeKey)
  const routeVersion = useRef(0)
  const routeAnimations = useRef<Animation[]>([])
  const introAnimations = useRef<Animation[]>([])
  const scrollPositions = useRef(new Map<string, number>())
  /** What the next layout pass has to do once React has committed the new route. */
  const pending = useRef<{
    from: string | null
    to: string
    initial: boolean
    animate: boolean
    hash: string
  } | null>(null)

  const textGroups = (view: HTMLElement | undefined) =>
    view ? Array.from(view.querySelectorAll<HTMLElement>("[data-tgroup]")) : []

  /* ---------- Entrance ---------- */

  const finishIntro = useCallback(() => {
    introAnimations.current.forEach((animation) => animation.cancel())
    introAnimations.current = []
    document.documentElement.removeAttribute("data-intro")
    setIntro(false)
  }, [])

  /* ---------- Routing ---------- */

  const go = useCallback(
    (initial: boolean) => {
      const hash = window.location.hash.slice(1)
      const next = parseRoute(window.location.hash)
      const to = routeKey(next)
      const from = activeKeyRef.current

      document.querySelectorAll("video").forEach((video) => video.pause())
      routeAnimations.current.forEach((animation) => animation.cancel())
      routeAnimations.current = []

      const fromEl = viewRefs.current.get(from)
      if (fromEl && from !== to) scrollPositions.current.set(from, fromEl.scrollTop)

      activeKeyRef.current = to
      routeVersion.current++
      pending.current = {
        from: from === to ? null : from,
        to,
        initial,
        animate: !initial && from !== to && !reducedMotion(),
        hash,
      }
      setRoute(next)
      setLeaving(pending.current.animate ? from : null)
    },
    [],
  )

  /* Runs after React has shown the new view and before the browser paints it. */
  useLayoutEffect(() => {
    const job = pending.current
    if (!job) return
    pending.current = null
    const version = routeVersion.current

    const next = viewRefs.current.get(job.to)
    const previous = job.from ? viewRefs.current.get(job.from) : undefined
    if (!next) return

    document.title = routeTitle(route)
    if (job.from) next.scrollTop = scrollPositions.current.get(job.to) ?? 0
    if (job.hash.startsWith("press-")) {
      document.getElementById(job.hash)?.scrollIntoView({ block: "start" })
    }
    /* Overflow:hidden still scrolls programmatically; keep the frame pinned. */
    if (mainRef.current) {
      mainRef.current.scrollTop = 0
      mainRef.current.scrollLeft = 0
    }
    if (job.from && !job.initial) next.focus({ preventScroll: true })

    if (!job.animate || !previous) return

    const animate = (el: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = el.animate(frames, options)
      routeAnimations.current.push(animation)
      return animation
    }

    textGroups(previous).forEach((el) =>
      animate(el, [{ opacity: 1 }, { opacity: 0 }], { duration: 130, fill: "both" }),
    )
    animate(next, [{ opacity: 0 }, { opacity: 1 }], { duration: 640, easing: EASE, fill: "both" })
    textGroups(next).forEach((el) =>
      animate(el, [{ opacity: 0 }, { opacity: 1 }], {
        delay: 170,
        duration: 430,
        easing: "ease-out",
        fill: "both",
      }),
    )
    /* Entering a game, its world settles from slightly too close — a camera arriving. */
    const scene = next.querySelector("[data-scene]")
    if (scene) {
      animate(scene, [{ transform: "scale(1.06)" }, { transform: "scale(1)" }], {
        duration: 1400,
        easing: EASE,
        fill: "both",
      })
    }

    Promise.all(routeAnimations.current.map((a) => a.finished.catch(() => undefined))).then(() => {
      if (version !== routeVersion.current) return
      routeAnimations.current.forEach((animation) => animation.cancel())
      routeAnimations.current = []
      setLeaving(null)
    })
  }, [route, leaving])

  /* First mount: adopt the URL's route, then decide on the entrance. */
  useLayoutEffect(() => {
    go(true)
    document.documentElement.removeAttribute("data-route-pending")
    /* The inline script in layout.tsx already decided; its flag is the source of truth. */
    if (document.documentElement.hasAttribute("data-intro")) setIntro(true)
    try {
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      /* Private mode — the intro will simply play again next time. */
    }
  }, [go])

  /* Build the entrance once its overlay is in the DOM, then release the hidden frame. */
  useLayoutEffect(() => {
    if (!intro) return
    const root = rootRef.current
    const home = viewRefs.current.get("home")
    const logo = entranceLogoRef.current
    const cut = cutRef.current
    const brand = brandRef.current?.querySelector("svg")
    const main = mainRef.current
    if (!root || !home || !logo || !cut || !brand || !main) {
      finishIntro()
      return
    }

    const target = brand.getBoundingClientRect()
    const startTop = window.innerHeight * 0.45
    logo.style.width = `${target.width}px`
    logo.style.left = `${target.left}px`
    logo.style.top = `${startTop}px`
    const travel = target.top - startTop

    const bounds = main.getBoundingClientRect()
    const seamAngle = (Math.atan((window.innerWidth * 0.2) / bounds.height) * 180) / Math.PI
    cut.style.left = `${window.innerWidth * 0.6}px`
    cut.style.top = `${bounds.top}px`
    cut.style.height = `${bounds.height}px`
    const seam = `skewX(-${seamAngle}deg)`

    const opts = { fill: "both" as FillMode, easing: EASE }
    const list = introAnimations.current
    const animate = (el: Element, frames: Keyframe[], options: KeyframeAnimationOptions) =>
      list.push(el.animate(frames, { ...opts, ...options }))

    animate(
      logo,
      [
        { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, clipPath: "inset(0 0% 0 0)" },
      ],
      { duration: 650 },
    )
    animate(logo, [{ transform: "translateY(0)" }, { transform: `translateY(${travel}px)` }], {
      delay: 850,
      duration: 1000,
    })
    animate(logo, [{ opacity: 1 }, { opacity: 0 }], { delay: 1800, duration: 250 })
    animate(
      cut,
      [
        { transform: `${seam} scaleY(0)`, opacity: 0 },
        { transform: `${seam} scaleY(1)`, opacity: 0.6 },
        { transform: `${seam} scaleY(1)`, opacity: 0 },
      ],
      { duration: 1250 },
    )
    animate(
      home,
      [
        { clipPath: "polygon(60% 0%,60% 0%,60% 0%,60% 0%)", offset: 0 },
        { clipPath: "polygon(59% 0%,61% 0%,41% 100%,39% 100%)", offset: 0.28 },
        { clipPath: "polygon(48% 0%,76% 0%,56% 100%,28% 100%)", offset: 0.6 },
        { clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)", offset: 1 },
      ],
      { delay: 300, duration: 1900 },
    )
    root.querySelectorAll(":scope > header, :scope > footer").forEach((el) =>
      animate(el, [{ opacity: 0 }, { opacity: 1 }], { delay: 1650, duration: 650 }),
    )
    textGroups(home).forEach((el) =>
      animate(el, [{ opacity: 0 }, { opacity: 1 }], { delay: 1800, duration: 600 }),
    )

    /* Every animation now holds its first frame, so the CSS gate can come off. */
    document.documentElement.removeAttribute("data-intro")

    let cancelled = false
    Promise.all(list.map((a) => a.finished.catch(() => undefined))).then(() => {
      if (!cancelled) finishIntro()
    })
    return () => {
      cancelled = true
    }
  }, [intro, finishIntro])

  /* ---------- Global listeners ---------- */

  useEffect(() => {
    const onHash = () => {
      finishIntro()
      go(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      if (intro) {
        finishIntro()
        return
      }
      /* The open mobile menu takes Escape for itself. */
      if (document.querySelector('[aria-controls="primary-navigation"][aria-expanded="true"]')) return
      const current = parseRoute(window.location.hash)
      if (current.kind === "gameplay") window.location.hash = current.slug
      else if (current.kind === "game") window.location.hash = "home"
    }
    const onVisibility = () => {
      if (document.hidden) {
        finishIntro()
        document.querySelectorAll("video").forEach((video) => video.pause())
      }
    }
    const onResize = () => {
      if (intro) finishIntro()
    }
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onMotion = () => finishIntro()

    window.addEventListener("hashchange", onHash)
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibility)
    motionQuery.addEventListener("change", onMotion)
    return () => {
      window.removeEventListener("hashchange", onHash)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      motionQuery.removeEventListener("change", onMotion)
    }
  }, [go, finishIntro, intro])

  const skipToContent = (event: React.MouseEvent) => {
    event.preventDefault()
    viewRefs.current.get(activeKeyRef.current)?.focus()
  }

  const viewClass = { home: styles.home, content: styles.content, game: styles.game }
  const current = navSection(route)

  return (
    <div ref={rootRef} className={styles.shell}>
      <a className={styles.skip} href="#home" onClick={skipToContent}>
        Skip to content
      </a>

      <SiteHeader current={current === "home" ? undefined : current} brandRef={brandRef} />

      <main ref={mainRef} className={styles.main} {...inert(intro)}>
        {VIEWS.map((view) => {
          const isActive = view.key === activeKey
          const visible = isActive || view.key === leaving
          return (
            <section
              key={view.key}
              ref={(el) => {
                if (el) viewRefs.current.set(view.key, el)
                else viewRefs.current.delete(view.key)
              }}
              className={`${styles.view} ${viewClass[view.kind]}`}
              data-view={view.key}
              aria-label={view.label}
              tabIndex={-1}
              hidden={!visible}
              style={{ zIndex: isActive ? 2 : visible ? 1 : 0 }}
              {...inert(!isActive)}
            >
              {view.render(isActive)}
            </section>
          )
        })}
      </main>

      <SiteFooter variant="frame" />

      <div className={styles.entrance} hidden={!intro}>
        <div ref={entranceLogoRef} className={styles.entranceLogo}>
          <Wordmark width="100%" title="Iskra Games" />
        </div>
        <span ref={cutRef} className={styles.cut} aria-hidden="true" />
        <button type="button" className={styles.skipIntro} onClick={finishIntro}>
          Skip intro ↗
        </button>
      </div>
    </div>
  )
}

export default Shell
