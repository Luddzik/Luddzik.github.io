"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Wordmark from "./Wordmark"
import styles from "./Header.module.css"

interface HeaderProps {
  showNavLinks?: boolean
}

const NAV = [
  { id: "games", label: "Games" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
]

/**
 * The rule under the header is a fuse: it burns ignition orange across the page
 * as you scroll, the ember riding its leading edge. A progress bar is ordinary
 * furniture — this one is the mark's own ember running down the page, so it
 * reads as the logo continuing rather than as a widget bolted on.
 */
const ScrollFuse: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const smoothed = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.4 })
  const width = useTransform(smoothed, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`)
  /* Nothing is lit at the top of the page — otherwise the ember sits at x=0 unlit. */
  const opacity = useTransform(smoothed, [0, 0.012], [0, 1])

  return (
    <div className={styles.fuseTrack} aria-hidden="true">
      <motion.div className={styles.fuseBurn} style={{ width, opacity }} />
    </div>
  )
}

const Header: React.FC<HeaderProps> = ({ showNavLinks = true }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* Whichever section owns the middle band of the viewport is the active one. */
  useEffect(() => {
    if (!showNavLinks) return

    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActiveId(NAV.find((item) => visible.has(item.id))?.id ?? null)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )

    sections.forEach((sectionEl) => observer.observe(sectionEl))
    return () => observer.disconnect()
  }, [showNavLinks])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => scrollToSection("top")}>
          <Wordmark size={32} />
        </Link>

        {showNavLinks && (
          <nav aria-label="Main">
            <ul className={styles.navList}>
              {NAV.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <button
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          className={styles.navUnderline}
                          layoutId="navUnderline"
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}
      </div>

      <ScrollFuse />
    </motion.header>
  )
}

export default Header
