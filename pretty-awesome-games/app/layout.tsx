import type React from "react"
import type { Metadata } from "next"
import { Source_Sans_3, Playfair_Display } from "next/font/google"
import "./globals.css"
import BackgroundPaths from "./components/BackgroundPaths"

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Pretty Awesome Games - Innovative Indie Game Development",
  description:
    "Professional indie game development studio creating innovative and engaging gaming experiences. Discover our portfolio and investment opportunities.",
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
      <body className={`${sourceSans.variable} ${playfair.variable} font-sans antialiased`}>
        <BackgroundPaths />
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
