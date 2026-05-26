"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface NavItem {
  id: string
  title: string
  heading: string
  level: 'title' | 'heading' | 'subheading'
}

interface SideNavigationProps {
  items: NavItem[]
  showBackButton?: boolean
  backUrl?: string
  scrollOffset?: number
}

export function SideNavigation({ items, showBackButton = true, backUrl = "/work", scrollOffset = 80 }: SideNavigationProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isScrolling, setIsScrolling] = useState(false)
  const router = useRouter()
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Debounce scroll detection
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = window.scrollY + scrollOffset

        for (let i = items.length - 1; i >= 0; i--) {
          const element = document.getElementById(items[i].id)
          if (element) {
            const absoluteTop = element.getBoundingClientRect().top + window.scrollY
            if (scrollPosition >= absoluteTop) {
              setActiveId(items[i].id)
              break
            }
          }
        }
      }, 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [items, isScrolling, scrollOffset])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      setIsScrolling(true)
      setActiveId(id)

      const y = element.getBoundingClientRect().top + window.scrollY - scrollOffset

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })

      // Reset scrolling flag after animation
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }

  const handleBackClick = () => {
    router.push(backUrl)
  }

  return (
    <aside>
      <nav className="flex flex-col space-y-6">
        {/* Back Button */}
        {showBackButton && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-900 transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-[16px] font-normal tracking-wide font-[family-name:var(--font-funnel-sans)] uppercase">Back</span>
          </motion.button>
        )}

        {/* Navigation Items */}
        <div className="flex flex-col space-y-[9.6px]">
          {items.map((item) => {
            const isActive = activeId === item.id

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '14px',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: isActive ? 'var(--project-accent, #1e1e1e)' : 'rgba(30,30,30,0.4)',
                }}
              >
                {item.title || item.heading}
              </button>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

