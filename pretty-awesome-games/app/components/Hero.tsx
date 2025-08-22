"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ChevronDown, Play, Users, Trophy } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const Hero: React.FC = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("games")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-background via-card to-background pt-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <Image
              src="/logo_long.png"
              alt="Pretty Awesome Games"
              width={300}
              height={234}
              className="mx-auto mb-6 rounded-2xl shadow-lg"
            />
          </div>

          <motion.h1
            className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting Innovative
            <span className="text-primary block">Gaming Experiences</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We're an indie game development studio passionate about creating memorable, engaging experiences that push
            the boundaries of interactive entertainment.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 text-center">
                <Play className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-playfair text-2xl font-bold text-foreground">5+</div>
                <div className="text-sm text-muted-foreground">Games Published</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-playfair text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-playfair text-2xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">Awards Won</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToNextSection()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
            >
              Explore Our Games
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const aboutSection = document.getElementById("about")
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg font-semibold"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        onClick={scrollToNextSection}
      >
        <ChevronDown className="w-6 h-6 text-primary" />
      </motion.div>
    </section>
  )
}

export default Hero
