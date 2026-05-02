import React from "react"

interface ExperienceEntry {
  year: string
  company: string
  role: string
}

export function ExperienceTable({ entries }: { entries: ExperienceEntry[] }) {
  if (!entries || entries.length === 0) return null

  return (
    <div className="mt-4 overflow-x-auto">
    <div
      className="grid gap-x-4 gap-y-[6px]"
      style={{ gridTemplateColumns: '4rem 14rem 11rem' }}
    >
      {entries.map((entry, i) => (
        <React.Fragment key={i}>
          <span className="text-[16px] font-light text-gray-400 font-[family-name:var(--font-funnel-sans)] tabular-nums whitespace-nowrap">
            {entry.year}
          </span>
          <span className="text-[16px] font-normal text-gray-700 font-[family-name:var(--font-funnel-sans)]">
            {entry.company}
          </span>
          <span className="text-[16px] font-light text-gray-400 font-[family-name:var(--font-funnel-sans)]">
            {entry.role}
          </span>
        </React.Fragment>
      ))}
    </div>
    </div>
  )
}
