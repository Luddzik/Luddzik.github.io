import type React from "react"
import type { Metadata } from "next"
import { Poppins, Lato, Bungee } from "next/font/google"
import "./globals.css"
import BackgroundPaths from "./components/BackgroundPaths"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-poppins" })
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" })
const bungee = Bungee({ subsets: ["latin"], weight: ["400"], variable: "--font-bungee" })

export const metadata: Metadata = {
  title: "Pretty Awesome Games",
  description: "Discover innovative and engaging games by Pretty Awesome Games",
  icons: {
    icon: "/favicon.svg",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${lato.variable} ${bungee.variable}`}>
        <BackgroundPaths />
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout

