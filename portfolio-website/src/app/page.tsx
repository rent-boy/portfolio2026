import { Navigation } from "@/components/navigation"
import { BottomBar } from "@/components/bottom-bar"
import { getHomePage, getWorkProjects, getCursorMedia } from "@/lib/sanity"
import { DitherBackground } from "@/components/dither-background"
import { WorkFilterSection } from "@/components/work-filter-section"
import { HeroCursorMedia } from "@/components/hero-cursor-media"

export default async function Home() {
  const [homePage, projects, cursorMedia] = await Promise.all([
    getHomePage().catch(() => null),
    getWorkProjects().catch(() => []),
    getCursorMedia().catch(() => []),
  ])

  const heroText: string = homePage?.heroText || ""
  const profileImageUrl: string = homePage?.profileImageUrl || ""
  const experienceEntries = homePage?.experienceEntries ?? []

  return (
    <div className="bg-white">
      {/* Hero section — full viewport with dither animation */}
      <div id="hero-section" className="relative h-screen flex flex-col overflow-hidden">
        <DitherBackground />

        <div className="relative z-10">
          <div data-no-cursor-media><Navigation /></div>
        </div>

        {/* Cursor-following media */}
        <HeroCursorMedia media={cursorMedia} />
      </div>

      {/* Work section — scrolls in below the hero, BottomBar passed as child so it shares the hover color */}
      <WorkFilterSection projects={projects} profileImageUrl={profileImageUrl} heroText={heroText} experienceEntries={experienceEntries}>
        <BottomBar />
      </WorkFilterSection>
    </div>
  )
}