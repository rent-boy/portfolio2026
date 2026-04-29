"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface SlideshowImage {
  imageUrl: string
  alt?: string
  linkedProjectSlug?: string
  linkedProjectTitle?: string
}

interface ImageSlideshowProps {
  images: SlideshowImage[]
  interval?: number
}

export function ImageSlideshow({ images, interval = 3000 }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square flex items-center justify-center">
        <p className="text-gray-500">No slideshow images</p>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  const ImageContent = () => (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      <img
        src={currentImage.imageUrl}
        alt={currentImage.alt || `Slide ${currentIndex + 1}`}
        className="w-full h-full object-contain"
      />
    </motion.div>
  )

  return (
    <div className="w-full max-w-xs">
      <div className="relative w-full aspect-square overflow-hidden">
        <AnimatePresence mode="wait">
          {currentImage.linkedProjectSlug ? (
            <Link
              href={`/${currentImage.linkedProjectSlug}`}
              className="block w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
              title={currentImage.linkedProjectTitle || 'View project'}
            >
              <ImageContent />
            </Link>
          ) : (
            <ImageContent />
          )}
        </AnimatePresence>
      </div>

      {/* Slideshow indicators */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gray-900 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

