"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
  const color = isHome ? "#1e1e1e" : "#ffffff"

  const [isTouch, setIsTouch] = useState(true)
  const [tileHovered, setTileHovered] = useState(false)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)
    const onTileHover = (e: Event) => setTileHovered((e as CustomEvent).detail.active)

    window.addEventListener("mousemove", move)
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("mouseenter", enter)
    document.addEventListener("tile-hover", onTileHover)

    return () => {
      window.removeEventListener("mousemove", move)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("mouseenter", enter)
      document.removeEventListener("tile-hover", onTileHover)
    }
  }, [])

  if (isTouch) return null

  return (
    <div
      className="fixed pointer-events-none z-[9999] select-none leading-none"
      style={{
        left: pos.x,
        top: pos.y,
        color,
        fontSize: 22,
        fontWeight: 700,
        transform: `translate(-50%, -50%) scale(${visible && !tileHovered ? 1 : 0})`,
        opacity: visible && !tileHovered ? 1 : 0,
        transition: "transform 0.15s ease, opacity 0.15s ease, color 0.3s ease",
      }}
      aria-hidden
    >
      ✻
    </div>
  )
}
