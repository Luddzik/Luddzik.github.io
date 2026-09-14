"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Wordmark from "./Wordmark"
import { LEGAL_ENTITY_LINE, STUDIO_NAME } from "../lib/brand"
import styles from "./Footer.module.css"

const Footer: React.FC = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Wordmark size={30} stacked />
        </Link>

        <nav className={styles.links} aria-label="Legal">
          <button onClick={() => handleNavigation("/privacy-policy")} className={styles.link}>
            Privacy Policy
          </button>
          <button onClick={() => handleNavigation("/terms")} className={styles.link}>
            Terms &amp; Conditions
          </button>
        </nav>

        <div className={styles.legal}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved.
          </p>

          {/*
            "Iskra Games" is a trading name; the entity that actually trades is the
            founder's Polish sole proprietorship. Rendered only once the registration
            details are filled in, so the footer never carries a placeholder that looks
            like a real NIP. See `app/lib/brand.ts`.
          */}
          {LEGAL_ENTITY_LINE && <p className={styles.entity}>{LEGAL_ENTITY_LINE}</p>}
        </div>
      </div>
    </footer>
  )
}

export default Footer
