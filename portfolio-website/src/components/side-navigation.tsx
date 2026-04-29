"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface NavItem {
  id: string
  title: string
  heading: string
  level: 'title' | 'heading1' | 'heading2'
}

interface SideNavigationProps {
  items: NavItem[]
  showBackButton?: boolean
  backUrl?: string
}

export function SideNavigation({ items, showBackButton = true, backUrl = "/work" }: SideNavigationProps) {
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
        const scrollPosition = window.scrollY + 100 // Offset for better UX

        // Find the active section
        for (let i = items.length - 1; i >= 0; i--) {
          const element = document.getElementById(items[i].id)
          if (element) {
            const { top } = element.getBoundingClientRect()
            const absoluteTop = top + window.scrollY
            
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
  }, [items, isScrolling])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      setIsScrolling(true)
      setActiveId(id)

      const yOffset = -80 // Offset for better positioning
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset

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
      <nav className="flex flex-col space-y-6 max-w-[200px]">
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
            <span className="text-xs font-normal tracking-wide font-[family-name:var(--font-funnel-sans)] uppercase">Back</span>
          </motion.button>
        )}

        {/* Navigation Items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col space-y-3"
        >
          {items.map((item, index) => {
            const isActive = activeId === item.id
            const indent = item.level === 'heading1' ? 'pl-3' : item.level === 'heading2' ? 'pl-6' : ''

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * (index + 2) }}
                onClick={() => scrollToSection(item.id)}
                className={`
                  text-left transition-all duration-200 hover:text-gray-900 
                  ${indent} text-sm ${isActive ? 'font-normal' : 'font-light'}
                  font-[family-name:var(--font-funnel-sans)]
                  relative leading-relaxed
                `}
                style={{ color: isActive ? 'var(--project-accent, #111827)' : '#9ca3af' }}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--project-accent, #111827)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span className="line-clamp-2">{item.title || item.heading}</span>
              </motion.button>
            )
          })}
        </motion.div>
      </nav>
    </aside>
  )
}

