"use client"

import type React from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import SectionHeading from "./SectionHeading"
import section from "./Section.module.css"
import styles from "./Studio.module.css"

const EASE = [0.16, 1, 0.3, 1] as const

const facts = [
  { label: "Studio", value: "Independent, small by choice" },
  { label: "Based in", value: "Poland" },
  { label: "Engines", value: "Unity · Phaser" },
  { label: "Platforms", value: "Steam · Browser" },
]

/* The facts read as a ruled list, so they arrive line by line rather than as a block. */
const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const row: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const Studio: React.FC = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section id="studio" className={styles.studio}>
      <div className={section.inner}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <SectionHeading eyebrow="Studio">
              A spark is a small thing that starts something
            </SectionHeading>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            >
              <p>
                We pick ideas we can finish, build them properly, and put them in front of players
                rather than sitting on them.
              </p>
              <p>
                That means taking on a handful of things at a time and giving each one real
                attention — whether it&rsquo;s a strategy game with genuine depth or a party game
                you understand in a single round.
              </p>
              <p>
                Everything we ship is built in-house, from first prototype to store page.
              </p>
            </motion.div>
          </div>

          <motion.dl
            className={styles.facts}
            variants={reduceMotion ? undefined : list}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-80px" }}
          >
            {facts.map((fact) => (
              <motion.div
                key={fact.label}
                className={styles.fact}
                variants={reduceMotion ? undefined : row}
              >
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}

export default Studio
