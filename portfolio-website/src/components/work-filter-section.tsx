"use client"

import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import Link from "next/link"

interface LandingMedia {
  url: string
  mimeType: string
}

interface Project {
  _id: string
  title: string
  subtitle: string
  category: string
  client: string
  year: string
  landingImages?: LandingMedia[]
  thumbnailImage?: string
  thumbnailColor?: string
  thumbnailLightColor?: string
  slug: { current: string }
  assignedBar?: string
  hoverBgColor?: string
  hoverAccentColor?: string
  isOpen?: boolean
  closedProjectUrl?: string
}

interface ExperienceEntry {
  year: string
  company: string
  role: string
}

const MONO = "font-[family-name:var(--font-geist-mono)] font-normal text-[12px] md:text-[14px] tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap"

const BAR_H = 24

const TILE_MARGIN = 20   // px from viewport edge — matches experience bar px-5
const TILE_GAP    = 32   // px between tiles vertically and from experience bar

// --- Sub-components ---

function DottedLine({ weight = 1 }: { weight?: number }) {
  return (
    <div
      style={{
        flex: weight,
        height: "1px",
        backgroundImage:
          "repeating-linear-gradient(to right, rgba(30,30,30,1) 0px, rgba(30,30,30,1) 1px, transparent 1px, transparent 3px)",
      }}
    />
  )
}

function MobileExperienceBar({ entry }: { entry: ExperienceEntry }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCompact, setIsCompact] = useState(false)
  // Randomised once on mount — company goes in row 1 or row 2
  const [companyInRow1] = useState(() => Math.random() < 0.5)

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const containerW = containerRef.current.getBoundingClientRect().width
      if (containerW === 0) return
      // Measure text-only width (no lines) using a detached span with matching styles
      const span = document.createElement("span")
      span.style.cssText =
        "position:fixed;top:-9999px;white-space:nowrap;visibility:hidden;pointer-events:none;" +
        "font-family:var(--font-geist-mono);font-size:10px;letter-spacing:0.8px;"
      span.textContent = `${entry.year} ${entry.company} ${entry.role}`
      document.body.appendChild(span)
      const textW = span.getBoundingClientRect().width
      document.body.removeChild(span)
      // px-[12px] inner padding = 28px total; text must fit in remaining space
      setIsCompact(textW <= containerW - 24)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [entry.year, entry.company, entry.role])

  const T = `${MONO} overflow-hidden text-ellipsis max-w-[66%]`

  return (
    <div ref={containerRef} className="flex flex-col gap-[2px] py-[2px] md:hidden">
      {isCompact ? (
        companyInRow1 ? (
          // 2-row: [Year ── Company ──] / [── Role]
          <>
            <div className="flex items-center px-[12px]">
              <span className={`${T} pr-0.5`}>{entry.year}</span>
              <DottedLine />
              <span className={`${T} px-0.5`}>{entry.company}</span>
              <DottedLine />
            </div>
            <div className="flex items-center px-[12px]">
              <DottedLine />
              <span className={`${T} pl-0.5`}>{entry.role}</span>
            </div>
          </>
        ) : (
          // 2-row: [Year ──] / [── Company ── Role]
          <>
            <div className="flex items-center px-[12px]">
              <span className={`${T} pr-0.5`}>{entry.year}</span>
              <DottedLine />
            </div>
            <div className="flex items-center px-[12px]">
              <DottedLine />
              <span className={`${T} px-0.5`}>{entry.company}</span>
              <DottedLine />
              <span className={`${T} pl-0.5`}>{entry.role}</span>
            </div>
          </>
        )
      ) : (
        // 3-row fallback
        <>
          <div className="flex items-center px-[12px]">
            <span className={`${T} pr-0.5`}>{entry.year}</span>
            <DottedLine />
          </div>
          <div className="flex items-center px-[12px]">
            <DottedLine />
            <span className={`${T} px-0.5`}>{entry.company}</span>
            <DottedLine />
          </div>
          <div className="flex items-center px-[12px]">
            <DottedLine />
            <span className={`${T} pl-0.5`}>{entry.role}</span>
          </div>
        </>
      )}
    </div>
  )
}

// Desktop: randomly placed, scaled-down pile. Single item fills tile height, no crop.
function ProjectImagePile({ items }: { items: LandingMedia[] }) {
  type Layout = { left: number; top: number; width: number; height: number; z: number }
  const [layouts, setLayouts] = useState<Layout[] | null>(null)

  useEffect(() => {
    const n = items.length
    // 2D grid: assign each item to a unique cell, then jitter within it
    const cols = n <= 2 ? n : Math.ceil(Math.sqrt(n))
    const rows = Math.ceil(n / cols)
    const cellW = 100 / cols
    const cellH = 100 / rows
    // Build cell list and shuffle so assignment is random
    const cells: { col: number; row: number }[] = []
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (cells.length < n) cells.push({ col: c, row: r })
    cells.sort(() => Math.random() - 0.5)
    setLayouts(items.map((_, i) => {
      const itemW = 36 + Math.random() * 16          // 36–52%
      const itemH = 52 + Math.random() * 26          // 52–78%
      const { col, row } = cells[i]
      // Place item centered in its cell + random jitter (40% of cell size)
      const centerX = (col + 0.5) * cellW + (Math.random() - 0.5) * cellW * 0.4
      const centerY = (row + 0.5) * cellH + (Math.random() - 0.5) * cellH * 0.4
      const left = Math.min(Math.max(centerX - itemW / 2, 0), 100 - itemW)
      const top  = Math.min(Math.max(centerY - itemH / 2, 0), 100 - itemH)
      return { left, top, width: itemW, height: itemH, z: i }
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (items.length === 1) {
    const item = items[0]
    const style: React.CSSProperties = {
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      objectFit: 'contain',   // no cropping
    }
    return (
      <div className="relative w-full h-full">
        {item.mimeType?.startsWith("video/")
          ? <video src={item.url} autoPlay muted loop playsInline style={style} />
          : <img src={item.url} alt="" style={style} />}
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {layouts && items.map((item, i) => {
        const { left, top, width, height, z } = layouts[i] ?? { left: 20, top: 20, width: 36, height: 55, z: i }
        const wrapStyle: React.CSSProperties = {
          position: 'absolute',
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          zIndex: z,
        }
        const mediaStyle: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'contain', display: 'block' }
        return (
          <div key={i} style={wrapStyle}>
            {item.mimeType?.startsWith("video/")
              ? <video src={item.url} autoPlay muted loop playsInline style={mediaStyle} />
              : <img src={item.url} alt="" style={mediaStyle} />}
          </div>
        )
      })}
    </div>
  )
}

// Mobile: auto-playing crossfade slideshow
function MobileTileSlideshow({ items }: { items: LandingMedia[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const id = setInterval(() => setCurrent(prev => (prev + 1) % items.length), 3000)
    return () => clearInterval(id)
  }, [items.length])

  return (
    <div className="relative w-full h-full">
      {items.map((item, i) => {
        const active = i === current
        const base: React.CSSProperties = {
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: active ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }
        return item.mimeType?.startsWith("video/") ? (
          <video key={i} src={item.url} autoPlay muted loop playsInline style={base} />
        ) : (
          <img key={i} src={item.url} alt="" style={base} />
        )
      })}
    </div>
  )
}

function ProjectTile({
  project,
  globalIndex,
}: {
  project: Project
  globalIndex: number
}) {
  const [hovered, setHovered] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const tileRef = useRef<HTMLDivElement>(null)
  const isLeft = globalIndex % 2 === 0

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) return
    const rect = tileRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => {
    setHovered(true)
    if (project.hoverBgColor) document.documentElement.style.setProperty('--tile-hover-bg', project.hoverBgColor)
    document.dispatchEvent(new CustomEvent('tile-hover', { detail: { active: true } }))
  }
  const handleMouseLeave = () => {
    setHovered(false)
    document.documentElement.style.removeProperty('--tile-hover-bg')
    document.dispatchEvent(new CustomEvent('tile-hover', { detail: { active: false } }))
  }


  const metaParts = [project.client, project.category, project.year].filter(Boolean)

  const open = project.isOpen !== false
  const hasExternalLink = !open && !!project.closedProjectUrl
  const Wrapper = open ? Link : hasExternalLink ? 'a' : 'div'
  const wrapperProps = open
    ? { href: `/${project.slug.current}`, className: 'block cursor-none' }
    : hasExternalLink
    ? { href: project.closedProjectUrl, target: '_blank', rel: 'noopener noreferrer', className: 'block cursor-none' }
    : { className: 'block cursor-default select-none' }

  return (
    <Wrapper {...(wrapperProps as any)}>
      <div style={isMobile
        ? { marginLeft: '12px', marginRight: '12px', width: 'calc(100% - 24px)', aspectRatio: '1 / 1', height: 'auto', marginTop: '12px' }
        : {
            marginLeft:  isLeft ? `${TILE_MARGIN}px` : 'auto',
            marginRight: isLeft ? 'auto' : `${TILE_MARGIN}px`,
            marginTop: `${TILE_GAP}px`,
            width: '560px',
            height: '320px',
          }
      }>
        <div
          ref={tileRef}
          className="relative h-full"
          style={{ cursor: hovered ? 'none' : undefined }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {(() => {
            const items: LandingMedia[] = project.landingImages?.length
              ? project.landingImages
              : project.thumbnailImage
              ? [{ url: project.thumbnailImage, mimeType: "image/jpeg" }]
              : []
            if (items.length === 0) return <div className="h-full" />
            // Single item: always use contain/centered logic (same on mobile & desktop)
            // Multiple items: pile on desktop, crossfade slideshow on mobile
            return (isMobile && items.length > 1)
              ? <MobileTileSlideshow items={items} />
              : <ProjectImagePile items={items} />
          })()}

          {/* Hover card — desktop only, follows cursor */}
          <div
            className="absolute top-0 left-0 w-[400px] bg-white p-4 hidden md:flex flex-col gap-3 pointer-events-none z-50 transition-opacity duration-150"
            style={{
              opacity: hovered ? 1 : 0,
              transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
            }}
          >
            <h3 className="font-semibold text-[32px] leading-[1.2] font-[family-name:var(--font-sora)] text-black">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="font-[family-name:var(--font-geist-mono)] text-[14px] tracking-[0.8px] text-[#626262] whitespace-nowrap">
                {project.subtitle}
              </p>
            )}
            {metaParts.length > 0 && (
              <div className="flex items-center gap-[10px] font-[family-name:var(--font-geist-mono)] text-[16px] tracking-[0.8px] uppercase text-[#626262] whitespace-nowrap">
                {metaParts.map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span>✻</span>}
                    <span>{part}</span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Mobile card — fixed to bottom center of tile */}
          <div className="absolute bottom-0 left-0 right-0 flex md:hidden justify-center pb-3 pointer-events-none">
            <div className="bg-white px-3 py-2 flex flex-col gap-[3px] max-w-[85%]">
              <h3 className="font-semibold text-[20px] leading-[1.2] font-[family-name:var(--font-sora)] text-black">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="font-[family-name:var(--font-geist-mono)] text-[14px] tracking-[0.6px] text-[#626262]">
                  {project.subtitle}
                </p>
              )}
              {metaParts.length > 0 && (
                <div className="flex items-center gap-[6px] font-[family-name:var(--font-geist-mono)] text-[14px] tracking-[0.6px] uppercase text-[#626262] flex-wrap">
                  {metaParts.map((part, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span>✻</span>}
                      <span>{part}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

function ProjectSlideshow({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0)
  const images = projects.filter((p) => p.thumbnailImage)

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => setCurrent((prev) => (prev + 1) % images.length), 3500)
    return () => clearInterval(id)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div className="relative overflow-hidden bg-[#f1f1f1] w-full h-full">
      {images.map((project, i) => (
        <img
          key={project._id}
          src={project.thumbnailImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
    </div>
  )
}

// --- Main export ---

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
  const entries = experienceEntries ?? []
  const n = Math.max(entries.length, 1)

  // Measure actual nav + hero + bar heights so bars stack with zero gap on all breakpoints
  const heroRef = useRef<HTMLElement>(null)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])
  const [navH, setNavH] = useState(56)
  const [heroH, setHeroH] = useState(0)
  const [barHeights, setBarHeights] = useState<number[]>(() => entries.map(() => BAR_H))

  useLayoutEffect(() => {
    const measure = () => {
      const nav = document.querySelector("nav")
      if (nav) setNavH(nav.getBoundingClientRect().height)
      if (heroRef.current) setHeroH(heroRef.current.getBoundingClientRect().height)
      const heights = barRefs.current.map(el => el ? el.getBoundingClientRect().height : BAR_H)
      if (heights.length) setBarHeights(heights)
    }
    measure()
    const ro = new ResizeObserver(measure)
    const nav = document.querySelector("nav")
    if (nav) ro.observe(nav)
    if (heroRef.current) ro.observe(heroRef.current)
    barRefs.current.forEach(el => { if (el) ro.observe(el) })
    return () => ro.disconnect()
  }, [])

  // Scroll-driven hero text scale: desktop 28→20 over first 200px of scroll; mobile fixed at 20px
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const scrollProgress = Math.min(scrollY / 200, 1)
  const heroFontSize = isMobile
    ? 20                                                 // fixed on mobile
    : 28 - scrollProgress * 8                           // 28 → 20 on desktop
  const heroMaxWidth = isMobile
    ? undefined                                          // controlled by CSS class (max-w-[65%])
    : 507 * (heroFontSize / 28)

  // Random company position per bar — 0.5 on SSR, randomised after mount
  const [companyPositions, setCompanyPositions] = useState<number[]>(() =>
    entries.map(() => 0.5)
  )
  useEffect(() => {
    setCompanyPositions(entries.map(() => 0.1 + Math.random() * 0.8))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Distribute projects: match assignedBar (company name) → fallback round-robin
  type Slot = { project: Project }
  const chunks: Slot[][] = Array.from({ length: n }, () => [])
  const hasAssignedBars = projects.some(p => p.assignedBar)
  if (hasAssignedBars) {
    const byBar = new Map<string, Slot[]>()
    projects.forEach((p) => {
      if (!p.assignedBar) return
      if (!byBar.has(p.assignedBar)) byBar.set(p.assignedBar, [])
      byBar.get(p.assignedBar)!.push({ project: p })
    })
    entries.forEach((entry, i) => {
      const matches = byBar.get(entry.company) ?? []
      chunks[i].push(...matches)
    })
  } else {
    projects.forEach((p, i) => chunks[i % n].push({ project: p }))
  }

  // Pre-compute each section's start render index so left/right alternates correctly in scroll order
  const sectionStartIndex: number[] = []
  entries.forEach((_, i) => {
    sectionStartIndex.push(i === 0 ? 0 : sectionStartIndex[i - 1] + (chunks[i - 1]?.length ?? 0))
  })

  // Mobile: projects in visual scroll order → equally divide scroll into white→p1→p2→…→white
  const mobileColorList = entries.flatMap((_, i) => chunks[i] ?? []).map(s => s.project.hoverBgColor ?? null)
  useEffect(() => {
    if (!isMobile || mobileColorList.length === 0) return
    const update = () => {
      const totalScroll = document.body.scrollHeight - window.innerHeight
      if (totalScroll <= 0) return
      const n = mobileColorList.length
      const totalSegments = n + 2            // white + one per project + white
      const progress = Math.min(window.scrollY / totalScroll, 1)
      const segment = Math.min(Math.floor(progress * totalSegments), totalSegments - 1)
      const color = segment > 0 && segment < totalSegments - 1 ? mobileColorList[segment - 1] : null
      if (color) document.documentElement.style.setProperty('--tile-hover-bg', color)
      else document.documentElement.style.removeProperty('--tile-hover-bg')
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      document.documentElement.style.removeProperty('--tile-hover-bg')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, mobileColorList.join(',')])

  return (
    <div className="relative overflow-x-clip">
      {/* Hero text — sticky on all breakpoints */}
      <section
        ref={heroRef}
        className="sticky z-[48] px-[12px] pt-0 pb-1 md:px-5 md:pb-2"
        style={{ top: `${navH}px`, backgroundColor: 'var(--tile-hover-bg, #ffffff)', transition: 'background-color 0.4s ease' }}
      >
        {heroText && (
          <p
            className="hero-text font-light leading-[1.3] text-[#1e1e1e] font-[family-name:var(--font-sora)]"
            style={{ fontSize: `${heroFontSize}px`, maxWidth: !isMobile && heroMaxWidth != null ? `${heroMaxWidth}px` : undefined }}
          >
            {heroText}
          </p>
        )}
      </section>

      {/* Profile image — desktop only, bottom-right aligned with bar text (px-5 = 20px) */}
      {profileImageUrl && (
        <div className="absolute z-[49] bottom-8 md:bottom-[18px] right-[12px] md:right-5 w-fit">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-auto h-[160px] md:h-[280px] hover:brightness-110 hover:saturate-[1.2] transition-all duration-300"
          />
        </div>
      )}

      {/* Experience bars + project tile sections */}
      {entries.map((entry, i) => {
        const stickyTop = navH + heroH + barHeights.slice(0, i).reduce((sum, h) => sum + h, 0)
        const pos = companyPositions[i] ?? 0.5
        const sectionSlots = chunks[i] ?? []

        return (
          <React.Fragment key={i}>
            {/* Experience bar — sticky on all breakpoints */}
            <div
              ref={el => { barRefs.current[i] = el }}
              className="sticky"
              style={{ top: `${stickyTop}px`, zIndex: 45 - i, backgroundColor: 'var(--tile-hover-bg, #ffffff)', transition: 'background-color 0.4s ease' }}
            >
              {/* Desktop: single row */}
              <div className="hidden md:flex items-center px-5 py-[6px]">
                <span className={`${MONO} pr-2 max-w-[66%] overflow-hidden text-ellipsis`}>{entry.year}</span>
                <DottedLine weight={pos} />
                <span className={`${MONO} px-4 max-w-[66%] overflow-hidden text-ellipsis`}>{entry.company}</span>
                <DottedLine weight={1 - pos} />
                <span className={`${MONO} pl-2 max-w-[66%] overflow-hidden text-ellipsis`}>{entry.role}</span>
              </div>

              {/* Mobile: compact (2-row) or standard (3-row) based on text width */}
              <MobileExperienceBar entry={entry} />
            </div>

            {/* Project tiles — last section needs full-screen min-h so final bar can reach its sticky slot */}
            <div className={`${i === entries.length - 1 ? "min-h-[60vh]" : "min-h-[40vh]"} pb-3 md:pb-8`}>
              {sectionSlots.map(({ project }, j) => (
                <ProjectTile
                  key={project._id}
                  project={project}
                  globalIndex={sectionStartIndex[i] + j}
                />
              ))}
            </div>
          </React.Fragment>
        )
      })}

      {children}
    </div>
  )
}
