"use client"

import { useState, useEffect } from "react"

export function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/Oslo",
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return <span suppressHydrationWarning>{time}</span>
}
