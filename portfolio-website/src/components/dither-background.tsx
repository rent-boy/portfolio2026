"use client"

import dynamic from "next/dynamic"

const Grainient = dynamic(() => import("@/components/Grainient"), { ssr: false })

export function DitherBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Grainient
        color1="#b4b4b4"
        color2="#707070"
        color3="#707070"
        timeSpeed={1.4}
      />
    </div>
  )
}

