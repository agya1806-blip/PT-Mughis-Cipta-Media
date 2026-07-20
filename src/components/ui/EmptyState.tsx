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
      {icon && <div className="text-green/40 mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-green-dark mb-2">{title}</h3>
      {description && <p className="text-green/80 max-w-md mb-6">{description}</p>}
      {action}
    </div>
  )
}
