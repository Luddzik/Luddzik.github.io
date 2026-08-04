import type React from "react"
import styles from "./SparkDot.module.css"

interface SparkDotProps {
  /** Diameter relative to the surrounding font size. */
  size?: number
  className?: string
}

/**
 * The ember from the wordmark's i, reused as punctuation — before an eyebrow,
 * after a heading, between sections. It is what carries the brand past the
 * header, so the logo isn't a one-off asset that never reappears.
 */
const SparkDot: React.FC<SparkDotProps> = ({ size = 0.42, className }) => (
  <span
    className={`${styles.dot} ${className ?? ""}`}
    style={{ "--dot-size": `${size}em` } as React.CSSProperties}
    aria-hidden="true"
  />
)

export default SparkDot
