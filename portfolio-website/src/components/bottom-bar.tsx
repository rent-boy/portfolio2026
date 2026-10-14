import { getSiteSettings } from "@/lib/sanity"
import { UpdatingNotice } from "@/components/updating-notice"

export async function BottomBar({ showNotice = false }: { showNotice?: boolean }) {
  const settings = await getSiteSettings()
  const text = settings?.bottomBarText || "Vibe coded with ❤ using Claude"

  return (
    <div className="px-[12px] py-2 md:px-5 md:py-[18px]">
      {showNotice && settings?.showUpdatingNotice !== false && (
        <UpdatingNotice updatedAt={settings?.contentUpdatedAt} className="mb-3 w-max min-w-[220px]" />
      )}
      <span className="font-[family-name:var(--font-geist-mono)] font-normal text-[10px] md:text-[14px] tracking-[0.8px] text-[#1e1e1e] whitespace-nowrap">
        {text}
      </span>
    </div>
  )
}
