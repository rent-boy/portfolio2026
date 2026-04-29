"use client"

import React, { CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className,
}: ShinyTextProps) {
  const animationDuration = `${speed}s`

  const maskStyle: CSSProperties = {
    maskImage: disabled
      ? "none"
      : `linear-gradient(
        -75deg,
        rgba(255, 255, 255, 0.6) 30%,
        #fff 50%,
        rgba(255, 255, 255, 0.6) 70%
      )`,
    WebkitMaskImage: disabled
      ? "none"
      : `linear-gradient(
        -75deg,
        rgba(255, 255, 255, 0.6) 30%,
        #fff 50%,
        rgba(255, 255, 255, 0.6) 70%
      )`,
    maskSize: disabled ? "100%" : "200%",
    WebkitMaskSize: disabled ? "100%" : "200%",
    animation: disabled ? undefined : `shiny-text ${animationDuration} infinite`,
  }

  return (
    <>
      <style>
        {`
          @keyframes shiny-text {
            0% {
              mask-position: 0%;
              -webkit-mask-position: 0%;
            }
            100% {
              mask-position: 100%;
              -webkit-mask-position: 100%;
            }
          }
        `}
      </style>
      <span className={cn("inline-block", className)} style={maskStyle}>
        {text}
      </span>
    </>
  )
}

