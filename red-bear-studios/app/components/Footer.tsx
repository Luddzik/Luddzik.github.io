import Link from "next/link"
import styles from "./Footer.module.css"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2024 RedBear Studios. All rights reserved.</p>
        <nav>
          <Link href="/privacy-policy" onClick={scrollToTop}>
            Privacy Policy
          </Link>
          <Link href="/terms" onClick={scrollToTop}>
            Terms & Conditions
          </Link>
        </nav>
      </div>
    </footer>
  )
}

