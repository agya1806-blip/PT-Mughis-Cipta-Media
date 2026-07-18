import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  variant?: "gold" | "default"
}

const variants = {
  gold: "bg-gold/10 border-gold/20 text-gold",
  default: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400",
}

export default function Badge({ children, className = "", variant = "gold" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium uppercase tracking-[0.1em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
