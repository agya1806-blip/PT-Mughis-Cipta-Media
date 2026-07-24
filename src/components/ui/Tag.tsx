import { ReactNode } from "react"

type Variant = "gold" | "primary" | "secondary" | "outline"

interface Props {
  children: ReactNode
  className?: string
  variant?: Variant
  onRemove?: () => void
}

const variants: Record<Variant, string> = {
  gold: "bg-gold/10 text-gold-dark dark:text-gold border-transparent",
  primary: "bg-green text-cream border-transparent",
  secondary: "bg-cream dark:bg-green-dark text-green-dark dark:text-cream border-transparent",
  outline: "bg-transparent text-green-dark dark:text-cream border-gold/30",
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
