"use client"

import type React from "react"
import { motion } from "framer-motion"
import styles from "./Career.module.css"

const Career: React.FC = () => {
  return (
    <section id="career" className={styles.career}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Career</h2>
          <div className={styles.content}>
            <div className={styles.hiringStatus}>
              <span className={styles.statusBadge}>🚀 Not Hiring Currently</span>
              <p className={styles.statusMessage}>Building something amazing - stay tuned!</p>
            </div>
            <div className={styles.description}>
              <p>
                We're a small but passionate team focused on creating awesome games. While we're not actively hiring at
                the moment, we're always interested in connecting with talented individuals who share our passion for
                gaming.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Career
