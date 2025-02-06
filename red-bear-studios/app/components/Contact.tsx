"use client"

import { motion } from "framer-motion"
import { FaEnvelope, FaDiscord } from "react-icons/fa"
import styles from "./Contact.module.css"

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.content}
        >
          <div className={styles.header}>
            <h2>Get in Touch</h2>
            <p className={styles.subtitle}>Have a question or want to collaborate?</p>
          </div>

          <div className={styles.cards}>
            <motion.a
              href="mailto:contact@redbearstudios.com"
              className={styles.card}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconWrapper}>
                <FaEnvelope className={styles.icon} />
              </div>
              <div className={styles.cardContent}>
                <h3>Email Us</h3>
                <p>contact@redbearstudios.com</p>
                <span className={styles.link}>Send an email →</span>
              </div>
            </motion.a>

            <motion.a
              href="https://discord.gg/redbearstudios"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.iconWrapper}>
                <FaDiscord className={styles.icon} />
              </div>
              <div className={styles.cardContent}>
                <h3>Join Our Community</h3>
                <span className={styles.link}>Join Discord →</span>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

