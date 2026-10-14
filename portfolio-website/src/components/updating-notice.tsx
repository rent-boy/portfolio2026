const MONO_SMALL =
  'font-[family-name:var(--font-geist-mono)] font-normal text-[11px] md:text-[12px] uppercase tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap'
// Side menu column is narrow (~190px at 1440 wide), so the notice there uses a tighter size
const MONO_NOTICE =
  'font-[family-name:var(--font-geist-mono)] font-normal text-[10px] uppercase tracking-[0.5px] text-[#1e1e1e]'

// "Content being updated" notice with the date the content was last edited in the CMS.
// Used on project pages (bottom of the side menu) and on the homepage (above the bottom bar).
// Two lines inside a marching-ants dotted border (see .marching-ants in globals.css).
// `compact` is a single-line version for phones.
export function UpdatingNotice({
  updatedAt,
  compact = false,
  className = '',
}: {
  updatedAt?: string
  compact?: boolean
  className?: string
}) {
  const date = updatedAt
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Oslo' })
        .format(new Date(updatedAt))
    : null
  if (compact) {
    return (
      <div
        role="status"
        className={`marching-ants ${MONO_SMALL} flex items-center gap-2 px-3 py-[6px] ${className}`}
        style={{ backgroundColor: 'var(--tile-hover-bg, #ffffff)' }}
      >
        <span>Updating</span>
        {date && <time dateTime={updatedAt} className="opacity-70">· {date}</time>}
      </div>
    )
  }

  return (
    <div
      role="status"
      className={`marching-ants flex flex-col gap-1 px-2 py-[6px] ${className}`}
      style={{ backgroundColor: 'var(--tile-hover-bg, #ffffff)' }}
    >
      <span className={MONO_NOTICE}>Content being updated</span>
      {date && (
        <span className={`${MONO_NOTICE} flex flex-wrap items-center gap-x-[6px] opacity-70`}>
          <span className="whitespace-nowrap">Last updated</span>
          <span aria-hidden className="marching-line flex-1 min-w-3" />
          <time dateTime={updatedAt} className="whitespace-nowrap">{date}</time>
        </span>
      )}
    </div>
  )
}
