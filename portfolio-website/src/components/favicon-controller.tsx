"use client"

import { useEffect } from "react"

export function FaviconController() {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const setFavicon = (href: string) => {
      const link =
        (document.querySelector("link[rel~='icon']") as HTMLLinkElement) ||
        Object.assign(document.createElement("link"), { rel: "icon", type: "image/svg+xml" })
      if (!link.parentNode) document.head.appendChild(link)
      link.href = href
    }

    const onMove = () => {
      setFavicon("/icon-animated.svg")
      clearTimeout(timeout)
      timeout = setTimeout(() => setFavicon("/icon.svg"), 1000)
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      clearTimeout(timeout)
    }
  }, [])

  return null
}
