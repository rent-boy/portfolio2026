import { Navigation } from "@/components/navigation"
import { BottomBar } from "@/components/bottom-bar"
import { hexToRgba } from "@/lib/utils"

export function PageWrapper({ children, bgColor, accentColor }: { children: React.ReactNode; bgColor?: string; accentColor?: string }) {
  return (
    <div style={{ backgroundColor: bgColor ?? '#ffffff', '--project-accent': accentColor } as React.CSSProperties}>
      {accentColor && (
        <style>{`::selection { background-color: ${hexToRgba(accentColor, 0.25)}; }`}</style>
      )}
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <BottomBar />
    </div>
  )
}

