import { redirect } from "next/navigation"

export default async function OldProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params
  redirect(`/${projectId}`)
}
