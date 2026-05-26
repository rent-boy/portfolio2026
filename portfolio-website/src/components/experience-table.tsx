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
      className="grid gap-x-4 gap-y-[6px] items-start justify-items-start"
      style={{ gridTemplateColumns: '4.4rem 1fr 1fr' }}
    >
      {entries.map((entry, i) => (
        <React.Fragment key={i}>
          <span className="text-[16px] font-light text-gray-400 font-[family-name:var(--font-funnel-sans)] tabular-nums whitespace-nowrap flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
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
