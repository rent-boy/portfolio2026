"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FullscreenModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  type: 'image' | 'video' | 'slideshow'
}

export function FullscreenModal({ isOpen, onClose, children, type }: FullscreenModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      // Try to enter fullscreen mode on mobile
      if (modalRef.current && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        try {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          }
        } catch (error) {
          console.log('Fullscreen not supported')
        }
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset'
      
      // Exit fullscreen if active
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          onClick={onClose}
          style={{
            // Force landscape orientation on mobile for wider content
            touchAction: 'none',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[10000] w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close fullscreen"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
            style={{
              // Suggest landscape orientation for mobile
              maxWidth: '100vw',
              maxHeight: '100vh',
            }}
          >
            <style jsx global>{`
              @media (max-width: 768px) and (orientation: portrait) {
                @supports (orientation: landscape) {
                  html {
                    transform: rotate(90deg);
                    transform-origin: center center;
                    width: 100vh;
                    height: 100vw;
                    overflow-x: hidden;
                    position: fixed;
                  }
                }
              }
            `}</style>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



