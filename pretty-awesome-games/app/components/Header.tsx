"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            onClick={() => scrollToSection("top")}
          >
            <Image src="/logo_long.png" alt="Pretty Awesome Games Logo" width={50} height={50} className="rounded-lg" />
            <span className="font-playfair font-bold text-xl text-foreground">Pretty Awesome Games</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {showNavLinks && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("games")}
                  className="text-foreground hover:text-primary font-medium"
                >
                  Games
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("about")}
                  className="text-foreground hover:text-primary font-medium"
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("contact")}
                  className="text-foreground hover:text-primary font-medium"
                >
                  Contact
                </Button>
                <Link href="/careers">
                  <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
                    Careers
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
