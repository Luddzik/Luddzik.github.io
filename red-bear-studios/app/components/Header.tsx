"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import styles from "./Header.module.css"

interface HeaderProps {
  showNavLinks?: boolean
}

const Logo = () => (
  <svg
    className={styles.logoIcon}
    width="100%"
    height="100%"
    viewBox="0 0 2134 2134"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }}
  >
    <g id="Layer-1" transform="matrix(4.16667,0,0,4.16667,0,0)">
      <g transform="matrix(-0.15957,-0.987187,-0.987187,0.15957,222.186,25.2526)">
        <path
          d="M-366.496,-135.665C-287.817,-79.947 -215.892,-180.621 -219.445,-206.814C-221.372,-221.016 -252.171,-247.683 -305.656,-237.974C-511.029,-200.693 -510.401,103.297 -366.496,214.451C-93.108,400.868 3.801,-79.178 -311.648,-103.351C-327.789,-104.588 -369.766,-115.815 -366.496,-135.665"
          style={{ fill: "#CC0000", fillRule: "nonzero" }}
        />
      </g>
      <g transform="matrix(0.980147,0.198273,-0.198273,0.980147,188.724,7.81433)">
        <path
          d="M0.027,126.156C-141.051,152.406 -15.293,7.704 19.313,9.127C42.655,10.087 75.251,116.337 0.027,126.156"
          style={{ fill: "#CC0000", fillRule: "nonzero" }}
        />
      </g>
      <g transform="matrix(1,0,0,1,324.164,136.468)">
        <path
          d="M0,31.299C-0.15,-11.896 55.959,-29.642 73.806,-22.104C87.244,-16.429 119.047,38.251 85.327,73.468C47.533,111.28 1.624,74.931 0,31.299"
          style={{ fill: "#CC0000", fillRule: "nonzero" }}
        />
      </g>
      <g transform="matrix(0.933693,0.358075,-0.358075,0.933693,235.356,89.1735)">
        <path
          d="M0,-5.026C3.079,-25.941 36.748,-59.511 50.002,-60.926C62.262,-62.234 87.561,-35.196 93.795,-9.313C108.959,53.641 -9.989,64.49 0,-5.026"
          style={{ fill: "#CC0000", fillRule: "nonzero" }}
        />
      </g>
    </g>
  </svg>
)

export default function Header({ showNavLinks = true }: HeaderProps) {
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
        <Link href="/" className={styles.logoContainer} onClick={() => window.scrollTo(0, 0)}>
          <Logo />
          <div className={styles.logoText}>
            <span className={styles.logoMainText}>RedBear</span>
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

