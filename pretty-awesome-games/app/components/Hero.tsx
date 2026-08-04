"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import Wordmark from "./Wordmark"
import Embers from "./Embers"
import styles from "./Hero.module.css"

const EASE = [0.16, 1, 0.3, 1] as const

const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  /* The mark drifts up and dims as the page scrolls off it — paper moving under glass. */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const guidesY = useTransform(scrollYProgress, [0, 1], [0, 40])

  const scrollToGames = () => {
    document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Ruled guide lines — brush lettering is written against these. */}
      <motion.div
        className={styles.guides}
        style={reduceMotion ? undefined : { y: guidesY }}
        aria-hidden="true"
      />
      <Embers />

      <motion.div
        className={styles.inner}
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/*
          The wordmark is the page's heading — the mark carries the name, so
          nothing should compete with it for size. Everything under it is small.
        */}
        <h1 className={styles.markBlock}>
          <Wordmark size="clamp(88px, 13.5vw, 162px)" className={styles.mark} ignite />
          <span className={styles.subline} aria-hidden="true">
            Games
          </span>
        </h1>

        <motion.p
          className={styles.tagline}
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
        >
          An independent game studio in Poland. <b>Iskra</b> is Polish for spark.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.08, ease: EASE }}
        >
          <button className={styles.cta} onClick={scrollToGames}>
            <span>See the games</span>
            <svg
              className={styles.ctaArrow}
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 2v11M3 8.5l4.5 4.5L12 8.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
