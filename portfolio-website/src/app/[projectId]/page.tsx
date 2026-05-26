import { PageWrapper } from "@/components/page-wrapper"
import { getWorkProjectBySlug, getWorkProjects } from "@/lib/sanity"
import { notFound } from "next/navigation"
import { ProjectContent } from "@/components/project-content"
import { hexToRgba, isGreyOrBlack } from "@/lib/utils"

export async function generateStaticParams() {
  const projects = await getWorkProjects()
  return projects
    .filter((project: any) => project.isOpen !== false)
    .map((project: any) => ({ projectId: project.slug.current }))
}

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  const project = await getWorkProjectBySlug(projectId)

  if (!project || project.isOpen === false) {
    notFound()
  }

  const bgColor = project.hoverBgColor
    ?? (project.thumbnailLightColor && !isGreyOrBlack(project.thumbnailLightColor)
      ? hexToRgba(project.thumbnailLightColor, 0.30)
      : undefined)

  const accentHex = project.thumbnailColor
  const accentColor = accentHex && !isGreyOrBlack(accentHex) ? accentHex : undefined

  return (
    <PageWrapper bgColor={bgColor} accentColor={accentColor}>
      <ProjectContent project={project} />
    </PageWrapper>
  )
}
