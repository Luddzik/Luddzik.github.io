"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import styles from "./AmbientSparks.module.css"

interface AmbientSparksProps {
  /** Particle colours, as hex. Taken from the game's own key art. */
  palette: string[]
  /** Only the visible view runs its canvas; everything else is stopped, not just hidden. */
  active: boolean
  /** The viewer's "Pause background" choice. Freezes the last frame in place. */
  paused?: boolean
  /** Scales the ambient count. The home slashes run lighter than a game page. */
  density?: number
  className?: string
}

interface Mote {
  x: number
  y: number
  vx: number
  vy: number
  /** 0 = far, 1 = near. Near motes are bigger, faster, brighter and parallax more. */
  depth: number
  radius: number
  sprite: number
  alpha: number
  flicker: number
  flickerSpeed: number
  life: number
  lifeSpeed: number
  heat: number
  /** Out-of-focus foreground blobs: big, dim, slow. */
  bokeh: boolean
  /** Thrown by a click: dies fast, falls back, ignores the ambient cap. */
  burst: boolean
  /** Fast rising spark that draws a short trail. */
  streak: boolean
  px: number
  py: number
}

const MAX_AMBIENT = 95
const MAX_BOKEH = 9
const MAX_BURST = 70
/** One ambient mote per this many CSS px² — phones get a handful, not seventy. */
const PX2_PER_MOTE = 11000
const LIGHT_RADIUS = 220
/** It's a soft glow, not type; full retina density doubles fill cost for nothing. */
const MAX_DPR = 1.5

const random = (min: number, max: number) => min + Math.random() * (max - min)

const rgb = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

/** Two out-of-phase waves at different scales — reads as turbulence, not a sway. */
const turbulence = (x: number, y: number, t: number) =>
  Math.sin(x * 0.007 + t * 0.32) * Math.cos(y * 0.01 - t * 0.27) +
  0.5 * Math.sin(y * 0.016 + t * 0.47)

/**
 * Glow is pre-rendered once per colour and blitted with drawImage. `shadowBlur`
 * runs a gaussian per draw call and a per-frame `createRadialGradient` is nearly
 * as bad — both were measured dropping 20% of frames on this site before.
 */
const makeSprite = (color: string, size: number, stops: [number, number][]) => {
  const sprite = document.createElement("canvas")
  sprite.width = size
  sprite.height = size
  const sctx = sprite.getContext("2d")
  if (!sctx) return sprite
  const half = size / 2
  const gradient = sctx.createRadialGradient(half, half, 0, half, half, half)
  for (const [offset, alpha] of stops) gradient.addColorStop(offset, `rgba(${color}, ${alpha})`)
  sctx.fillStyle = gradient
  sctx.fillRect(0, 0, size, size)
  return sprite
}

/**
 * The game pages' living background: motes of the game's own colours drifting
 * up through three depths of field, a few out-of-focus blobs in the foreground,
 * the occasional fast spark with a trail — and the pointer carrying a light
 * through it, so nearby motes flare and ride its draught. Clicking strikes a
 * burst. It's the studio's spark idea, in each game's colours.
 *
 * Canvas, not DOM: animating this many positions per frame as elements would
 * thrash layout. Stopped entirely when its view isn't showing, when the tab is
 * hidden, and under prefers-reduced-motion (then it renders nothing at all).
 */
const AmbientSparks: React.FC<AmbientSparksProps> = ({
  palette,
  active,
  paused = false,
  density = 1,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const control = useRef<{ start: () => void; stop: () => void } | null>(null)
  const reduceMotion = useReducedMotion()
  const paletteKey = palette.join(",")

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const colors = paletteKey.split(",").map(rgb)
    const motes = colors.map((c) =>
      makeSprite(c, 64, [
        [0, 1],
        [0.18, 0.9],
        [0.45, 0.22],
        [1, 0],
      ]),
    )
    const blobs = colors.map((c) =>
      makeSprite(c, 128, [
        [0, 0.5],
        [0.55, 0.32],
        [0.8, 0.1],
        [1, 0],
      ]),
    )
    const lightSprite = makeSprite(colors[0], 256, [
      [0, 0.16],
      [0.45, 0.06],
      [1, 0],
    ])

    let width = 0
    let height = 0
    let ambientCount = 0
    let particles: Mote[] = []
    let bursts = 0
    let frame = 0
    let running = false
    let last = 0
    let clock = 0
    let streakTimer = random(1.5, 3)

    const target = { x: 0, y: 0 }
    const light = { x: 0, y: 0 }
    let lightAlpha = 0
    let pointerInside = false
    const finePointer = window.matchMedia("(pointer: fine)").matches
    let rectLeft = 0
    let rectTop = 0

    const spawn = (atBottom: boolean, bokeh = false): Mote => {
      const depth = bokeh ? 1 : Math.pow(Math.random(), 1.6)
      const radius = bokeh ? random(18, 42) : 0.8 + depth * 2.6
      return {
        x: random(0, width),
        y: atBottom ? height + random(10, 60) : random(0, height),
        vx: random(-5, 5),
        vy: bokeh ? -random(6, 14) : -(12 + depth * 46 + random(0, 14)),
        depth,
        radius,
        sprite: (Math.random() * colors.length) | 0,
        alpha: bokeh ? random(0.1, 0.2) : 0.4 + depth * 0.6,
        flicker: random(0, Math.PI * 2),
        flickerSpeed: bokeh ? random(0.4, 0.9) : random(3, 9),
        life: atBottom ? 0 : Math.random(),
        lifeSpeed: bokeh ? random(0.03, 0.06) : random(0.09, 0.2),
        heat: 0,
        bokeh,
        burst: false,
        streak: false,
        px: 0,
        py: 0,
      }
    }

    const spawnStreak = (): Mote => {
      const m = spawn(true)
      m.x = random(width * 0.25, width)
      m.vx = random(-30, 30)
      m.vy = -random(260, 420)
      m.depth = 1
      m.radius = random(1.1, 1.7)
      m.alpha = 0.9
      m.lifeSpeed = random(0.55, 0.8)
      m.streak = true
      m.px = m.x
      m.py = m.y
      return m
    }

    const spawnBurst = (x: number, y: number): Mote => {
      const angle = random(0, Math.PI * 2)
      const speed = random(40, 170)
      return {
        ...spawn(false),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - random(40, 110),
        depth: 1,
        radius: random(0.9, 2.4),
        alpha: random(0.7, 1),
        flickerSpeed: random(10, 20),
        life: 0,
        lifeSpeed: random(0.6, 1.1),
        heat: 1,
        burst: true,
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = rect.width
      height = rect.height
      rectLeft = rect.left
      rectTop = rect.top
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ambientCount = Math.max(
        10,
        Math.min(MAX_AMBIENT, Math.round(((width * height) / PX2_PER_MOTE) * density)),
      )
      const bokehCount = Math.min(MAX_BOKEH, Math.max(3, Math.round(ambientCount / 9)))
      particles = [
        ...Array.from({ length: ambientCount }, () => spawn(false)),
        ...Array.from({ length: bokehCount }, () => spawn(false, true)),
      ]
      bursts = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      const x = event.clientX - rectLeft
      const y = event.clientY - rectTop
      const inside = x >= 0 && x <= width && y >= 0 && y <= height
      pointerInside = inside && finePointer
      if (!inside) return
      target.x = x
      target.y = y
      if (lightAlpha === 0) {
        light.x = x
        light.y = y
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!running) return
      /* Clicks on links and buttons are navigation, not a strike. */
      if ((event.target as Element | null)?.closest?.("a, button, video")) return
      const x = event.clientX - rectLeft
      const y = event.clientY - rectTop
      if (x < 0 || x > width || y < 0 || y > height) return
      const count = Math.max(0, Math.min(random(24, 34) | 0, MAX_BURST - bursts))
      for (let i = 0; i < count; i++) particles.push(spawnBurst(x, y))
      bursts += count
    }

    const draw = (now: number) => {
      if (!running) return
      frame = requestAnimationFrame(draw)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      clock += dt

      light.x += (target.x - light.x) * Math.min(dt * 6, 1)
      light.y += (target.y - light.y) * Math.min(dt * 6, 1)
      lightAlpha += ((pointerInside ? 1 : 0) - lightAlpha) * Math.min(dt * 4, 1)

      streakTimer -= dt
      if (streakTimer <= 0) {
        particles.push(spawnStreak())
        bursts++
        streakTimer = random(0.9, 2.6)
      }

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = "lighter"

      if (lightAlpha > 0.01) {
        ctx.globalAlpha = lightAlpha
        ctx.drawImage(
          lightSprite,
          light.x - LIGHT_RADIUS,
          light.y - LIGHT_RADIUS,
          LIGHT_RADIUS * 2,
          LIGHT_RADIUS * 2,
        )
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += p.lifeSpeed * dt
        if (p.life >= 1) {
          if (p.burst || p.streak) {
            particles.splice(i, 1)
            bursts--
          } else {
            Object.assign(p, spawn(true, p.bokeh))
          }
          continue
        }

        p.px = p.x
        p.py = p.y
        if (!p.streak) {
          p.vx += turbulence(p.x, p.y, clock) * (6 + p.depth * 12) * dt
          p.vx *= 1 - Math.min(dt * 1.2, 1)
        }
        if (p.burst) p.vy += 160 * dt

        p.heat *= 1 - Math.min(dt * 2.2, 1)
        if (lightAlpha > 0.01 && !p.burst && !p.bokeh && !p.streak) {
          const dx = p.x - light.x
          const dy = p.y - light.y
          const d2 = dx * dx + dy * dy
          if (d2 < LIGHT_RADIUS * LIGHT_RADIUS && d2 > 0.001) {
            const dist = Math.sqrt(d2)
            const f = (1 - dist / LIGHT_RADIUS) * lightAlpha
            p.vx += (dx / dist) * f * 40 * dt
            p.vy -= f * 70 * dt
            if (f > p.heat) p.heat = f
          }
        }

        p.x += p.vx * dt
        p.y += p.vy * dt
        p.flicker += p.flickerSpeed * dt

        const fadeIn = Math.min(p.life / (p.burst ? 0.04 : 0.15), 1)
        const fadeOut = Math.min((1 - p.life) / (p.burst ? 0.5 : 0.35), 1)
        const flicker = p.bokeh ? 0.85 + 0.15 * Math.sin(p.flicker) : 0.7 + 0.3 * Math.sin(p.flicker)
        let alpha = p.alpha * fadeIn * fadeOut * flicker * (1 + p.heat * 1.4)
        if (alpha <= 0.01) continue
        if (alpha > 1) alpha = 1

        if (p.streak) {
          ctx.globalAlpha = alpha * 0.7
          ctx.strokeStyle = `rgba(${colors[p.sprite]}, 1)`
          ctx.lineWidth = p.radius
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.vx * 0.09, p.y - p.vy * 0.09)
          ctx.stroke()
        }

        const sprite = p.bokeh ? blobs[p.sprite] : motes[p.sprite]
        const size = p.bokeh ? p.radius * 2 : p.radius * (1 + p.heat * 0.6) * 9
        ctx.globalAlpha = alpha
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size)
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = "source-over"
    }

    const start = () => {
      if (running) return
      if (width === 0) resize()
      else {
        const rect = canvas.getBoundingClientRect()
        rectLeft = rect.left
        rectTop = rect.top
      }
      running = true
      last = performance.now()
      frame = requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    control.current = { start, stop }

    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width !== width || rect.height !== height) resize()
    })
    resizeObserver.observe(canvas)

    const onLeave = () => {
      pointerInside = false
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    document.addEventListener("pointerleave", onLeave)

    return () => {
      stop()
      control.current = null
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [paletteKey, density, reduceMotion])

  /* Start and stop without tearing down, so pausing keeps the particles where they are. */
  useEffect(() => {
    if (reduceMotion) return
    const sync = () => {
      if (active && !paused && !document.hidden) control.current?.start()
      else control.current?.stop()
    }
    sync()
    document.addEventListener("visibilitychange", sync)
    return () => document.removeEventListener("visibilitychange", sync)
  }, [active, paused, reduceMotion, paletteKey, density])

  if (reduceMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${className ?? ""}`}
      aria-hidden="true"
    />
  )
}

export default AmbientSparks
