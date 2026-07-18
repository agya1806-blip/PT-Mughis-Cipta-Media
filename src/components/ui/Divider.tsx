import { ReactNode } from "react"

interface Props {
  className?: string
  decorative?: boolean
}

export default function Divider({ className = "", decorative = false }: Props) {
  return (
    <hr
      role={decorative ? "presentation" : "separator"}
      className={`border-zinc-200 dark:border-zinc-700/50 ${className}`}
    />
  )
}
