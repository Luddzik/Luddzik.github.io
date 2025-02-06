"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import styles from "./BackgroundPaths.module.css"

const BackgroundPaths: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let scrollY = 0

    const paths: Path[] = []
    const pathCount = 75 // Increased number of lines

    class Path {
      x: number
      y: number
      length: number
      speed: number
      color: string

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = 0
        this.y = 0
        this.length = 0
        this.speed = 0
        this.color = ""
        this.reset(canvasWidth, canvasHeight)
      }

      reset(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight * 2 - canvasHeight
        this.length = Math.random() * 400 + 200 // Increased length range (200-600px)
        this.speed = Math.random() * 2 + 1
        this.color = `rgba(255, 0, 0, ${Math.random() * 0.1 + 0.05})`
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x, this.y + this.length)
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1
        ctx.stroke()
      }

      update(canvasHeight: number) {
        this.y += this.speed

        if (this.y - scrollY > canvasHeight) {
          this.reset(canvas.width, canvasHeight)
        }
      }
    }

    function createPaths() {
      for (let i = 0; i < pathCount; i++) {
        paths.push(new Path(canvas.width, canvas.height))
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(0, -scrollY % canvas.height)

      paths.forEach((path) => {
        path.update(canvas.height)
        path.draw(ctx)
      })

      ctx.restore()
      animationFrameId = requestAnimationFrame(animate)
    }

    function handleResize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      paths.forEach((path) => path.reset(canvas.width, canvas.height))
    }

    function handleScroll() {
      scrollY = window.scrollY
    }

    handleResize()
    createPaths()
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.backgroundCanvas} />
}

export default BackgroundPaths

