import type React from "react"
import Link from "next/link"
import { playableGame } from "../lib/games"
import { LEGAL_ENTITY_LINE, STUDIO_NAME } from "../lib/brand"
import styles from "./SiteFooter.module.css"

interface SiteFooterProps {
  /**
   * `frame` is the fixed-height bar under the home page's views, where the
   * registration line has no room (Contact carries it instead). `page` is the
   * ordinary footer at the end of a scrolling page, and carries it.
   */
  variant?: "frame" | "page"
}

const SiteFooter: React.FC<SiteFooterProps> = ({ variant = "page" }) => (
  <footer className={`${styles.footer} ${variant === "frame" ? styles.frame : styles.page}`}>
    {playableGame?.demo && (
      <a
        className={styles.news}
        href={playableGame.demo.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.tag}>Play now</span>
        {playableGame.title} demo <span className={styles.arrow} aria-hidden="true">↗</span>
      </a>
    )}

    <div className={styles.end}>
      <nav className={styles.legal} aria-label="Legal">
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
      <div className={styles.small}>
        <span>
          &copy; {new Date().getFullYear()} {STUDIO_NAME}
        </span>
        {/*
          "Iskra Games" is a trading name; the entity that actually trades is the
          founder's Polish sole proprietorship. Empty until the registration details
          are filled in, so nothing that looks like a placeholder NIP ever renders.
        */}
        {LEGAL_ENTITY_LINE && <span className={styles.entity}>{LEGAL_ENTITY_LINE}</span>}
      </div>
    </div>
  </footer>
)

export default SiteFooter
