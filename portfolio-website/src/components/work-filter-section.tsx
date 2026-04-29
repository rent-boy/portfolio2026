"use client"

import { useState } from "react"
import { cn, hexToRgba, isGreyOrBlack } from "@/lib/utils"
import { WorkGrid } from "@/components/work-grid"

const TABS = ["All", "2024-26", "2022-24", "2019-22", "2015-19"] as const
type Tab = (typeof TABS)[number]

interface Project {
  _id: string
  title: string
  subtitle: string
  category: string
  client: string
  year: string
  period?: string
  thumbnailImage?: string
  thumbnailColor?: string
  thumbnailLightColor?: string
  thumbnailVideo?: string
  coverImage?: string
  slug: { current: string }
}

export function WorkFilterSection({
  projects,
  profileImageUrl,
  heroText,
  children,
}: {
  projects: Project[]
  profileImageUrl?: string
  heroText?: string
  children?: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState<Tab>("All")
  const [bgColor, setBgColor] = useState<string | null>(null)

  const filtered =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.period === activeTab)

  return (
    <div style={{ backgroundColor: bgColor && !isGreyOrBlack(bgColor) ? hexToRgba(bgColor, 0.30) : '#ffffff', transition: 'background-color 0.4s ease' }}>
      {/* Info block — centered, matches reference layout */}
      <div className="max-w-[900px] mx-auto px-6 pt-12 pb-8">
        {/* Image + bio text — stacked on mobile, side by side on desktop */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-start mb-8">
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-full md:w-52 md:flex-shrink-0 rounded-xl object-cover grayscale hover:grayscale-0 transition-[filter] duration-300"
            />
          )}
          {heroText && (
            <p className="text-[24px] font-light leading-snug text-gray-900 font-[family-name:var(--font-funnel-display)]">
              {heroText}
            </p>
          )}
        </div>

        {/* Filter tabs — vertical on mobile, horizontal on desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-[24px] text-left font-[family-name:var(--font-bitter)] transition-colors",
                activeTab === tab ? "font-semibold" : "font-normal hover:opacity-70"
              )}
              style={{ color: activeTab === tab ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.4)' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Work grid — full width */}
      <div className="px-6 py-8">
        <WorkGrid projects={filtered} onHoverColor={setBgColor} />
      </div>

      {children}
    </div>
  )
}
