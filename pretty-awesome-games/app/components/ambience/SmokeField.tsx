"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import type { AmbienceProps } from "./types"
import styles from "./SmokeField.module.css"

interface SmokeFieldProps extends AmbienceProps {
  /** Smoke tints, as hex — taken from the game's own art. */
  tints: string[]
  /** Overall opacity multiplier. Tune per game against its art. */
  strength?: number
  /** Puff density multiplier. */
  density?: number
}

interface Puff {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  growth: number
  angle: number
  spin: number
  sprite: number
  alpha: number
  life: number
  lifeSpeed: number
}

/** Puffs per million CSS px², capped — the look depends on overlap, not count. */
const PUFFS_PER_MPX = 14
const MAX_PUFFS = 26
const MIN_PUFFS = 6
/**
 * Smoke is all low frequencies, so the backing store runs at half CSS
 * resolution and the browser's upscale is invisible. That's what keeps a
 * dozen screen-sized sprites cheap enough to draw every frame.
 */
const RESOLUTION = 0.5
const SPRITE = 256
const VARIANTS = 3

const random = (min: number, max: number) => min + Math.random() * (max - min)

/** Hash-based value noise — deterministic per seed, smooth, no dependencies. */
const makeNoise = (seed: number) => {
  const hash = (x: number, y: number) => {
    let h = (x * 374761393 + y * 668265263 + seed * 1442695041) | 0
    h = Math.imul(h ^ (h >>> 13), 1274126177)
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295
  }
  const smooth = (t: number) => t * t * (3 - 2 * t)
  return (x: number, y: number) => {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const tx = smooth(x - xi)
    const ty = smooth(y - yi)
    const a = hash(xi, yi)
    const b = hash(xi + 1, yi)
    const c = hash(xi, yi + 1)
    const d = hash(xi + 1, yi + 1)
    return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty
  }
}

/**
 * One soft, billowing puff: fractal noise under a radial falloff, built once
 * into an alpha mask. Everything per-frame is a drawImage of these.
 */
const makeMask = (seed: number) => {
  const canvas = document.createElement("canvas")
  canvas.width = SPRITE
  canvas.height = SPRITE
  const ctx = canvas.getContext("2d")
  if (!ctx) return canvas
  const noise = makeNoise(seed)
  const image = ctx.createImageData(SPRITE, SPRITE)
  const half = SPRITE / 2
  for (let y = 0; y < SPRITE; y++) {
    for (let x = 0; x < SPRITE; x++) {
      const dx = (x - half) / half
      const dy = (y - half) / half
      const falloff = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy))
      if (falloff === 0) continue
      let n = 0
      let amp = 0.55
      let freq = 3 / SPRITE
      for (let o = 0; o < 5; o++) {
        n += noise(x * freq, y * freq) * amp
        amp *= 0.5
        freq *= 2
      }
      const density = Math.pow(Math.max(0, n - 0.38) * 2.6, 1.35) * falloff * falloff
      image.data[(y * SPRITE + x) * 4 + 3] = Math.min(255, density * 255)
    }
  }
  ctx.putImageData(image, 0, 0)
  return canvas
}

const tint = (mask: HTMLCanvasElement, color: string) => {
  const canvas = document.createElement("canvas")
  canvas.width = SPRITE
  canvas.height = SPRITE
  const ctx = canvas.getContext("2d")
  if (!ctx) return canvas
  ctx.fillStyle = color
  ctx.fillRect(0, 0, SPRITE, SPRITE)
  ctx.globalCompositeOperation = "destination-in"
  ctx.drawImage(mask, 0, 0)
  return canvas
}

/**
 * A reusable smoke engine — one of the building blocks a game's own ambience
 * (see ./index.ts) can be made from. Slow smoke rolling through the world. It lives *behind* the
 * characters — the scene stacks world → smoke → characters → text — so it
 * reads as atmosphere in the place, not an effect laid over the page. It
 * doesn't react to the pointer or to clicks; it just drifts.
 *
 * Stopped when its scene isn't showing, when the tab is hidden or the viewer
 * pauses it, and absent under prefers-reduced-motion.
 */
const SmokeField: React.FC<SmokeFieldProps> = ({
  tints,
  active,
  paused = false,
  strength = 1,
  density = 1,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const control = useRef<{ start: () => void; stop: () => void } | null>(null)
  const reduceMotion = useReducedMotion()
  const tintKey = tints.join(",")

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const colors = tintKey.split(",")
    const masks = Array.from({ length: VARIANTS }, (_, i) => makeMask(i * 7919 + 13))
    const sprites = colors.flatMap((color) => masks.map((mask) => tint(mask, color)))

    let width = 0
    let height = 0
    let puffs: Puff[] = []
    let frame = 0
    let running = false
    let last = 0

    /* Weighted to the lower part of the frame — ground haze that rises and thins. */
    const spawn = (fresh: boolean): Puff => {
      const base = Math.max(width, height)
      return {
        x: random(-0.1, 1.1) * width,
        y: fresh ? random(0.25, 1.05) * height : height + random(0.1, 0.3) * base,
        vx: random(4, 14) * (Math.random() < 0.7 ? 1 : -1),
        vy: -random(5, 14),
        size: random(0.35, 0.7) * base,
        growth: random(0.012, 0.03) * base,
        angle: random(-0.25, 0.25),
        spin: random(-0.015, 0.015),
        sprite: (Math.random() * sprites.length) | 0,
        alpha: random(0.5, 0.85) * strength,
        life: fresh ? random(0.05, 0.9) : 0,
        lifeSpeed: random(0.025, 0.045),
      }
    }

    const resize = () => {
      /* Layout size, not getBoundingClientRect — that includes the scene's zoom-in transform. */
      if (canvas.clientWidth === 0 || canvas.clientHeight === 0) return
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * RESOLUTION)
      canvas.height = Math.round(height * RESOLUTION)
      ctx.setTransform(RESOLUTION, 0, 0, RESOLUTION, 0, 0)
      const count = Math.round(((width * height) / 1e6) * PUFFS_PER_MPX * density)
      puffs = Array.from({ length: Math.max(MIN_PUFFS, Math.min(MAX_PUFFS, count)) }, () =>
        spawn(true),
      )
    }

    const draw = (now: number) => {
      if (!running) return
      frame = requestAnimationFrame(draw)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      ctx.setTransform(RESOLUTION, 0, 0, RESOLUTION, 0, 0)
      ctx.clearRect(0, 0, width, height)

      for (const p of puffs) {
        p.life += p.lifeSpeed * dt
        if (p.life >= 1) {
          Object.assign(p, spawn(false))
          continue
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.size += p.growth * dt
        p.angle += p.spin * dt

        /* Sine envelope: eases in from nothing and dissolves out, no pop. */
        const alpha = Math.min(1, p.alpha * Math.sin(p.life * Math.PI))
        if (alpha <= 0.005) continue
        const cos = Math.cos(p.angle) * RESOLUTION
        const sin = Math.sin(p.angle) * RESOLUTION
        ctx.setTransform(cos, sin, -sin, cos, p.x * RESOLUTION, p.y * RESOLUTION)
        ctx.globalAlpha = alpha
        /* Drawn wide and low — smoke rolls in layers rather than rising as balls. */
        ctx.drawImage(sprites[p.sprite], -p.size * 0.8, -p.size * 0.35, p.size * 1.6, p.size * 0.7)
      }
      ctx.globalAlpha = 1
    }

    const start = () => {
      if (running) return
      if (width === 0) resize()
      running = true
      last = performance.now()
      frame = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }
    control.current = { start, stop }

    const observer = new ResizeObserver(() => {
      if (canvas.clientWidth !== width || canvas.clientHeight !== height) resize()
    })
    observer.observe(canvas)

    return () => {
      stop()
      control.current = null
      observer.disconnect()
    }
  }, [tintKey, strength, density, reduceMotion])

  /* Start and stop without tearing down, so pausing leaves the smoke where it is. */
  useEffect(() => {
    if (reduceMotion) return
    const sync = () => {
      if (active && !paused && !document.hidden) control.current?.start()
      else control.current?.stop()
    }
    sync()
    document.addEventListener("visibilitychange", sync)
    return () => document.removeEventListener("visibilitychange", sync)
  }, [active, paused, reduceMotion, tintKey])

  if (reduceMotion) return null

  return <canvas ref={canvasRef} className={`${styles.canvas} ${className ?? ""}`} aria-hidden="true" />
}

export default SmokeField
