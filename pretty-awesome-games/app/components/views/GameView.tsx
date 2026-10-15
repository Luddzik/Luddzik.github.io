"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { AMBIENCE } from "../ambience"
import type { Game } from "../../lib/games"
import styles from "./GameView.module.css"

/**
 * A game's own page: its world full-bleed behind compact, readable facts.
 *
 * The background is alive in layers, back to front — the environment drifting
 * slowly, the game's own ambience (components/ambience/) moving through it, then the characters in front of it —
 * and the world and characters shift against each other with the pointer, so
 * the scene has depth rather than sitting there as a flat picture. All of it stops
 * when the view isn't showing, and the viewer can pause it.
 */
const GameView: React.FC<{ game: Game; active: boolean }> = ({ game, active }) => {
  const reduceMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const sceneRef = useRef<HTMLDivElement>(null)

  /* Pointer parallax, eased toward the target so the layers have weight. */
  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || !active || paused || reduceMotion) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    let frame = 0
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }

    const tick = () => {
      current.x += (target.x - current.x) * 0.06
      current.y += (target.y - current.y) * 0.06
      scene.style.setProperty("--mx", current.x.toFixed(4))
      scene.style.setProperty("--my", current.y.toFixed(4))
      if (Math.abs(target.x - current.x) > 0.0005 || Math.abs(target.y - current.y) > 0.0005) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    const onMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1
      target.y = (event.clientY / window.innerHeight) * 2 - 1
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [active, paused, reduceMotion])

  const Ambience = AMBIENCE[game.ambience]
  const platform = game.meta.find((item) => item.label === "Platform")?.value

  return (
    <div className={`${styles.game} ${paused || !active ? styles.paused : ""}`}>
      <div ref={sceneRef} className={styles.scene} aria-hidden="true" data-scene="">
        <div className={styles.world} style={{ backgroundImage: `url(${game.art.world})` }} />
        {Ambience && <Ambience className={styles.smoke} active={active} paused={paused} />}
        <img className={styles.crew} src={game.art.characters} alt="" />
        <div className={styles.shade} />
      </div>

      <div className={styles.scroll}>
        <div className={styles.info} data-tgroup="">
          {platform && <span className={styles.platform}>{platform}</span>}
          <h1 className={styles.title}>{game.title}</h1>
          <p className={styles.tagline}>{game.tagline}</p>
          <p className={styles.description}>{game.description}</p>

          <dl className={styles.meta}>
            {game.meta
              .filter((item) => item.label !== "Platform")
              .map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
          </dl>

          {game.footage && (
            <a className={styles.preview} href={`#${game.slug}/gameplay`}>
              <img src={game.footage.poster} alt="" loading="lazy" />
              <span className={styles.play} aria-hidden="true">
                ▶
              </span>
              <b>Watch gameplay</b>
            </a>
          )}

          <div className={styles.links}>
            {game.store && (
              <a href={game.store.href} target="_blank" rel="noopener noreferrer">
                {game.store.label} <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href="#press">
              Press &amp; media <span aria-hidden="true">↗</span>
            </a>
          </div>
          {game.note && <p className={styles.note}>{game.note}</p>}
        </div>
      </div>

      <a className={styles.back} href="#home" aria-label="Back to the games" data-tgroup="">
        <span aria-hidden="true">×</span>Back
      </a>

      {!reduceMotion && (
        <button
          type="button"
          className={styles.motion}
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          data-tgroup=""
        >
          {paused ? "Play background" : "Pause background"}
        </button>
      )}
    </div>
  )
}

export default GameView
