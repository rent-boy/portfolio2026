"use client"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto">
      <div className="max-w-full mx-auto px-6 py-4">
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-1 text-sm md:hidden font-medium text-gray-600 font-[family-name:var(--font-funnel-sans)]">
          <div>Copyright © {currentYear} Siddharth Kothiyal</div>
          <div className="flex items-center space-x-1">
            Vibe coded with <span className="mx-1 text-red-500">🩷</span> on Cursor
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center text-sm font-medium text-gray-600 font-[family-name:var(--font-funnel-sans)]">
          <div>Copyright © {currentYear} Siddharth Kothiyal</div>
          <div className="flex items-center space-x-1">
            Vibe coded with <span className="mx-1 text-red-500">🩷</span> on Cursor
          </div>
        </div>
      </div>
    </footer>
  )
}
