"use client"

import type React from "react"
import { motion, useReducedMotion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import section from "./Section.module.css"
import styles from "./Games.module.css"

/**
 * Both cards lead with the game's own app icon, staged the way a store listing
 * shows one. The blurred copy behind it is the icon's own colour bleeding onto
 * the panel — each game's palette, not the site's, and no CSS gradient involved.
 *
 * Icons rather than screenshots because key art varies wildly in shape from
 * game to game; icons are square, so the lineup reads as one system however
 * many titles end up here.
 */
const IconArt: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className={styles.iconStage}>
    <img src={src} alt="" className={styles.iconBloom} aria-hidden="true" />
    <img src={src} alt={alt} className={styles.icon} loading="lazy" width={512} height={512} />
  </div>
)

interface Game {
  id: string
  title: string
  tagline: string
  description: string
  /** Rendered as a ruled definition list under the description. */
  meta: { label: string; value: string }[]
  art: React.ReactNode
}

const games: Game[] = [
  {
    id: "ecio-reborn",
    title: "ECIO Reborn",
    tagline: "Build. Battle. Conquer.",
    description:
      "A strategy game rebuilt from the ground up. Claim territory, commit your forces, and read the board before your opponent does.",
    meta: [
      { label: "Genre", value: "Strategy" },
      { label: "Status", value: "In development" },
      { label: "Platform", value: "Steam" },
    ],
    art: <IconArt src="/ecio-icon.png" alt="ECIO Reborn app icon" />,
  },
  {
    id: "most-said",
    title: "Most Said",
    tagline: "Guess what everyone else guessed.",
    description:
      "Name the answers everyone else gave. Five questions, forty-five seconds, three strikes.",
    meta: [
      { label: "Genre", value: "Party quiz" },
      { label: "Status", value: "In development" },
      { label: "Platform", value: "Browser" },
    ],
    art: <IconArt src="/most-said-icon.png" alt="Most Said app icon" />,
  },
]

const Games: React.FC = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section id="games" className={styles.games}>
      <div className={section.inner}>
        <SectionHeading eyebrow="Games" className={styles.heading}>
          What we&rsquo;re building
        </SectionHeading>

        <div className={styles.list}>
          {games.map((game, i) => (
            <motion.article
              key={game.id}
              className={styles.card}
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.art}>{game.art}</div>

              <div className={styles.body}>
                <h3 className={styles.title}>{game.title}</h3>
                <p className={styles.tagline}>{game.tagline}</p>
                <p className={styles.description}>{game.description}</p>

                <dl className={styles.meta}>
                  {game.meta.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Games
