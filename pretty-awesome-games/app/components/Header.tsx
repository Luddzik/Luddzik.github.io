"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "./Header.module.css"
import Image from "next/image"

interface HeaderProps {
  showNavLinks?: boolean
}

const Header: React.FC<HeaderProps> = ({ showNavLinks = true }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logoContainer} onClick={() => scrollToSection("top")}>
          <div>
            <Image src="../logo_long.svg" alt="Logo" width={96} height={96} />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoMainText}></span>
          </div>
        </Link>
        <nav>
          <ul className={styles.navList}>
            {showNavLinks && (
              <>
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button onClick={() => scrollToSection("games")}>Games</button>
                </motion.li>
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button onClick={() => scrollToSection("contact")}>Contact</button>
                </motion.li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}

export default Header

