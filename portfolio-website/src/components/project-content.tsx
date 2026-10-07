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

const MONO_SMALL =
  'font-[family-name:var(--font-geist-mono)] font-normal text-[11px] md:text-[12px] uppercase tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap'
// Side menu column is narrow (~190px at 1440 wide), so the notice there uses a tighter size
const MONO_NOTICE =
  'font-[family-name:var(--font-geist-mono)] font-normal text-[10px] uppercase tracking-[0.5px] text-[#1e1e1e]'

// "Content being updated" notice with the date the project was last edited in the CMS.
// Two lines inside a marching-ants dotted border (see .marching-ants in globals.css).
// `compact` is a single-line version for phones.
function UpdatingNotice({
  updatedAt,
  compact = false,
  className = '',
}: {
  updatedAt?: string
  compact?: boolean
  className?: string
}) {
  const date = updatedAt
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Oslo' })
        .format(new Date(updatedAt))
    : null
  if (compact) {
    return (
      <div
        role="status"
        className={`marching-ants ${MONO_SMALL} flex items-center gap-2 px-3 py-[6px] ${className}`}
        style={{ backgroundColor: 'var(--tile-hover-bg, #ffffff)' }}
      >
        <span>Updating</span>
        {date && <time dateTime={updatedAt} className="opacity-70">· {date}</time>}
      </div>
    )
  }

  return (
    <div
      role="status"
      className={`marching-ants flex flex-col gap-1 px-2 py-[6px] ${className}`}
      style={{ backgroundColor: 'var(--tile-hover-bg, #ffffff)' }}
    >
      <span className={MONO_NOTICE}>Content being updated</span>
      {date && (
        <span className={`${MONO_NOTICE} flex flex-wrap items-center gap-x-[6px] opacity-70`}>
          <span className="whitespace-nowrap">Last updated</span>
          <span aria-hidden className="marching-line flex-1 min-w-3" />
          <time dateTime={updatedAt} className="whitespace-nowrap">{date}</time>
        </span>
      )}
    </div>
  )
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
    _updatedAt?: string
    showUpdatingNotice?: boolean
  }
}

const captionStyle: React.CSSProperties = {
  fontFamily: 'var(--font-geist-mono)',
  fontSize: '12px',
  color: '#1e1e1e',
  opacity: 0.6,
  marginTop: 6,
  letterSpacing: '0.6px',
}

function BlockMedia({ item, onOpen }: { item: MediaItem; onOpen: (key: string) => void }) {
  if (item.mediaType === 'image' && item.url) {
    return (
      <figure>
        <img
          src={item.url}
          alt={item.alt || ''}
          className="w-full h-auto block cursor-pointer"
          onClick={() => onOpen(item._key)}
        />
        {item.caption && <figcaption style={captionStyle}>{item.caption}</figcaption>}
      </figure>
    )
  }

  if (item.mediaType === 'video' && item.url) {
    return (
      <figure>
        <video
          src={item.url}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto block cursor-pointer"
          onClick={() => onOpen(item._key)}
        />
        {item.caption && <figcaption style={captionStyle}>{item.caption}</figcaption>}
      </figure>
    )
  }

  if (item.mediaType === 'prototype' && item.prototypeUrl) {
    return (
      <figure>
        <iframe
          src={item.prototypeUrl}
          style={{ width: '100%', height: `${item.prototypeHeight || 600}px`, border: 'none' }}
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
      </figure>
    )
  }

  return null
}

const arrowButtonClass =
  'absolute top-1/2 -translate-y-1/2 z-[10000] w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/30 rounded-full transition-colors disabled:opacity-0 disabled:pointer-events-none'

// Fullscreen viewer for every image/video on the page, in page order, with previous/next.
function MediaViewer({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: MediaItem[]
  index: number | null
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const item = index === null ? null : items[index]
  const hasPrev = index !== null && index > 0
  const hasNext = index !== null && index < items.length - 1

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && index > 0) onIndex(index - 1)
      if (e.key === 'ArrowRight' && index < items.length - 1) onIndex(index + 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, items.length, onIndex])

  if (!item) return null

  return (
    <FullscreenModal isOpen onClose={onClose} type={item.mediaType === 'video' ? 'video' : 'image'}>
      <figure className="flex flex-col items-center justify-center w-full h-full gap-3 px-14 md:px-20">
        {item.mediaType === 'video' ? (
          <video
            key={item._key}
            src={item.url}
            autoPlay
            loop
            playsInline
            controls
            className="max-w-full min-h-0 flex-1 object-contain"
          />
        ) : (
          <img key={item._key} src={item.url} alt={item.alt || ''} className="max-w-full min-h-0 flex-1 object-contain" />
        )}
        <figcaption style={{ ...captionStyle, color: '#ffffff', opacity: 0.7, marginTop: 0 }}>
          {index! + 1} / {items.length}
          {item.caption ? ` — ${item.caption}` : ''}
        </figcaption>
      </figure>
      <button
        type="button"
        aria-label="Previous"
        className={`${arrowButtonClass} left-2 md:left-4`}
        disabled={!hasPrev}
        onClick={() => hasPrev && onIndex(index! - 1)}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next"
        className={`${arrowButtonClass} right-2 md:right-4`}
        disabled={!hasNext}
        onClick={() => hasNext && onIndex(index! + 1)}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </FullscreenModal>
  )
}

// One section: text on the left, its media stacked on the right.
// Each column is at most one viewport tall and scrolls on its own; once a column
// reaches its end, scrolling carries on to the page (and the next section).
const columnStyle: React.CSSProperties = {
  maxHeight: 'calc(100vh - var(--project-sticky-top, 120px))',
  overflowY: 'auto',
  scrollbarWidth: 'none', // Firefox; WebKit is hidden via .no-scrollbar
}

function BlockGrid({ block, onOpen }: { block: ContentBlock; onOpen: (key: string) => void }) {
  const media = block.media ?? []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 items-start">
      <div className="no-scrollbar flex flex-col gap-4 md:pr-2" style={columnStyle}>
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
        {block.paragraph && <PortableText value={block.paragraph} components={paragraphComponents} />}
        <BlockButton buttonLabel={block.buttonLabel} buttonUrl={block.buttonUrl} />
      </div>
      {media.length > 0 && (
        <div className="no-scrollbar flex flex-col gap-8 md:pr-2" style={columnStyle}>
          {media.map((m) => <BlockMedia key={m._key} item={m} onOpen={onOpen} />)}
        </div>
      )}
    </div>
  )
}

export function ProjectContent({ project }: ProjectContentProps) {
  const contentBlocks = project.contentBlocks ?? []
  const hasMedia = contentBlocks.some((b) => (b.media ?? []).length > 0)

  // Every image/video on the page, in page order, for the fullscreen viewer
  const viewerItems = contentBlocks
    .flatMap((b) => b.media ?? [])
    .filter((m) => (m.mediaType === 'image' || m.mediaType === 'video') && m.url)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const openViewer = (key: string) => {
    const i = viewerItems.findIndex((m) => m._key === key)
    if (i >= 0) setViewerIndex(i)
  }

  // Scroll tracking for title scale — same mechanic as landing page hero text
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Title scales 48→24px over first 200px of scroll, same mechanic as the landing page hero.
  // It stays on one line: long titles shrink further to fit the viewport width.
  const scrollProgress = Math.min(scrollY / 200, 1)
  const titleSize = 48 - scrollProgress * 24          // 48 → 24
  const titleFit = `calc((100vw - 40px) / ${Math.max(project.title.length, 1) * 0.68})`

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
            fontSize: `min(${titleSize}px, ${titleFit})`,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
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
      <section className="relative flex justify-center px-6 pb-6">
        {/* Desktop fallback when the page has no side menu: float in the open space under the title */}
        {project.showUpdatingNotice !== false && navItems.length === 0 && (
          <UpdatingNotice updatedAt={project._updatedAt} className="hidden md:flex absolute left-5 top-3 z-10" />
        )}
        <div className="flex flex-col gap-[14px]" style={{ width: '916px', maxWidth: '100%' }}>
          {/* Cover image / video — natural aspect ratio. On desktop it sits at the bottom of a
              block that is one viewport tall (minus nav + title) plus a small bleed, so it always
              runs slightly past the bottom edge with open space above it. Title section ≈ 82px. */}
          <div className="relative flex flex-col justify-end md:min-h-[calc(100vh_-_134px_+_6vh)]">
            {/* Phones: no room beside the title, so a compact notice sits on the cover's top-left corner */}
            {project.showUpdatingNotice !== false && (
              <UpdatingNotice updatedAt={project._updatedAt} compact className="md:hidden absolute left-2 top-2 z-10" />
            )}
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
          </div>

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
      {(contentBlocks.length > 0 || hasMedia) && (
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
              {project.showUpdatingNotice !== false && (
                <UpdatingNotice updatedAt={project._updatedAt} className="hidden md:flex mt-6 mr-3" />
              )}
            </div>
          )}

          {/* Vertical line at cover image left edge */}
          {navItems.length > 0 && (
            <div
              className="self-stretch flex-shrink-0"
              style={{ width: '1px', background: '#1e1e1e' }}
            />
          )}

          {/* Sections — two-column grid starting at the cover image left edge */}
          <div
            className="flex-1 min-w-0 px-8 pt-3 pb-32 flex flex-col gap-16"
            style={{ ['--project-sticky-top' as string]: `${52 + titleSectionH + 12}px` }}
          >
            {contentBlocks.map((block, i) => (
              <React.Fragment key={block._key}>
                <div id={`block-${block._key}`} className="scroll-mt-24">
                  <BlockGrid block={block} onOpen={openViewer} />
                </div>
                {i < contentBlocks.length - 1 && (
                  <div style={{ marginLeft: '-32px', marginRight: '-20px', height: '1px', background: '#1e1e1e' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      <MediaViewer
        items={viewerItems}
        index={viewerIndex}
        onIndex={setViewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </div>
  )
}
