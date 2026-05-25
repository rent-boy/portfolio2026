"use client"

import { useState, useEffect, useRef, useCallback } from "react"

const cls = "font-[family-name:var(--font-geist-mono)] font-normal text-[10px] uppercase tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap"

export function MobileNavClock() {
  const ref = useRef<HTMLDivElement>(null)
  const [timeStr, setTimeStr] = useState("")
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)

  const tick = useCallback(() => {
    const el = ref.current
    if (!el) return
    const nav = el.closest("nav")
    if (!nav) return

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

    // Divide the day into 3 equal segments — one per nav row line
    const segment = Math.min(Math.floor(fraction * 3), 2)
    const segFrac = (fraction * 3) % 1

    const navRect = nav.getBoundingClientRect()
    const lineEl = nav.querySelector(`[data-mobile-line="${segment + 1}"]`) as HTMLElement | null

    let lineY: number
    let lineLeft: number
    let lineWidth: number

    if (lineEl) {
      const r = lineEl.getBoundingClientRect()
      lineY = r.top + r.height / 2 - navRect.top
      lineLeft = r.left - navRect.left
      lineWidth = r.width
    } else {
      lineY = 20 + segment * 37
      lineLeft = 12
      lineWidth = navRect.width - 24
    }

    // On row 1, don't let the clock travel over the name text
    if (segment === 0) {
      const nameEl = nav.querySelector('[data-nav-name]') as HTMLElement | null
      if (nameEl) {
        const nameRight = nameEl.getBoundingClientRect().right - navRect.left
        lineWidth = lineLeft + lineWidth - nameRight
        lineLeft = nameRight
      }
    }

    const halfW = el.getBoundingClientRect().width / 2
    const rawX = segFrac * lineWidth
    const clampedX = Math.min(Math.max(rawX, halfW), lineWidth - halfW)

    setPos({ left: lineLeft + clampedX, top: lineY })
    setTimeStr(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`)
  }, [])

  useEffect(() => {
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [tick])

  return (
    <div
      ref={ref}
      className="md:hidden absolute flex items-center gap-[10px] px-2 pointer-events-none z-10"
      style={{
        left: pos?.left ?? 0,
        top: pos?.top ?? 0,
        transform: "translate(-50%, -50%)",
        opacity: pos ? 1 : 0,
        backgroundColor: "var(--tile-hover-bg, #ffffff)",
        transition: "background-color 0.4s ease",
      }}
      suppressHydrationWarning
    >
      <span className={cls}>Oslo</span>
      <span className={cls}>✻</span>
      <span className={cls} suppressHydrationWarning>{timeStr}</span>
    </div>
  )
}
