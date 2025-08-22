"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FaApple, FaAndroid } from "react-icons/fa"
import styles from "./Games.module.css"

interface Game {
  id: number
  title: string
  description: string
  image: string
  tag?: string
  platforms: {
    ios?: string
    android?: string
  }
}

const games: Game[] = [
  {
    id: 1,
    title: "ECIO Reborn",
    description: "Build. Battle. Conquer. Dive into the next era of strategic battles.",
    image: "ecio_screenshot.png",
    platforms: {
      ios: "https://apps.apple.com/us/app/ecio-reborn/id6746190261",
      android: "https://play.google.com/store/apps/details?id=com.pag.ecioreborn",
    },
  },
  {
    id: 2,
    title: "Hollow Brawls",
    description: "An intense multiplayer brawler with unique characters and dynamic combat.",
    image: "/hollow-brawls-icon.png",
    tag: "In Development",
    platforms: {},
  },
]

const Games: React.FC = () => {
  return (
    <section id="games" className={styles.games}>
      <div className={styles.container}>
        <h2>Our Games</h2>
        <div className={styles.gameList}>
          {games.map((game) => (
            <motion.div key={game.id} className={styles.gameCard} whileHover={{ y: -10 }}>
              {game.tag && <div className={styles.gameTag}>{game.tag}</div>}
              <div className={styles.imageContainer}>
                <img src={game.image || "/placeholder.svg"} alt={game.title} />
              </div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className={styles.platforms}>
                {game.platforms.ios && (
                  <a href={game.platforms.ios} target="_blank" rel="noopener noreferrer" className={styles.button}>
                    <FaApple /> App Store
                  </a>
                )}
                {game.platforms.android && (
                  <a href={game.platforms.android} target="_blank" rel="noopener noreferrer" className={styles.button}>
                    <FaAndroid /> Play Store
                  </a>
                )}
                {!game.platforms.ios && !game.platforms.android && <div className={styles.comingSoon}>Coming Soon</div>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Games
