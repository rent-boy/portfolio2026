"use client"

import { useState, useEffect, useRef } from "react"

const cls = "font-[family-name:var(--font-geist-mono)] font-normal text-[10px] md:text-[14px] uppercase tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap"

export function MovingClock({ isStatic, className }: { isStatic?: boolean; className?: string }) {
  const [position, setPosition] = useState(50)
  const [timeStr, setTimeStr] = useState("")
  const clockRef = useRef<HTMLDivElement>(null)
  const [halfWPct, setHalfWPct] = useState(0)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Oslo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(now)

      const h = parseInt(parts.find(p => p.type === "hour")!.value)
      const m = parseInt(parts.find(p => p.type === "minute")!.value)
      const fraction = (h * 60 + m) / (24 * 60)

      setPosition(8 + fraction * 84)
      setTimeStr(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Measure half-width as % of parent so the clock never overflows its track container
  useEffect(() => {
    const measure = () => {
      const el = clockRef.current
      if (!el) return
      const parent = el.parentElement
      if (!parent) return
      const pw = parent.getBoundingClientRect().width
      const cw = el.getBoundingClientRect().width
      if (pw > 0) setHalfWPct((cw / 2 / pw) * 100)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const clampedPos = halfWPct > 0
    ? Math.min(Math.max(position, halfWPct), 100 - halfWPct)
    : position

  if (isStatic) {
    return (
      <div className={`flex items-center gap-[10px] ${className ?? ''}`} suppressHydrationWarning>
        <span className={cls}>Oslo</span>
        <span className={cls}>✻</span>
        <span className={cls} suppressHydrationWarning>{timeStr}</span>
      </div>
    )
  }

  return (
    <div
      ref={clockRef}
      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-[10px] px-3 ${className ?? ''}`}
      style={{ left: `${clampedPos}%`, backgroundColor: 'var(--tile-hover-bg, #ffffff)', transition: 'background-color 0.4s ease' }}
      suppressHydrationWarning
    >
      <span className={cls}>Oslo</span>
      <span className={cls}>✻</span>
      <span className={cls} suppressHydrationWarning>{timeStr}</span>
    </div>
  )
}
