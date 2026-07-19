import { ReactNode } from "react"

type Variant = "gold" | "primary" | "secondary" | "outline"

interface Props {
  children: ReactNode
  className?: string
  variant?: Variant
}

const variants: Record<Variant, string> = {
  gold: "bg-gold/10 border-gold/20 text-gold",
  primary: "bg-zinc-900 border-zinc-900 text-white dark:bg-white dark:border-white dark:text-zinc-900",
  secondary: "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400",
  outline: "bg-transparent border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400",
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
