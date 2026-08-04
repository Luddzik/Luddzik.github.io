"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import { CONTACT_EMAIL } from "../lib/brand"
import section from "./Section.module.css"
import styles from "./Contact.module.css"

const EASE = [0.16, 1, 0.3, 1] as const

const Contact: React.FC = () => {
  const reduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
    } catch {
      /* Clipboard blocked — the mailto link beside this still works. */
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={section.inner}>
        <div className={styles.layout}>
          <div>
            <SectionHeading eyebrow="Contact">Say hello</SectionHeading>
            <motion.p
              className={styles.lede}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            >
              Press enquiries, publishing and partnership conversations, or a question about
              anything we&rsquo;re working on. We read everything and reply to what we can.
            </motion.p>
          </div>

          <motion.div
            className={styles.addressRow}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.emailLink}>
              <span className={styles.address}>{CONTACT_EMAIL}</span>
              <span className={styles.underline} aria-hidden="true" />
            </a>

            <button type="button" className={styles.copyButton} onClick={copyAddress}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  {copied ? "Copied" : "Copy address"}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
