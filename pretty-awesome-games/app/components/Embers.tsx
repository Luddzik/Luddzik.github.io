"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import styles from "./Embers.module.css"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  /** Buoyancy — embers accelerate upward rather than drifting at a constant rate. */
  lift: number
  /** Fast brightness wobble. This is what makes a spark read as burning. */
  flicker: number
  flickerSpeed: number
  alpha: number
  /** 0 → 1 through the particle's life. */
  life: number
  lifeSpeed: number
  /** 0 → 1, how much the cursor is heating this ember right now. */
  heat: number
  /** Thrown by a click: dies fast, ignores the ambient cap, brighter. */
  burst: boolean
}

const AMBIENT = 38
const MAX_BURST = 90
const SPARK = "255, 116, 48"
/** Radius of the cursor's heat, in CSS px. */
const HEAT_RADIUS = 190

const random = (min: number, max: number) => min + Math.random() * (max - min)

/**
 * Cheap layered-sine stand-in for curl noise. Real embers eddy in convection
 * currents; a single sine wave reads as a mechanical wobble, and two out-of-phase
 * waves at different scales is enough to look like turbulence.
 */
const turbulence = (x: number, y: number, t: number) =>
  Math.sin(x * 0.008 + t * 0.35) * Math.cos(y * 0.011 - t * 0.28) +
  0.5 * Math.sin(y * 0.017 + t * 0.5)

const spawnAmbient = (width: number, height: number, atBottom: boolean): Particle => {
  const radius = random(0.6, 2.1)
  /* Inverse size/speed relationship: the small hot ones shoot up. */
  const speedBias = 1 - (radius - 0.6) / 1.5

  return {
    x: random(0, width),
    y: atBottom ? height + random(0, 40) : random(0, height),
    vx: random(-6, 6),
    vy: -(random(34, 62) + speedBias * 34),
    radius,
    lift: random(10, 26),
    flicker: random(0, Math.PI * 2),
    flickerSpeed: random(4, 11),
    alpha: random(0.22, 0.7),
    life: atBottom ? 0 : Math.random(),
    lifeSpeed: random(0.13, 0.27),
    heat: 0,
    burst: false,
  }
}

const spawnBurst = (x: number, y: number): Particle => {
  const angle = random(0, Math.PI * 2)
  const speed = random(30, 155)

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    /* Biased upward — sparks off a strike arc up before they fall away. */
    vy: Math.sin(angle) * speed - random(40, 110),
    radius: random(0.9, 2.8),
    lift: random(20, 46),
    flicker: random(0, Math.PI * 2),
    flickerSpeed: random(9, 20),
    alpha: random(0.6, 1),
    life: 0,
    lifeSpeed: random(0.5, 1.0),
    heat: 1,
    burst: true,
  }
}

/**
 * The hero's ambient background: embers drifting up, and the cursor as a source
 * of heat moving through them.
 *
 * The studio is named after a spark, so the atmosphere is literally the thing
 * the name means. What makes it more than decoration is that it *reacts*: the
 * pointer carries a warm light, embers near it flare and are pushed up and out
 * on the draught, and clicking strikes a burst of sparks. A passive particle
 * field is a genre default; a dark room you carry a light through is a game.
 *
 * Canvas rather than DOM nodes — animating this many elements' positions every
 * frame would thrash layout, and this stays on one compositor layer. Pauses when
 * scrolled out of view or the tab is hidden, and does not run at all under
 * prefers-reduced-motion.
 */
const Embers: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let last = 0
    let clock = 0
    let visible = true

    /* Pointer light: `target` is where the cursor is, `light` lags behind it. */
    const target = { x: 0, y: 0 }
    const light = { x: 0, y: 0 }
    let lightAlpha = 0
    let pointerInside = false
    /* Touch has no hover state, so the light is a pointer-fine affordance only. */
    const finePointer = window.matchMedia("(pointer: fine)").matches

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: AMBIENT }, () => spawnAmbient(width, height, false))
    }

    const toLocal = (event: { clientX: number; clientY: number }) => {
      const rect = canvas.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const onPointerMove = (event: PointerEvent) => {
      const { x, y } = toLocal(event)
      const inside = x >= 0 && x <= width && y >= 0 && y <= height
      pointerInside = inside && finePointer
      if (!inside) return
      target.x = x
      target.y = y
      /* First sighting: put the light straight there rather than flying it in. */
      if (lightAlpha === 0) {
        light.x = x
        light.y = y
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      const { x, y } = toLocal(event)
      if (x < 0 || x > width || y < 0 || y > height) return
      const room = MAX_BURST - particles.filter((p) => p.burst).length
      const count = Math.min(random(26, 36) | 0, room)
      for (let i = 0; i < count; i++) particles.push(spawnBurst(x, y))
    }

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw)
      /* Clamp dt so a backgrounded tab doesn't teleport everything on return. */
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible) return
      clock += dt

      /* The light trails the cursor — heat has weight, it doesn't snap. */
      light.x += (target.x - light.x) * Math.min(dt * 7, 1)
      light.y += (target.y - light.y) * Math.min(dt * 7, 1)
      const wanted = pointerInside ? 1 : 0
      lightAlpha += (wanted - lightAlpha) * Math.min(dt * 4, 1)

      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = "lighter"

      if (lightAlpha > 0.01) {
        const glow = ctx.createRadialGradient(
          light.x,
          light.y,
          0,
          light.x,
          light.y,
          HEAT_RADIUS,
        )
        glow.addColorStop(0, `rgba(${SPARK}, ${0.15 * lightAlpha})`)
        glow.addColorStop(0.45, `rgba(${SPARK}, ${0.055 * lightAlpha})`)
        glow.addColorStop(1, `rgba(${SPARK}, 0)`)
        ctx.fillStyle = glow
        ctx.fillRect(
          light.x - HEAT_RADIUS,
          light.y - HEAT_RADIUS,
          HEAT_RADIUS * 2,
          HEAT_RADIUS * 2,
        )
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.life += p.lifeSpeed * dt
        if (p.life >= 1) {
          if (p.burst) {
            particles.splice(i, 1)
          } else {
            Object.assign(p, spawnAmbient(width, height, true))
          }
          continue
        }

        /* Convection: eddies rather than a uniform sway. */
        p.vx += turbulence(p.x, p.y, clock) * 14 * dt
        p.vx *= 1 - Math.min(dt * 1.4, 1)
        p.vy -= p.lift * dt
        if (p.burst) p.vy += 150 * dt /* burst sparks fall back */

        /* The cursor is hot: nearby embers flare and ride the draught. */
        p.heat *= 1 - Math.min(dt * 2.4, 1)
        if (lightAlpha > 0.01 && !p.burst) {
          const dx = p.x - light.x
          const dy = p.y - light.y
          const dist = Math.hypot(dx, dy)
          if (dist < HEAT_RADIUS && dist > 0.001) {
            const f = (1 - dist / HEAT_RADIUS) * lightAlpha
            p.vx += (dx / dist) * f * 46 * dt
            p.vy -= f * 130 * dt
            p.heat = Math.max(p.heat, f)
          }
        }

        p.x += p.vx * dt
        p.y += p.vy * dt
        p.flicker += p.flickerSpeed * dt

        const fadeIn = Math.min(p.life / (p.burst ? 0.04 : 0.12), 1)
        const fadeOut = Math.min((1 - p.life) / (p.burst ? 0.5 : 0.36), 1)
        const flicker = 0.72 + 0.28 * Math.sin(p.flicker)
        const alpha = p.alpha * fadeIn * fadeOut * flicker * (1 + p.heat * 1.3)
        if (alpha <= 0.004) continue

        const radius = p.radius * (1 + p.heat * 0.5)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${SPARK}, ${Math.min(alpha, 1)})`
        ctx.shadowBlur = radius * (6 + p.heat * 8)
        ctx.shadowColor = `rgba(${SPARK}, ${Math.min(alpha * 0.8, 1)})`
        ctx.fill()
      }

      ctx.shadowBlur = 0
      ctx.globalCompositeOperation = "source-over"
    }

    resize()
    last = performance.now()
    frame = requestAnimationFrame(draw)

    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(canvas)

    const onVisibility = () => {
      visible = !document.hidden
    }
    const onPointerLeave = () => {
      pointerInside = false
    }

    document.addEventListener("visibilitychange", onVisibility)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    document.addEventListener("pointerleave", onPointerLeave)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [reduceMotion])

  if (reduceMotion) return null

  return <canvas ref={canvasRef} className={styles.embers} aria-hidden="true" />
}

export default Embers
