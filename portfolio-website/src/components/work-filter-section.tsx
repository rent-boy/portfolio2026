"use client"

import { useState } from "react"
import { hexToRgba, isGreyOrBlack } from "@/lib/utils"
import { WorkGrid } from "@/components/work-grid"
import { ExperienceTable } from "@/components/experience-table"

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

interface ExperienceEntry {
  year: string
  company: string
  role: string
}

export function WorkFilterSection({
  projects,
  profileImageUrl,
  heroText,
  experienceEntries,
  children,
}: {
  projects: Project[]
  profileImageUrl?: string
  heroText?: string
  experienceEntries?: ExperienceEntry[]
  children?: React.ReactNode
}) {
  const [bgColor, setBgColor] = useState<string | null>(null)

  return (
    <div style={{ backgroundColor: bgColor && !isGreyOrBlack(bgColor) ? hexToRgba(bgColor, 0.30) : '#ffffff', transition: 'background-color 0.4s ease' }}>
      {/* Info block */}
      <div className="max-w-[880px] mx-auto px-6 pt-12 pb-8">
        {/* Image + bio text */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-[20px] md:items-start">
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-full md:w-[250px] md:flex-shrink-0 object-cover grayscale hover:grayscale-0 transition-[filter] duration-300"
            />
          )}
          <div className="flex-1">
            {heroText && (
              <p className="text-[24px] font-light leading-snug text-gray-900 font-[family-name:var(--font-funnel-display)]">
                {heroText}
              </p>
            )}
            <ExperienceTable entries={experienceEntries ?? []} />
          </div>
        </div>
      </div>

      {/* Work grid */}
      <div className="px-6 py-8">
        <WorkGrid projects={projects} onHoverColor={setBgColor} />
      </div>

      {children}
    </div>
  )
}
