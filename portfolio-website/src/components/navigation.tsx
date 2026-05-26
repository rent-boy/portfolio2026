import Link from "next/link"
import { MovingClock } from "@/components/moving-clock"
import { MobileNavClock } from "@/components/mobile-nav-clock"
import { getSiteSettings } from "@/lib/sanity"

const cls = "font-[family-name:var(--font-geist-mono)] font-normal text-[12px] md:text-[14px] uppercase tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap"
const sep = <span className={cls}>✻</span>

export async function Navigation() {
  const settings = await getSiteSettings()
  const linkedInUrl = settings?.linkedInUrl || "#"
  const email = "mailto:siddharthkothiyal05@gmail.com"
  const resumeUrl = settings?.cvButtonUrl || "#"

  return (
    <nav
      className="sticky top-0 z-50 relative"
      style={{ backgroundColor: 'var(--tile-hover-bg, #ffffff)', transition: 'background-color 0.4s ease' }}
    >
      {/* Row 1: Name + track/clock */}
      <div className="flex items-center px-[12px] py-2 md:px-5 md:py-[18px] relative">
        {/* Name — z-10 so it stays above the mobile clock */}
        <Link
          href="/"
          data-nav-name
          className={`${cls} relative z-10 pr-1 md:pr-0`}
          style={{ backgroundColor: 'var(--tile-hover-bg, #ffffff)', transition: 'background-color 0.4s ease' }}
        >
          Siddharth Kothiyal
        </Link>

        {/* Desktop: inner track with moving clock */}
        <div className="hidden md:flex flex-1 relative self-stretch items-center mx-4">
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#1e1e1e]" />
          <MovingClock />
        </div>
        <div className={`hidden md:flex items-center gap-3 ${cls}`}>
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">LinkedIn</a>
          {sep}
          <a href={email} className="hover:opacity-60 transition-opacity">Email</a>
          {sep}
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Resume</a>
        </div>

        {/* Mobile row 1 line — tagged for MobileNavClock (segment 0: 00:00–08:00) */}
        <div className="md:hidden absolute inset-x-[12px] top-0 bottom-0" aria-hidden>
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#1e1e1e]" data-mobile-line="1" />
        </div>
      </div>

      {/* Mobile only: separator line + links row */}
      <div className="md:hidden">
        {/* Segment 1 line: 12:00–24:00 */}
        <div className="h-px bg-[#1e1e1e] mx-[12px]" data-mobile-line="2" />
        {/* Buttons row — no line, spread across */}
        <div className={`flex items-center justify-between px-[12px] py-2 ${cls}`}>
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">LinkedIn</a>
          {sep}
          <a href={email} className="hover:opacity-60 transition-opacity">Email</a>
          {sep}
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Resume</a>
        </div>
      </div>

      {/* Mobile clock — traverses all three row lines based on time of day */}
      <MobileNavClock />
    </nav>
  )
}
