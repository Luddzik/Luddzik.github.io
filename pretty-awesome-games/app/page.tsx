import type React from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Games from "./components/Games"
import Career from "./components/Career"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <Games />
      <Career />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
