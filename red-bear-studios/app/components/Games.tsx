"use client"

import { motion } from "framer-motion"
import { FaApple, FaAndroid } from "react-icons/fa"
import styles from "./Games.module.css"

interface Game {
  id: number
  title: string
  description: string
  image: string
  platforms: {
    ios?: string
    android?: string
  }
}

const games: Game[] = [
  {
    id: 1,
    title: "ECIO Mobile",
    description: "A groundbreaking mobile strategy game set in a vast cosmic universe.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ecio_thumbnail-WPjBbwxN2MWWH9prqqx0KKYLMhmjY0.png",
    platforms: {
      ios: "https://apps.apple.com/us/app/ecio-mobile",
      android: "https://play.google.com/store/apps/details?id=com.redbearstudios.eciomobile",
    },
  },
]

export default function Games() {
  return (
    <section id="games" className={styles.games}>
      <div className={styles.container}>
        <h2>Our Games</h2>
        <div className={styles.gameList}>
          {games.map((game) => (
            <motion.div key={game.id} className={styles.gameCard} whileHover={{ y: -10 }}>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

