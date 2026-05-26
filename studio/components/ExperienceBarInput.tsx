import { useEffect, useState } from 'react'
import { set, unset, useClient } from 'sanity'
import type { StringInputProps } from 'sanity'

interface ExperienceEntry {
  company: string
  year: string
  role: string
}

export function ExperienceBarInput(props: StringInputProps) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [options, setOptions] = useState<ExperienceEntry[]>([])

  useEffect(() => {
    client
      .fetch<ExperienceEntry[]>(
        `*[_type == "homePage" && !(_id in path("drafts.**"))][0].experienceEntries[]{ company, year, role }`
      )
      .then((entries) => {
        if (entries) setOptions(entries)
      })
  }, [client])

  return (
    <select
      value={props.value ?? ''}
      onChange={(e) => {
        const val = e.target.value
        props.onChange(val ? set(val) : unset())
      }}
      style={{
        width: '100%',
        padding: '8px 12px',
        borderRadius: '3px',
        border: '1px solid var(--card-border-color, #e5e7eb)',
        fontSize: '13px',
        backgroundColor: 'var(--card-bg-color, #fff)',
        color: 'var(--card-fg-color, #1a1a1a)',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <option value="">— No bar assigned —</option>
      {options.map((opt) => (
        <option key={opt.company} value={opt.company}>
          {opt.company} · {opt.year} · {opt.role}
        </option>
      ))}
    </select>
  )
}
