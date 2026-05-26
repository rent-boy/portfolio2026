"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import React from "react"
import Link from "next/link"
import { PortableText } from '@portabletext/react'
import { SideNavigation } from './side-navigation'
import { FullscreenModal } from './fullscreen-modal'

function DottedLine() {
  return (
    <div
      style={{
        flex: 1,
        height: '1px',
        backgroundImage:
          'repeating-linear-gradient(to right, rgba(30,30,30,1) 0px, rgba(30,30,30,1) 1px, transparent 1px, transparent 3px)',
      }}
    />
  )
}

const paragraphComponents = {
  block: {
    normal: ({ children }: any) => (
      <p
        style={{
          fontSize: '18px',
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 300,
          color: '#1e1e1e',
          lineHeight: 1.7,
        }}
        className="mb-0"
      >
        {children}
      </p>
    ),
    h4: ({ children }: any) => (
      <h4
        style={{
          fontSize: '20px',
          fontFamily: 'var(--font-sora)',
          fontWeight: 600,
          color: '#1e1e1e',
          lineHeight: 1.3,
        }}
        className="mb-0 mt-2"
      >
        {children}
      </h4>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => <span className="underline">{children}</span>,
    link: ({ children, value }: any) => {
      const href = value?.href || ''
      const isInternal = href.startsWith('/')
      return isInternal ? (
        <Link href={href} className="underline" style={{ color: 'var(--project-accent, #1e1e1e)' }}>
          {children}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: 'var(--project-accent, #1e1e1e)' }}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-outside mb-0 pl-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-outside mb-0 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li style={{ fontSize: '18px', fontFamily: 'var(--font-dm-sans)', fontWeight: 300, color: '#1e1e1e', lineHeight: 1.7 }}>{children}</li>
    ),
    number: ({ children, value }: any) => {
      const firstSpan = value?.children?.[0]
      const markerBold = firstSpan?.marks?.includes('strong')
      return (
        <li style={{ fontSize: '18px', fontFamily: 'var(--font-dm-sans)', fontWeight: markerBold ? 700 : 300, color: '#1e1e1e', lineHeight: 1.7 }}>
          <span style={{ fontWeight: 300 }}>{children}</span>
        </li>
      )
    },
  },
}

function BlockButton({ buttonLabel, buttonUrl }: { buttonLabel?: string; buttonUrl?: string }) {
  if (!buttonLabel || !buttonUrl) return null
  const isExternal = buttonUrl.startsWith('http://') || buttonUrl.startsWith('https://')
  const cls =
    'inline-block mt-4 px-5 py-2 text-[13px] font-[family-name:var(--font-geist-mono)] tracking-[0.8px] uppercase border border-[#1e1e1e] hover:bg-[#1e1e1e] hover:text-white transition-colors'
  if (isExternal) {
    return (
      <a href={buttonUrl} target="_blank" rel="noopener noreferrer" className={cls}>
        {buttonLabel}
      </a>
    )
  }
  return (
    <Link href={buttonUrl} className={cls}>
      {buttonLabel}
    </Link>
  )
}

interface MediaItem {
  _key: string
  mediaType: 'image' | 'video' | 'prototype'
  url?: string
  alt?: string
  caption?: string
  prototypeUrl?: string
  prototypeHeight?: number
}

interface ContentBlock {
  _type: string
  _key: string
  title?: string
  paragraph?: any
  showInSideNav?: boolean
  buttonLabel?: string
  buttonUrl?: string
  media?: MediaItem[]
}

interface ProjectContentProps {
  project: {
    title: string
    subtitle?: string
    coverImage?: string
    coverVideo?: string
    contentBlocks?: ContentBlock[]
    metadata?: { label: string; value: string }[]
    projectLink?: string
    projectUrl?: string
  }
}

type MediaPos = { left: number; top: number; width: number }

const captionStyle: React.CSSProperties = {
  fontFamily: 'var(--font-geist-mono)',
  fontSize: '12px',
  color: '#1e1e1e',
  opacity: 0.6,
  marginTop: 6,
  letterSpacing: '0.6px',
}

function CollageMedia({ item, pos }: { item: MediaItem; pos: MediaPos }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${pos.left}%`,
    top: `${pos.top}%`,
    width: `${pos.width}%`,
    height: 'auto',
    zIndex: 1,
  }

  if (item.mediaType === 'image' && item.url) {
    return (
      <>
        <div style={style} className="cursor-pointer" onClick={() => setIsFullscreen(true)}>
          <img src={item.url} alt={item.alt || ''} className="w-full h-auto block" />
          {item.caption && <p style={captionStyle}>{item.caption}</p>}
        </div>
        {isFullscreen && (
          <FullscreenModal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} type="image">
            <img src={item.url} alt={item.alt || ''} className="max-w-full max-h-full object-contain" />
          </FullscreenModal>
        )}
      </>
    )
  }

  if (item.mediaType === 'video' && item.url) {
    return (
      <div style={style}>
        <video src={item.url} autoPlay muted loop playsInline className="w-full h-auto block" />
        {item.caption && <p style={captionStyle}>{item.caption}</p>}
      </div>
    )
  }

  if (item.mediaType === 'prototype' && item.prototypeUrl) {
    const protoStyle: React.CSSProperties = {
      ...style,
      height: `${item.prototypeHeight || 600}px`,
    }
    return (
      <div style={protoStyle}>
        <iframe
          src={item.prototypeUrl}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
          title="Prototype"
        />
        <a
          href={item.prototypeUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', marginTop: 8, ...captionStyle, opacity: 1 }}
        >
          Open in new tab →
        </a>
      </div>
    )
  }

  return null
}

export function ProjectContent({ project }: ProjectContentProps) {
  const contentBlocks = project.contentBlocks ?? []
  const allMediaItems = contentBlocks.flatMap((b) => b.media ?? [])

  // Scroll tracking for title scale — same mechanic as landing page hero text
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Title scales 48→24px over first 200px of scroll, width scales proportionally
  // so line breaks stay at the same words (same lockup), identical to landing page behavior
  const scrollProgress = Math.min(scrollY / 200, 1)
  const titleSize = 48 - scrollProgress * 24          // 48 → 24
  const titleWidth = Math.round(460 * (titleSize / 48)) // 460 → 230 (proportional)

  // Measure sticky title section height so sidebar top tracks below it
  const titleSectionRef = useRef<HTMLElement>(null)
  const [titleSectionH, setTitleSectionH] = useState(60)
  useEffect(() => {
    if (!titleSectionRef.current) return
    const ro = new ResizeObserver(() => {
      if (titleSectionRef.current) setTitleSectionH(titleSectionRef.current.offsetHeight)
    })
    ro.observe(titleSectionRef.current)
    return () => ro.disconnect()
  }, [])

  // Measure left column height for media collage container
  const leftColRef = useRef<HTMLDivElement>(null)
  const [leftColHeight, setLeftColHeight] = useState(800)
  useEffect(() => {
    if (!leftColRef.current) return
    const ro = new ResizeObserver(() => {
      if (leftColRef.current) setLeftColHeight(leftColRef.current.offsetHeight)
    })
    ro.observe(leftColRef.current)
    return () => ro.disconnect()
  }, [])

  // Random collage positions — computed after mount to avoid hydration mismatch
  const [mediaPositions, setMediaPositions] = useState<MediaPos[] | null>(null)
  useEffect(() => {
    if (allMediaItems.length === 0) return
    const n = allMediaItems.length
    const positions: MediaPos[] = allMediaItems.map((_, i) => {
      const zoneSize = 100 / n
      const zoneStart = i * zoneSize
      return {
        left: 5 + Math.random() * 45,
        top: zoneStart + Math.random() * zoneSize * 0.65,
        width: 38 + Math.random() * 20,
      }
    })
    setMediaPositions(positions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMediaItems.length])

  // Side nav items from blocks that have a title and are opted-in
  const navItems = useMemo(() => {
    return contentBlocks
      .filter((b) => b.showInSideNav !== false && b.title?.trim())
      .map((b) => ({
        id: `block-${b._key}`,
        title: b.title!,
        heading: b.title!,
        level: 'title' as const,
      }))
  }, [contentBlocks])

  return (
    <div style={{ overflowX: 'clip' }}>
      {/* ===== STICKY TITLE — real sticky section, in normal flow above cover image ===== */}
      <section
        ref={titleSectionRef}
        className="sticky z-20 px-5 pt-4 pb-2"
        style={{ top: '52px', backgroundColor: 'var(--tile-hover-bg, #ffffff)' }}
      >
        <h1
          style={{
            maxWidth: `${titleWidth}px`,
            fontSize: `${titleSize}px`,
            fontFamily: 'var(--font-sora)',
            fontWeight: 300,
            textTransform: 'uppercase',
            color: '#1e1e1e',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h1>
      </section>

      {/* ===== HERO SECTION: cover image centered below title ===== */}
      <section className="flex justify-center px-6 pb-6">
        <div className="flex flex-col gap-[14px]" style={{ width: '916px', maxWidth: '100%' }}>
          {/* Cover image / video — natural aspect ratio, scales to container width */}
          {project.coverVideo ? (
            <video
              src={project.coverVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
            />
          ) : project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto block"
            />
          ) : (
            <div className="w-full bg-[#f1f1f1]" style={{ aspectRatio: '16/9' }} />
          )}

          {/* Metadata rows — same text style as homepage experience bars */}
          {project.metadata && project.metadata.length > 0 && (
            <div className="flex flex-col">
              {project.metadata.map((row, i) => (
                <div key={i} className="flex items-center py-[6px]">
                  <span className="font-[family-name:var(--font-geist-mono)] font-normal text-[14px] tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap pr-2">
                    {row.label}
                  </span>
                  <DottedLine />
                  <span className="font-[family-name:var(--font-geist-mono)] font-normal text-[14px] tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap pl-2">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      {(contentBlocks.length > 0 || allMediaItems.length > 0) && (
        <section className="flex">
          {/* Sticky sidebar: width = (100vw - 980px) / 2 so text aligns with cover image left edge.
              top = nav (52px) + measured sticky title height, so items never hide behind the title. */}
          {navItems.length > 0 && (
            <div
              className="sticky self-start flex-shrink-0 pt-3"
              style={{
                top: `${52 + titleSectionH}px`,
                width: 'calc((100vw - 980px) / 2)',
                paddingLeft: '20px',
              }}
            >
              <SideNavigation items={navItems} showBackButton={false} scrollOffset={52 + titleSectionH + 12} />
            </div>
          )}

          {/* Vertical line at cover image left edge */}
          {navItems.length > 0 && (
            <div
              className="self-stretch flex-shrink-0"
              style={{ width: '1px', background: '#1e1e1e' }}
            />
          )}

          {/* Text content — starts at cover image left edge */}
          <div
            ref={leftColRef}
            style={{ width: '560px', flexShrink: 0 }}
            className="px-8 pt-3 pb-32 flex flex-col gap-24"
          >
            {contentBlocks.map((block, i) => (
              <React.Fragment key={block._key}>
                <div
                  id={`block-${block._key}`}
                  className="scroll-mt-24 flex flex-col gap-4"
                  style={{ minHeight: `calc(100vh - ${52 + titleSectionH + 12}px)` }}
                >
                  {block.title && (
                    <h3
                      style={{
                        fontSize: '28px',
                        fontFamily: 'var(--font-sora)',
                        fontWeight: 300,
                        textTransform: 'uppercase',
                        color: '#1e1e1e',
                        lineHeight: 1.2,
                      }}
                    >
                      {block.title}
                    </h3>
                  )}
                  {block.paragraph && (
                    <PortableText
                      value={block.paragraph}
                      components={paragraphComponents}
                    />
                  )}
                  <BlockButton
                    buttonLabel={block.buttonLabel}
                    buttonUrl={block.buttonUrl}
                  />
                </div>
                {i < contentBlocks.length - 1 && (
                  <div style={{
                    marginLeft: 'calc((980px - 100vw) / 2 - 13px)',
                    marginBottom: '-56px',
                    width: 'calc(100vw - 40px)',
                    height: '1px',
                    background: '#1e1e1e',
                    flexShrink: 0,
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Media collage — fills remaining width to the right */}
          {allMediaItems.length > 0 && (
            <div
              className="flex-1 relative"
              style={{ height: leftColHeight }}
            >
              {(mediaPositions ?? []).map((pos, i) => {
                const item = allMediaItems[i]
                if (!item) return null
                return <CollageMedia key={item._key} item={item} pos={pos} />
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
