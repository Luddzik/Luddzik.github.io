"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Wordmark from "./Wordmark"
import { NAV, type Section } from "../lib/routes"
import styles from "./SiteHeader.module.css"

interface SiteHeaderProps {
  /** The nav item to mark current. Omit on pages outside the home frame. */
  current?: Section
  /**
   * Prefix for nav links. Inside the home frame the links are bare hashes and
   * routing is a dissolve; from the legal pages they go back to `/#section`.
   */
  base?: "" | "/"
  /** Exposed so the entrance sequence can fly its logo into the real one. */
  brandRef?: React.Ref<HTMLAnchorElement>
}

/**
 * Stationary frame. It never moves or fades while views change beneath it —
 * that stillness is what makes the dissolves read as navigation rather than
 * as page loads.
 */
const SiteHeader: React.FC<SiteHeaderProps> = ({ current, base = "", brandRef }) => {
  const [open, setOpen] = useState(false)

  /* A route change always closes the mobile menu. */
  useEffect(() => setOpen(false), [current])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className={styles.header}>
      <a
        ref={brandRef}
        className={styles.brand}
        href={base === "" ? "#home" : "/"}
        aria-label="Iskra Games home"
      >
        <Wordmark className={styles.mark} width="100%" />
        <span className={styles.games}>Games</span>
      </a>

      <nav
        id="primary-navigation"
        className={`${styles.nav} ${open ? styles.open : ""}`}
        aria-label="Main navigation"
      >
        {NAV.map((item) => (
          <a
            key={item.section}
            href={`${base}#${item.section}`}
            className={item.section === current ? styles.current : undefined}
            aria-current={item.section === current ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={styles.menu}
        aria-controls="primary-navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"} <span aria-hidden="true">/</span>
      </button>
    </header>
  )
}

export default SiteHeader
