import type { ReactNode } from "react"

interface Props {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      {icon && <div className="text-zinc-300 dark:text-zinc-600 mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">{title}</h3>
      {description && <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-6">{description}</p>}
      {action}
    </div>
  )
}
