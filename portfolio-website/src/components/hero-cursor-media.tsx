"use client"

import { useState, useEffect, useCallback } from "react"

interface CursorMediaItem {
  url: string
  mimeType: string
  alt?: string
  chipLabel?: string
}

interface HeroCursorMediaProps {
  media: CursorMediaItem[]
}

interface HookedItem {
  x: number
  y: number
  index: number
}

function MediaEl({ item, style }: { item: CursorMediaItem; style: React.CSSProperties }) {
  const isVideo = item.mimeType?.startsWith("video/")
  const mediaStyle: React.CSSProperties = { maxWidth: "60vw", maxHeight: "60vh", display: "block" }
  return isVideo ? (
    <video key={item.url} src={item.url} autoPlay loop muted playsInline style={mediaStyle} />
  ) : (
    <img src={item.url} alt={item.alt || ""} style={mediaStyle} />
  )
}

const hookedStyle: React.CSSProperties = {
  transform: "translate(-50%, -50%)",
  maxWidth: "60vw",
  maxHeight: "60vh",
  zIndex: 5,
  filter: "blur(12px)",
  mixBlendMode: "overlay",
}

const followerStyle: React.CSSProperties = {
  transform: "translate(-50%, -50%)",
  maxWidth: "60vw",
  maxHeight: "60vh",
  zIndex: 6,
}

const DEFAULT_CHIP_LABEL = "✤ Preview next ✤"

export function HeroCursorMedia({ media }: HeroCursorMediaProps) {
  const [hookedItems, setHookedItems] = useState<HookedItem[]>([])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorIndex, setCursorIndex] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(false)

  const getHeroRect = () => document.getElementById("hero-section")?.getBoundingClientRect()

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!media.length) return

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el?.closest("[data-no-cursor-media]")) {
        setCursorVisible(false)
        return
      }

      const rect = getHeroRect()
      if (!rect) return
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      setCursorVisible(true)
    },
    [media.length]
  )

  const handleMouseLeave = useCallback(() => {
    setCursorVisible(false)
    // hooked items intentionally persist until page reload
  }, [])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!cursorVisible || !media.length) return

      const rect = getHeroRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setHookedItems((prev) => [...prev, { x, y, index: cursorIndex }])
      setCursorIndex((i) => (i + 1) % media.length)
    },
    [cursorVisible, cursorIndex, media.length]
  )

  useEffect(() => {
    const hero = document.getElementById("hero-section")
    if (!hero) return
    hero.style.cursor = "none"
    hero.addEventListener("mousemove", handleMouseMove)
    hero.addEventListener("mouseleave", handleMouseLeave)
    hero.addEventListener("click", handleClick)
    return () => {
      hero.style.cursor = ""
      hero.removeEventListener("mousemove", handleMouseMove)
      hero.removeEventListener("mouseleave", handleMouseLeave)
      hero.removeEventListener("click", handleClick)
    }
  }, [handleMouseMove, handleMouseLeave, handleClick])

  if (!media.length) return null

  return (
    <>
      {/* Stamped items — blur + overlay, persist forever */}
      {hookedItems.map((h, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: h.x, top: h.y, ...hookedStyle }}
        >
          <MediaEl item={media[h.index % media.length]} style={hookedStyle} />
        </div>
      ))}

      {/* Cursor follower — clean, no effects */}
      {cursorVisible && (
        <div
          className="absolute pointer-events-none"
          style={{ left: cursorPos.x, top: cursorPos.y, ...followerStyle }}
        >
          <div className="relative">
            <MediaEl item={media[cursorIndex % media.length]} style={followerStyle} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-[#FF00FF] text-white text-[14.4px] font-normal px-[14.4px] py-[7.2px] rounded-full whitespace-nowrap font-[family-name:var(--font-funnel-sans)]">
                {media[cursorIndex % media.length].chipLabel || DEFAULT_CHIP_LABEL}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
