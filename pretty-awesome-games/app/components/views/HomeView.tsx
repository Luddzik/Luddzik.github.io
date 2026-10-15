"use client"

import type React from "react"
import { useLayoutEffect, useRef, useState } from "react"
import { AMBIENCE } from "../ambience"
import { featuredGames } from "../../lib/games"
import { inert } from "../../lib/inert"
import ui from "./Ui.module.css"
import styles from "./HomeView.module.css"

/**
 * The front page is the games. Each featured game is a slash; the focused one
 * opens wide and comes into colour while the rest fall back to monochrome.
 *
 * The whole artwork is the way in, not just the button: pointing at a slash
 * focuses it, and clicking the focused one's art goes to its page. On touch
 * there's no hover, so the first tap on an unfocused slash focuses it and the
 * second goes through.
 */
const HomeView: React.FC<{ active: boolean }> = ({ active }) => {
  const [focused, setFocused] = useState(0)
  const solo = featuredGames.length === 1
  const slashesRef = useRef<HTMLDivElement>(null)

  /*
   * The slashes are skewed, so anything lower in a panel lands further left —
   * by an amount that depends on the window's height. Rather than a padding
   * that's only right at one size, measure and correct: the first game's
   * title lines up with the header logo's gutter, and every "01 / NAME" bar
   * lines up with the title above it.
   */
  useLayoutEffect(() => {
    const root = slashesRef.current
    if (!root) return
    const align = () => {
      if (!root.offsetWidth) return
      const gutter = window.innerWidth * (window.innerWidth <= 650 ? 0.06 : 0.05)
      root.querySelectorAll<HTMLElement>(":scope > article").forEach((panel, i) => {
        const title = panel.querySelector("h2")
        const number = panel.querySelector("button span")
        if (!title || !number) return
        panel.style.setProperty("--copy-dx", "0px")
        panel.style.setProperty("--choose-dx", "0px")
        /*
         * A few passes, because moving the copy can rewrap it, which changes its
         * height and so how far the skew carries it. Converges in two or three.
         */
        let copyDx = 0
        for (let pass = 0; pass < 4 && i === 0; pass++) {
          const error = gutter - title.getBoundingClientRect().left
          if (Math.abs(error) < 0.5) break
          copyDx += error
          panel.style.setProperty("--copy-dx", `${copyDx}px`)
        }
        const chooseDx = title.getBoundingClientRect().left - number.getBoundingClientRect().left
        panel.style.setProperty("--choose-dx", `${chooseDx}px`)
      })
    }
    align()
    /* The webfont swap rewraps the copy, which moves it under the skew again. */
    let disposed = false
    document.fonts?.ready.then(() => {
      if (!disposed) align()
    })
    /* Any reflow of the copy (font swap, rewrap) can move it under the skew, so watch it too. */
    const observer = new ResizeObserver(align)
    observer.observe(root)
    root.querySelectorAll("h2").forEach((title) => title.parentElement && observer.observe(title.parentElement))
    /*
     * Crossing the phone breakpoint changes the skew angle, and that change
     * animates — so measure again once the copy's transform has settled.
     */
    const onTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName === "transform") align()
    }
    root.addEventListener("transitionend", onTransitionEnd)
    return () => {
      disposed = true
      observer.disconnect()
      root.removeEventListener("transitionend", onTransitionEnd)
    }
  }, [])

  return (
    <>
      <h1 className="visually-hidden">Iskra Games — independent games from Poland</h1>

      <div ref={slashesRef} className={`${styles.slashes} ${solo ? styles.solo : ""}`}>
        {featuredGames.map((game, i) => {
          const isFocused = i === focused
          const Ambience = AMBIENCE[game.ambience]
          return (
            <article
              key={game.slug}
              className={`${styles.panel} ${isFocused ? styles.active : ""}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setFocused(i)
              }}
              onFocus={() => setFocused(i)}
            >
              <a
                className={styles.unskew}
                href={`#${game.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                onClick={(event) => {
                  if (!isFocused) {
                    event.preventDefault()
                    setFocused(i)
                  }
                }}
              >
                <div className={styles.art} style={{ backgroundImage: `url(${game.art.world})` }} />
                {Ambience && <Ambience active={active && isFocused} />}
                <img className={styles.crew} src={game.art.characters} alt="" />
                <div className={styles.shade} />
              </a>

              <div
                className={styles.copy}
                data-tgroup={isFocused ? "" : undefined}
                {...inert(!isFocused)}
              >
                <span className={ui.kicker}>{game.kicker}</span>
                <h2 className={styles.title}>{game.title}</h2>
                <p className={styles.lines}>
                  {game.lines[0]}
                  <br />
                  {game.lines[1]}
                </p>
                <a className={ui.action} href={`#${game.slug}`}>
                  Discover {game.title} <span aria-hidden="true">↗</span>
                </a>
              </div>

              <button
                type="button"
                className={styles.choose}
                aria-pressed={isFocused}
                aria-label={`Focus ${game.title}`}
                onClick={() => setFocused(i)}
                data-tgroup=""
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <b>{game.title}</b>
                <em aria-hidden="true">/</em>
              </button>
            </article>
          )
        })}
      </div>


      <div className={styles.edge} data-tgroup="">
        Independent spirit / Unexpected worlds
      </div>
    </>
  )
}

export default HomeView
