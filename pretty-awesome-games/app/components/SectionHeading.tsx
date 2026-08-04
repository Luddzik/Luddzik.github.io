"use client"

import type React from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import SparkDot from "./SparkDot"
import section from "./Section.module.css"
import styles from "./SectionHeading.module.css"

const EASE = [0.16, 1, 0.3, 1] as const

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.1 } },
}

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/* The full stop is struck rather than faded — same gesture as the tittle in the mark. */
const strike: Variants = {
  hidden: { opacity: 0, scale: 0.2 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: 0.22, ease: [0.34, 1.4, 0.64, 1] },
  },
}

interface SectionHeadingProps {
  /** Small tracked label above the heading. */
  eyebrow: string
  /** Heading text. The ember full stop is appended automatically. */
  children: React.ReactNode
  className?: string
}

/**
 * Every section opens the same way: ember, tracked label, heading, ember full
 * stop. Sharing one component keeps the rhythm identical across sections and
 * puts the reveal timing in a single place.
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, children, className }) => {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : group}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.span className={section.eyebrow} variants={reduceMotion ? undefined : rise}>
        <SparkDot size={0.5} />
        {eyebrow}
      </motion.span>

      <motion.h2 className={section.heading} variants={reduceMotion ? undefined : rise}>
        {children}
        <motion.span
          className={styles.stop}
          variants={reduceMotion ? undefined : strike}
          style={{ display: "inline-block" }}
        >
          <SparkDot size={0.13} />
        </motion.span>
      </motion.h2>
    </motion.div>
  )
}

export default SectionHeading
