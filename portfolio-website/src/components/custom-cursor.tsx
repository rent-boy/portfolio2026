"use client"

import { useState, useEffect } from "react"

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      const target = e.target as Element
      const shouldHide =
        !!target.closest(".cursor-none") || !!target.closest("#hero-section")
      setHidden(shouldHide)
    }

    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    window.addEventListener("mousemove", move)
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("mouseenter", enter)

    return () => {
      window.removeEventListener("mousemove", move)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("mouseenter", enter)
    }
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-[9999] select-none leading-none"
      style={{
        left: pos.x,
        top: pos.y,
        color: "#FF00FF",
        fontSize: 22,
        fontWeight: 700,
        transform: `translate(-50%, -50%) scale(${hidden ? 0 : 1})`,
        opacity: hidden ? 0 : 1,
        transition: "transform 0.2s ease, opacity 0.2s ease",
      }}
    >
      ✼
    </div>
  )
}
