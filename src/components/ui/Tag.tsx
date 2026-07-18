import { ReactNode } from "react"

type Variant = "gold" | "primary" | "secondary" | "outline"

interface Props {
  children: ReactNode
  className?: string
  variant?: Variant
  onRemove?: () => void
}

const variants: Record<Variant, string> = {
  gold: "bg-gold/10 text-gold border-transparent",
  primary: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent",
  secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-transparent",
  outline: "bg-transparent text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700/50",
}

export default function Tag({
  children,
  className = "",
  variant = "secondary",
  onRemove,
}: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:opacity-60 transition-opacity"
          aria-label="Remove"
        >
          &times;
        </button>
      )}
    </span>
  )
}
