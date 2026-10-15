"use client"

import type React from "react"
import { useState } from "react"
import AmbientSmoke from "../AmbientSmoke"
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

  return (
    <>
      <h1 className="visually-hidden">Iskra Games — independent games from Poland</h1>

      <div className={`${styles.slashes} ${solo ? styles.solo : ""}`}>
        {featuredGames.map((game, i) => {
          const isFocused = i === focused
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
                <AmbientSmoke tints={game.smoke} active={active && isFocused} />
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
