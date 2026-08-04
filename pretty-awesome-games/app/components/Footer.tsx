"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Wordmark from "./Wordmark"
import { STUDIO_NAME } from "../lib/brand"
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

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} {STUDIO_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
