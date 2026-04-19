"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface ParticlesProps {
  className?: string
  children?: React.ReactNode
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  darkColor?: string
  lightColor?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): number[] {
  let normalized = hex.replace("#", "")
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map(char => char + char)
      .join("")
  }
  const hexInt = Number.parseInt(normalized, 16)
  return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255]
}

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

export const Particles: React.FC<ParticlesProps> = ({
  className,
  children,
  quantity = 80,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color,
  darkColor = "#ffffff",
  lightColor = "#1e293b",
  vx = 0,
  vy = 0,
}) => {
  const [isDark, setIsDark] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const animationRef = useRef<number>(0)
  const rgbRef = useRef<number[]>([255, 255, 255])
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const activeColor = color ?? (isDark ? darkColor : lightColor)

  useEffect(() => {
    rgbRef.current = hexToRgb(activeColor)
  }, [activeColor])

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)
    }
  }, [dpr])

  const circleParams = useCallback((): Circle => {
    return {
      x: Math.floor(Math.random() * canvasSize.current.w),
      y: Math.floor(Math.random() * canvasSize.current.h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    }
  }, [size])

  const drawCircle = useCallback((circle: Circle, update = false) => {
    const ctx = context.current
    if (!ctx) return
    const { x, y, translateX, translateY, size: s, alpha } = circle
    ctx.translate(translateX, translateY)
    ctx.beginPath()
    ctx.arc(x, y, s, 0, 2 * Math.PI)
    const [r, g, b] = rgbRef.current
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
    ctx.fill()
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (!update) circles.current.push(circle)
  }, [dpr])

  const clearContext = useCallback(() => {
    context.current?.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
  }, [])

  const drawParticles = useCallback(() => {
    clearContext()
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams())
    }
  }, [quantity, drawCircle, circleParams, clearContext])

  const initCanvas = useCallback(() => {
    resizeCanvas()
    drawParticles()
  }, [resizeCanvas, drawParticles])

  useEffect(() => {
    if (!canvasRef.current) return
    context.current = canvasRef.current.getContext("2d")
    initCanvas()

    const remap = (v: number, s1: number, e1: number, s2: number, e2: number) => {
      const r = ((v - s1) * (e2 - s2)) / (e1 - s1) + s2
      return r > 0 ? r : 0
    }

    const animate = () => {
      clearContext()
      for (let i = 0; i < circles.current.length; i++) {
        const circle = circles.current[i]
        const edge = Math.min(
          circle.x + circle.translateX - circle.size,
          canvasSize.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.current.h - circle.y - circle.translateY - circle.size,
        )
        const remapped = Number.parseFloat(remap(edge, 0, 20, 0, 1).toFixed(2))
        if (remapped > 1) {
          if (circle.alpha < circle.targetAlpha) {
            circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha)
          }
        } else {
          circle.alpha = circle.targetAlpha * remapped
        }
        circle.x += circle.dx + vx
        circle.y += circle.dy + vy
        circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease
        circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease

        drawCircle(circle, true)

        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          circles.current.splice(i, 1)
          i--
          drawCircle(circleParams())
        }
      }
      animationRef.current = window.requestAnimationFrame(animate)
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!reduced.matches) animate()

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = e.clientX - rect.left - w / 2
      const y = e.clientY - rect.top - h / 2
      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }

    window.addEventListener("resize", initCanvas)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("resize", initCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [initCanvas, clearContext, drawCircle, circleParams, vx, vy, staticity, ease])

  useEffect(() => {
    initCanvas()
  }, [refresh, initCanvas])

  return (
    <div
      ref={canvasContainerRef}
      className={cn("relative inset-0 overflow-hidden", className)}
    >
      <canvas className="absolute inset-0 size-full" ref={canvasRef} aria-hidden="true" />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}

Particles.displayName = "Particles"

export default function ParticlesDemo() {
  return <Particles />
}
