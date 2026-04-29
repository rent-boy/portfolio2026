import { PageWrapper } from "@/components/page-wrapper"
import { getWorkProjects } from "@/lib/sanity"
import { WorkGrid } from "@/components/work-grid"

export default async function WorkPage() {
  // Fetch projects from Sanity CMS
  const projects = await getWorkProjects()

  return (
    <PageWrapper>
      <div className="px-6 py-12">
        <WorkGrid projects={projects} />
      </div>
    </PageWrapper>
  )
}
