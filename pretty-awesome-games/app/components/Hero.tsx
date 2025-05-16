"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FaChevronDown } from "react-icons/fa"
import styles from "./Hero.module.css"
import Image from "next/image"

const Hero: React.FC = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("games")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.content}
        >
          <div className="relative w-128 h-128">
            <Image src="../favicon.svg" alt="Logo" width={256} height={256} className="object-contain" />
          </div>
        
          <motion.button
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const gamesSection = document.getElementById("games")
              if (gamesSection) {
                gamesSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Explore Our Games
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        onClick={scrollToNextSection}
      >
        <FaChevronDown />
      </motion.div>
    </section>
  )
}

export default Hero

