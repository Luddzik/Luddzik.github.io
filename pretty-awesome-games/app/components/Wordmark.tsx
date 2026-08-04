import type React from "react"
import styles from "./Wordmark.module.css"

interface WordmarkProps {
  /**
   * Font size of the wordmark — a number is treated as px, a string is passed
   * through so callers can hand in a clamp() for fluid sizing. Everything else
   * in the mark scales from it.
   */
  size?: number | string
  /** Render the tracked "GAMES" line beneath. */
  stacked?: boolean
  /**
   * Play the ignition sequence on mount — the word written left to right, the
   * tittle struck last. Hero only; the header and footer marks stay still so
   * the effect keeps its weight.
   */
  ignite?: boolean
  className?: string
}

/**
 * "iskra" set lowercase in a brush script, with the tittle on the i burning as
 * an ember — the spark the name means.
 *
 * The ember is not drawn on top of the letterform: a second copy of the word is
 * stacked over the first, painted with the ember gradient via background-clip,
 * then clipped to the tittle alone. So the glowing dot IS the font's own dot —
 * it stays perfectly registered at any size, and nothing is bolted on.
 */
const Wordmark: React.FC<WordmarkProps> = ({
  size = 30,
  stacked = false,
  ignite = false,
  className,
}) => {
  return (
    <span
      className={`${styles.wordmark} ${ignite ? styles.igniting : ""} ${className ?? ""}`}
      style={
        { "--mark-size": typeof size === "number" ? `${size}px` : size } as React.CSSProperties
      }
      aria-label="Iskra Games"
      role="img"
    >
      <span className={styles.markRow}>
        <span className={styles.glow} aria-hidden="true" />
        <span className={styles.letters} aria-hidden="true">
          iskra
        </span>
        <span className={styles.tittle} aria-hidden="true">
          iskra
        </span>
      </span>
      {stacked && (
        <span className={styles.sub} aria-hidden="true">
          Games
        </span>
      )}
    </span>
  )
}

export default Wordmark
