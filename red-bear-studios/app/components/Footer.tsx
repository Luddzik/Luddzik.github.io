"use client"
import { useRouter } from "next/navigation"
import styles from "./Footer.module.css"

export default function Footer() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    window.scrollTo(0, 0)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2024 RedBear Studios. All rights reserved.</p>
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

