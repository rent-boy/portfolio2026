import { Navigation } from "@/components/navigation"
import { BottomBar } from "@/components/bottom-bar"
import { getHomePage, getSiteSettings, getWorkProjects } from "@/lib/sanity"
import { WorkFilterSection } from "@/components/work-filter-section"

export default async function Home() {
  const [homePage, projects, settings] = await Promise.all([
    getHomePage().catch(() => null),
    getWorkProjects().catch(() => []),
    getSiteSettings().catch(() => null),
  ])
  const updatingNoticeShown = settings?.showUpdatingNotice !== false

  const heroText: string = homePage?.heroText || ""
  const profileImageUrl: string = homePage?.profileImageUrl || ""
  const experienceEntries = homePage?.experienceEntries ?? []

  return (
    <div style={{ backgroundColor: 'var(--tile-hover-bg, #ffffff)', transition: 'background-color 0.4s ease' }}>
      <Navigation />
      <WorkFilterSection projects={projects} profileImageUrl={profileImageUrl} heroText={heroText} experienceEntries={experienceEntries} updatingNoticeShown={updatingNoticeShown}>
        <BottomBar showNotice={updatingNoticeShown} />
      </WorkFilterSection>
    </div>
  )
}