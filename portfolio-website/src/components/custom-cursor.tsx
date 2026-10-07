"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  // Fullscreen media viewer: black backdrop with media of any colour. A white cursor in
  // difference mode inverts against whatever is under it, so it stays visible on both.
  const [onDark, setOnDark] = useState(false)
  const color = onDark ? "#ffffff" : "#1e1e1e"

  const [isTouch, setIsTouch] = useState(true)
  // Remember which page the tile hover started on: a tile click navigates away
  // mid-hover and never reports hover end, so only hide the cursor on that page.
  const [tileHoverPath, setTileHoverPath] = useState<string | null>(null)
  const tileHovered = tileHoverPath === pathname

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)
    const onTileHover = (e: Event) =>
      setTileHoverPath((e as CustomEvent).detail.active ? window.location.pathname : null)

    window.addEventListener("mousemove", move)
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("mouseenter", enter)
    document.addEventListener("tile-hover", onTileHover)
    const onDarkOverlay = (e: Event) => setOnDark((e as CustomEvent).detail.active)
    document.addEventListener("cursor-on-dark", onDarkOverlay)

    return () => {
      window.removeEventListener("mousemove", move)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("mouseenter", enter)
      document.removeEventListener("tile-hover", onTileHover)
      document.removeEventListener("cursor-on-dark", onDarkOverlay)
    }
  }, [])

  if (isTouch) return null

  return (
    <div
      className="fixed pointer-events-none z-[10001] select-none leading-none"
      style={{
        left: pos.x,
        top: pos.y,
        color,
        fontSize: 22,
        fontWeight: 700,
        transform: `translate(-50%, -50%) scale(${visible && !tileHovered ? 1 : 0})`,
        opacity: visible && !tileHovered ? 1 : 0,
        mixBlendMode: onDark ? "difference" : "normal",
        transition: "transform 0.15s ease, opacity 0.15s ease",
      }}
      aria-hidden
    >
      ✻
    </div>
  )
}
