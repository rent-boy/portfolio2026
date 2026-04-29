"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import React from "react"
import Link from "next/link"
import { PortableText } from '@portabletext/react'
import { SideNavigation } from './side-navigation'
import { FullscreenModal } from './fullscreen-modal'

// Custom components for PortableText rendering
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-lg font-light text-gray-500 leading-relaxed font-[family-name:var(--font-funnel-sans)] mb-4">
        {children}
      </p>
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
        <Link href={href} className="underline" style={{ color: '#FF00FF' }}>
          {children}
        </Link>
      ) : (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline"
          style={{ color: '#FF00FF' }}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 text-lg font-light text-gray-500 leading-relaxed font-[family-name:var(--font-funnel-sans)] mb-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 text-lg font-light text-gray-500 leading-relaxed font-[family-name:var(--font-funnel-sans)] mb-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
}

interface ContentBlock {
  _type: string
  _key: string
  // Image Block
  imageUrl?: string
  alt?: string
  caption?: string
  width?: string
  // Video Block
  videoUrl?: string
  autoplay?: boolean // Autoplay setting for video blocks and slideshows
  // Text Block
  title?: string
  titleEmail?: string
  subtitle?: string
  heading1?: string
  heading2?: string
  paragraph?: any // Portable Text array
  showInSidePanel?: boolean
  // Slideshow Block
  images?: string[]
  items?: any[] // Media items (images/videos)
  // Line Separator Block
  spacing?: string
  // Prototype Embed Block
  prototypeUrl?: string
  height?: number
  showOpenButton?: boolean
  // Button (available in all blocks)
  buttonLabel?: string
  buttonUrl?: string
  // Round Corners (available in image, video, slideshow blocks)
  roundCorners?: boolean
  // Show Border (available in image, video, slideshow, prototype blocks)
  showBorder?: boolean
}

interface ProjectContentProps {
  project: {
    title: string
    subtitle: string
    coverImage?: string
    coverVideo?: string
    contentBlocks?: ContentBlock[]
    projectLink?: string
    projectUrl?: string
    googleDriveVideoUrl?: string
  }
}

// Helper function to render button
function BlockButton({ buttonLabel, buttonUrl }: { buttonLabel?: string; buttonUrl?: string }) {
  if (!buttonLabel || !buttonUrl) return null

  const isExternal = buttonUrl.startsWith('http://') || buttonUrl.startsWith('https://')

  if (isExternal) {
    return (
      <a
        href={buttonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 px-6 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-200"
      >
        {buttonLabel}
      </a>
    )
  }

  return (
    <Link
      href={buttonUrl}
      className="inline-block mt-4 px-6 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors duration-200"
    >
      {buttonLabel}
    </Link>
  )
}

// Image Block Component with Fullscreen
function ImageBlock({ block, index, colSpanClass }: { block: ContentBlock; index: number; colSpanClass: string }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const roundedClass = block.roundCorners !== false ? 'rounded-lg' : ''
  const borderClass = block.showBorder ? 'border-2' : ''
  const borderStyle = block.showBorder ? { borderColor: '#DFDFDF' } : {}

        return (
    <>
          <motion.div
            key={block._key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={colSpanClass}
        ref={(el) => {
          if (el) {
            const height = el.offsetHeight
            document.documentElement.style.setProperty(
              `--block-height-${block._key}`,
              `${height}px`
            )
          }
        }}
      >
        <div className={`relative w-full bg-gray-200 flex items-center justify-center overflow-hidden ${roundedClass} ${borderClass} group`} style={borderStyle}>
              {block.imageUrl ? (
            <>
                <img 
                  src={block.imageUrl} 
                  alt={block.alt || 'Project image'}
                className="w-full h-auto object-contain"
              />
              {/* Fullscreen Button - Top Right */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                aria-label="Open fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </button>
            </>
              ) : (
                <div className="w-full aspect-square flex items-center justify-center text-gray-500">
              {/* Empty placeholder - grey square box */}
                </div>
              )}
            </div>
            {block.caption && (
              <p className="mt-2 text-sm text-gray-600 italic">
                {block.caption}
              </p>
            )}
        <BlockButton buttonLabel={block.buttonLabel} buttonUrl={block.buttonUrl} />
      </motion.div>

      {/* Fullscreen Modal */}
      {isFullscreen && block.imageUrl && (
        <FullscreenModal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} type="image">
          <img 
            src={block.imageUrl} 
            alt={block.alt || 'Project image'}
            className="max-w-full max-h-full object-contain"
          />
        </FullscreenModal>
      )}
    </>
  )
}

// Video Block Component with Play Button and Fullscreen
function VideoBlock({ block, index, colSpanClass }: { block: ContentBlock; index: number; colSpanClass: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const roundedClass = block.roundCorners !== false ? 'rounded-lg' : ''
  const borderClass = block.showBorder ? 'border-2' : ''
  const borderStyle = block.showBorder ? { borderColor: '#DFDFDF' } : {}

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <motion.div
        key={block._key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={colSpanClass}
        ref={(el) => {
          if (el) {
            const height = el.offsetHeight
            document.documentElement.style.setProperty(
              `--block-height-${block._key}`,
              `${height}px`
            )
          }
        }}
      >
        <div className={`relative w-full bg-gray-200 flex items-center justify-center overflow-hidden ${roundedClass} ${borderClass} group`} style={borderStyle}>
          {block.videoUrl ? (
            <>
              <video 
                ref={videoRef}
                src={block.videoUrl}
                autoPlay={block.autoplay}
                loop
                muted
                playsInline
                className="w-full h-auto object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              {/* Top Right Controls */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                {/* Play/Pause Button - only show if autoplay is disabled */}
                {!block.autoplay && (
                  <button
                    onClick={togglePlay}
                    className="bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                )}
                {/* Fullscreen Button */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  aria-label="Open fullscreen"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="w-full aspect-square flex items-center justify-center text-gray-500">
              {/* Empty placeholder - grey square box */}
            </div>
          )}
        </div>
        {block.caption && (
          <p className="mt-2 text-sm text-gray-600 italic">
            {block.caption}
          </p>
        )}
        <BlockButton buttonLabel={block.buttonLabel} buttonUrl={block.buttonUrl} />
      </motion.div>

      {/* Fullscreen Modal */}
      {isFullscreen && block.videoUrl && (
        <FullscreenModal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} type="video">
          <video 
            src={block.videoUrl}
            autoPlay
            loop
            controls
            playsInline
            className="max-w-full max-h-full object-contain"
          />
        </FullscreenModal>
      )}
    </>
  )
}

function SlideshowBlock({ block, index, colSpanClass }: { block: ContentBlock; index: number; colSpanClass: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const items = block.items || []
  const roundedClass = block.roundCorners !== false ? 'rounded-lg' : ''
  const borderClass = block.showBorder ? 'border-2' : ''
  const borderStyle = block.showBorder ? { borderColor: '#DFDFDF' } : {}

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoPlay = () => {
    setIsPlaying(true)
    setIsVideoPlaying(true)
  }

  const handleVideoPause = () => {
    setIsPlaying(false)
    setIsVideoPlaying(false)
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    setIsVideoPlaying(false)
  }

  if (items.length === 0) {
    return (
      <motion.div
        key={block._key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={colSpanClass}
      >
        <div className={`w-full aspect-square bg-gray-200 flex items-center justify-center ${roundedClass}`}>
          {/* Empty placeholder - grey square box */}
        </div>
        {block.caption && (
          <p className="mt-2 text-sm text-gray-600 italic">
            {block.caption}
          </p>
        )}
        <BlockButton buttonLabel={block.buttonLabel} buttonUrl={block.buttonUrl} />
          </motion.div>
        )
  }

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  // Auto-play: advance to next item every 3 seconds (if autoplay is enabled and video is not playing)
  React.useEffect(() => {
    // Default to true if autoplay is not explicitly set
    const shouldAutoplay = block.autoplay !== false
    
    // Pause autoplay if a video is currently playing
    if (items.length > 1 && shouldAutoplay && !isVideoPlaying) {
      const interval = setInterval(() => {
        nextItem()
      }, 3000) // Change slide every 3 seconds

      return () => clearInterval(interval) // Cleanup on unmount
    }
  }, [currentIndex, items.length, block.autoplay, isVideoPlaying]) // Re-run when currentIndex, autoplay, or isVideoPlaying changes

  const currentItem = items[currentIndex]

        return (
          <motion.div
            key={block._key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={colSpanClass}
          >
      <div className={`relative w-full aspect-square bg-gray-200 overflow-hidden ${roundedClass} ${borderClass} group`} style={borderStyle}>
        {/* Current Item - Image or Video */}
        {currentItem?.type === 'video' ? (
          <>
                <video 
              ref={videoRef}
              key={currentIndex} // Force remount on video change
              src={currentItem.url} 
                  loop
                  muted
                  playsInline
              className="w-full h-full object-cover"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
            />
            {/* Top Right Controls for Videos */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Open fullscreen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            <img 
              src={currentItem?.url} 
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Fullscreen Button for Images - Top Right */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 z-20"
              aria-label="Open fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </button>
          </>
        )}
        
        {/* Navigation Buttons - show on hover */}
        {items.length > 1 && (
          <>
            <button
              onClick={prevItem}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous item"
            >
              ←
            </button>
            <button
              onClick={nextItem}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next item"
            >
              →
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
                </div>
          </>
              )}
            </div>
            {block.caption && (
              <p className="mt-2 text-sm text-gray-600 italic">
                {block.caption}
              </p>
            )}
      <BlockButton buttonLabel={block.buttonLabel} buttonUrl={block.buttonUrl} />
      
      {/* Fullscreen Modal */}
      {isFullscreen && currentItem && (
        <FullscreenModal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)} type="slideshow">
          {currentItem.type === 'video' ? (
            <video 
              src={currentItem.url}
              autoPlay
              loop
              controls
              playsInline
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <img 
              src={currentItem.url} 
              alt={`Slide ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </FullscreenModal>
      )}
    </motion.div>
  )
}

export function ProjectContent({ project }: ProjectContentProps) {
  // Build navigation items from text blocks
  const navItems = useMemo(() => {
    if (!project.contentBlocks) return []
    
    return project.contentBlocks
      .filter(block => {
        // Only include text blocks that are enabled for side panel and have content
        if (block._type !== 'textBlock' || block.showInSidePanel === false) return false
        
        // Filter out blocks with no title, heading1, or heading2
        const hasContent = block.title || block.heading1 || block.heading2
        return hasContent
      })
      .map(block => {
        const level: 'title' | 'heading1' | 'heading2' = block.title ? 'title' : block.heading1 ? 'heading1' : 'heading2'
        const text = block.title || block.heading1 || block.heading2 || ''
        
        return {
          id: `block-${block._key}`,
          title: text,
          heading: text,
          level
        }
      })
      .filter(item => item.title.trim() !== '') // Remove items with empty or whitespace-only text
  }, [project.contentBlocks])

  const renderContentBlock = (block: ContentBlock, index: number) => {
    // Determine column span based on width
    const getColSpanClass = (width?: string) => {
      switch (width) {
        case 'quarter':
          return 'md:col-span-1'
        case 'half':
          return 'md:col-span-2'
        case 'three-quarter':
          return 'md:col-span-3'
        case 'full':
        default:
          return 'md:col-span-4'
      }
    }
    
    const colSpanClass = getColSpanClass(block.width)
    const colSpanValue = block.width === 'quarter' ? 1 : block.width === 'half' ? 2 : block.width === 'three-quarter' ? 3 : 4

    // For empty blocks, determine which adjacent block to match height with
    if (block._type === 'emptyBlock' && project.contentBlocks) {
      // Calculate grid position (0-based, counting only on desktop 4-column grid)
      let gridPosition = 0
      for (let i = 0; i < index; i++) {
        const prevBlock = project.contentBlocks[i]
        const prevWidth = prevBlock.width === 'quarter' ? 1 : prevBlock.width === 'half' ? 2 : prevBlock.width === 'three-quarter' ? 3 : 4
        gridPosition += prevWidth
      }
      
      // Check if we're on the left half (positions 0-1) or right half (positions 2-3)
      const positionInRow = gridPosition % 4
      const isOnLeftHalf = positionInRow === 0
      const isOnRightHalf = positionInRow === 2
      
      // Find the reference block to match height with
      let referenceBlockId = null
      
      if (isOnRightHalf && index > 0) {
        // On right half, match height of previous block
        referenceBlockId = project.contentBlocks[index - 1]._key
      } else if (isOnLeftHalf && index < project.contentBlocks.length - 1) {
        // On left half, match height of next block
        referenceBlockId = project.contentBlocks[index + 1]._key
      }
      
      return (
        <motion.div
          key={block._key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`${colSpanClass} hidden md:block`}
        >
          <div 
            className="w-full bg-transparent"
            style={{
              height: referenceBlockId 
                ? `var(--block-height-${referenceBlockId}, auto)` 
                : 'auto',
              minHeight: referenceBlockId ? 'auto' : '300px'
            }}
          />
          </motion.div>
      )
    }

    switch (block._type) {
      case 'imageBlock':
        return <ImageBlock block={block} index={index} colSpanClass={colSpanClass} />

      case 'videoBlock':
        return (
          <VideoBlock key={block._key} block={block} index={index} colSpanClass={colSpanClass} />
        )

      case 'textBlock':
        return (
          <motion.div
            key={block._key}
            id={`block-${block._key}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`space-y-4 ${colSpanClass} scroll-mt-24`}
            ref={(el) => {
              if (el) {
                const height = el.offsetHeight
                document.documentElement.style.setProperty(
                  `--block-height-${block._key}`,
                  `${height}px`
                )
              }
            }}
          >
            {block.title && (
              block.titleEmail ? (
                <a 
                  href={`mailto:${block.titleEmail}`}
                  className="text-[1.875rem] font-medium text-gray-900 hover:text-gray-600 transition-colors font-[family-name:var(--font-funnel-display)] block"
                >
                  {block.title}
                </a>
              ) : (
                <h2 className="text-[1.875rem] font-medium text-gray-900 font-[family-name:var(--font-funnel-display)]">
                  {block.title}
                </h2>
              )
            )}
            {block.subtitle && (
              <h3 className="text-2xl font-semibold text-gray-700 font-[family-name:var(--font-space-mono)]">
                {block.subtitle}
              </h3>
            )}
            {block.heading1 && (
              <h4 className="text-[1.368rem] font-medium text-gray-800 font-[family-name:var(--font-bitter)]">
                {block.heading1}
              </h4>
            )}
            {block.heading2 && (
              <h5 className="text-2xl font-normal text-gray-700 font-[family-name:var(--font-instrument-serif)]">
                {block.heading2}
              </h5>
            )}
            {block.paragraph && (
              <div className="prose max-w-none">
                <PortableText value={block.paragraph} components={portableTextComponents} />
              </div>
            )}
            <BlockButton buttonLabel={block.buttonLabel} buttonUrl={block.buttonUrl} />
          </motion.div>
        )

      case 'emptyBlock':
        // This case is now handled at the top of the function
        return null

      case 'slideshowBlock':
        return <SlideshowBlock key={block._key} block={block} index={index} colSpanClass={colSpanClass} />

      case 'lineSeparatorBlock':
        const spacingClasses = {
          small: 'my-4',
          medium: 'my-8',
          large: 'my-12',
        }
        const spacing = spacingClasses[block.spacing as keyof typeof spacingClasses] || spacingClasses.medium
        
        return (
          <motion.div
            key={block._key}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`md:col-span-4 ${spacing}`}
          >
            <hr 
              style={{
                border: 'none',
                height: '2px',
                backgroundColor: '#9ca3af',
                margin: 0,
              }}
            />
          </motion.div>
        )

      case 'prototypeEmbedBlock':
        const prototypeRoundedClass = block.roundCorners !== false ? 'rounded-lg' : ''
        const prototypeBorderClass = block.showBorder ? 'border-2' : ''
        const prototypeBorderStyle = block.showBorder ? { borderColor: '#DFDFDF' } : {}
        const prototypeHeight = block.height || 800
        
        return (
          <motion.div
            key={block._key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={colSpanClass}
          >
            <div className={`relative w-full bg-gray-100 overflow-hidden ${prototypeRoundedClass} ${prototypeBorderClass}`} style={prototypeBorderStyle}>
              {block.prototypeUrl ? (
                <iframe
                  src={block.prototypeUrl}
                  style={{ 
                    width: '100%', 
                    height: `${prototypeHeight}px`,
                    border: 'none'
                  }}
                  allowFullScreen
                  title="Interactive Prototype"
                />
              ) : (
                <div 
                  className="w-full flex items-center justify-center text-gray-400"
                  style={{ height: `${prototypeHeight}px` }}
                >
                  No Prototype URL provided
                </div>
              )}
            </div>
            {block.showOpenButton !== false && block.prototypeUrl && (
              <div className="mt-4">
                <a
                  href={block.prototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Open in New Tab
                </a>
              </div>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="px-6 md:px-40 lg:px-64 xl:px-80 2xl:px-96 py-12">
      {/* Side Navigation - Positioned in margin with sticky behavior */}
      {navItems.length > 0 && (
        <div className="hidden lg:block float-left -ml-[240px] w-[200px] sticky top-6">
          <SideNavigation items={navItems} showBackButton={true} backUrl="/" />
        </div>
      )}
      
      {/* Cover Image/Video - Full Width across 4 columns */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="w-full bg-gray-200 flex items-center justify-center overflow-hidden rounded-lg">
          {project.coverVideo ? (
            <video 
              src={project.coverVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain"
            />
          ) : project.coverImage ? (
            <img 
              src={project.coverImage} 
              alt={project.title}
              className="w-full h-auto object-contain"
            />
          ) : (
            <div className="w-full aspect-[2.5/1] flex items-center justify-center text-gray-500">
              Cover Image/Video
            </div>
          )}
        </div>
      </motion.div>

      {/* Content Grid - 4 columns (includes title and all content blocks) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-8"
      >
        {/* Title - Full Width 4 Columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 md:col-span-4"
        >
          <h1 className="text-4xl font-semibold text-gray-900 font-[family-name:var(--font-funnel-display)]">
            {project.title}
          </h1>
        </motion.div>

        {/* Flexible Content Blocks - flow left to right, top to bottom */}
        {project.contentBlocks && project.contentBlocks.length > 0 && 
          project.contentBlocks.map((block, index) => (
            <React.Fragment key={block._key}>
              {renderContentBlock(block, index + 1)}
            </React.Fragment>
          ))
        }
      </motion.div>

      {/* Project Link */}
      {(project.projectLink || project.projectUrl) && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <a 
            href={project.projectLink || project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Live Project →
          </a>
        </motion.div>
      )}

      {/* Google Drive Video Embed */}
      {project.googleDriveVideoUrl && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src={project.googleDriveVideoUrl.replace('/view', '/preview')}
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
      </div>
    </div>
  )
}

