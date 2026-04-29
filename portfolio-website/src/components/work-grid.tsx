"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { isGreyOrBlack } from "@/lib/utils"

function ViewChip({ x, y }: { x: number; y: number }) {
  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: x + 16, top: y - 12, transform: "translateY(-50%)" }}
    >
      <span className="bg-white text-gray-900 text-xs font-normal px-3 py-1.5 rounded-full border border-gray-200 shadow-sm whitespace-nowrap font-[family-name:var(--font-funnel-sans)]">
        👁️ View project
      </span>
    </div>
  )
}

interface Project {
  _id: string
  title: string
  subtitle: string
  category: string
  client: string
  year: string
  period?: string
  thumbnailImage?: string
  thumbnailColor?: string
  thumbnailLightColor?: string
  thumbnailVideo?: string
  coverImage?: string
  slug: {
    current: string
  }
}

export function WorkGrid({
  projects,
  onHoverColor,
}: {
  projects: Project[]
  onHoverColor?: (color: string | null) => void
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  return (
    <div onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}>
      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <Link
              href={`/${project.slug.current}`}
              className="group block cursor-none"
              onMouseEnter={() => {
                setHoveredId(project._id)
                onHoverColor?.(project.thumbnailLightColor ?? null)
              }}
              onMouseLeave={() => {
                setHoveredId(null)
                onHoverColor?.(null)
              }}
            >
              {/* Project Image/Video - 16:9 aspect ratio */}
              <div className="aspect-video bg-gray-200 mb-4 overflow-hidden rounded-lg">
                {project.thumbnailVideo ? (
                  <video
                    src={project.thumbnailVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                  />
                ) : project.thumbnailImage ? (
                  <img
                    src={project.thumbnailImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors">
                    Project Image
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              <div className="space-y-1">
                <h3
                  className="text-2xl font-normal transition-colors font-[family-name:var(--font-funnel-display)]"
                  style={{
                    color: hoveredId === project._id && project.thumbnailColor && !isGreyOrBlack(project.thumbnailColor)
                      ? project.thumbnailColor
                      : 'rgba(0, 0, 0, 0.7)'
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-base text-gray-500 font-normal font-[family-name:var(--font-bitter)]">
                  {project.subtitle}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state if no projects */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found. Add projects in your Sanity CMS.</p>
        </div>
      )}

      {hoveredId && <ViewChip x={mousePos.x} y={mousePos.y} />}
    </div>
  )
}

