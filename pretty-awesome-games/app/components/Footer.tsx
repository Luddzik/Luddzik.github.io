"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import styles from "./Footer.module.css"
import Image from "next/image"

const Footer: React.FC = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2025 PrettyAwesomeGames. All rights reserved.</p>
        <div>
          <Image src="../favicon.svg" alt="Logo" width={64} height={64} />
        </div>
        <nav>
          <button onClick={() => handleNavigation("/privacy-policy")} className={styles.link}>
            Privacy Policy
          </button>
          <button onClick={() => handleNavigation("/terms")} className={styles.link}>
            Terms & Conditions
          </button>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

