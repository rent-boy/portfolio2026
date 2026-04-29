import { getSiteSettings } from "@/lib/sanity"

const btnCls =
  "text-[22px] font-medium font-[family-name:var(--font-funnel-display)] underline underline-offset-4 decoration-1 hover:opacity-50 transition-opacity duration-200"

export async function BottomBar() {
  const settings = await getSiteSettings().catch(() => null)

  const cvButtonText = settings?.cvButtonText ?? "View my CV"
  const cvButtonUrl = settings?.cvButtonUrl ?? null
  const linkedInUrl = settings?.linkedInUrl ?? null
  const linkedInButtonText = settings?.linkedInButtonText ?? "LinkedIn"
  const bottomBarText = settings?.bottomBarText ?? null

  return (
    <footer
      className="border-t border-current/10 mt-auto"
      style={{ color: 'var(--project-accent, #111827)' }}
    >
      <div className="px-6 pt-6 pb-12 flex flex-col gap-3">
        {/* Buttons row */}
        <div className="flex items-baseline gap-6">
          {cvButtonUrl ? (
            <a href={cvButtonUrl} target="_blank" rel="noopener noreferrer" className={btnCls}>
              {cvButtonText}
            </a>
          ) : (
            <span className="text-[22px] font-medium font-[family-name:var(--font-funnel-display)] opacity-30">
              {cvButtonText}
            </span>
          )}

          {linkedInUrl ? (
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={btnCls}>
              {linkedInButtonText}
            </a>
          ) : (
            <span className="text-[22px] font-medium font-[family-name:var(--font-funnel-display)] opacity-30">
              {linkedInButtonText}
            </span>
          )}
        </div>

        {/* Body text */}
        {bottomBarText && (
          <p className="text-sm font-[family-name:var(--font-funnel-sans)] opacity-50 whitespace-pre-line leading-relaxed max-w-2xl">
            {bottomBarText}
          </p>
        )}
      </div>
    </footer>
  )
}
