"use client"

import Link from "next/link"

const NAME  = "Siddharth Kothiyal"
const LOCATION = "Oslo"
const EMAIL = "siddharthkothiyal05@gmail.com"

const nameCls = "text-[24px] font-medium font-[family-name:var(--font-funnel-display)]"
const metaCls = "text-[24px] font-normal font-[family-name:var(--font-funnel-display)]"
const accentStyle = { color: 'var(--project-accent, #111827)' }

export function Navigation() {
  return (
    <nav>
      <div className="max-w-full mx-auto px-6 py-4">
        {/* Mobile */}
        <div className="flex flex-col gap-1 md:hidden">
          <Link href="/" className={nameCls} style={accentStyle}>{NAME}</Link>
          <span className={metaCls} style={accentStyle}>{LOCATION}</span>
          <a href={`mailto:${EMAIL}`} className="text-[20px] font-normal font-[family-name:var(--font-funnel-display)]" style={accentStyle}>{EMAIL}</a>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex justify-between items-baseline">
          <Link href="/" className={nameCls} style={accentStyle}>{NAME}</Link>
          <span className={metaCls} style={accentStyle}>{LOCATION}</span>
          <a href={`mailto:${EMAIL}`} className={metaCls} style={accentStyle}>{EMAIL}</a>
        </div>
      </div>
    </nav>
  )
}
