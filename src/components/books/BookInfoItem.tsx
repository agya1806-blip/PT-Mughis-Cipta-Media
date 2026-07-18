"use client"

import type { ReactNode } from "react"

interface Props {
  label: string
  children: ReactNode
}

export default function BookInfoItem({ label, children }: Props) {
  return (
    <div className="space-y-1">
      <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        {label}
      </span>
      <div className="text-sm font-medium text-zinc-900 dark:text-white">{children}</div>
    </div>
  )
}
