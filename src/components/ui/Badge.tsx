import { ReactNode } from "react"

type Variant = "gold" | "primary" | "secondary" | "outline"

interface Props {
  children: ReactNode
  className?: string
  variant?: Variant
}

const variants: Record<Variant, string> = {
  gold: "bg-gold/10 border-gold/20 text-green-dark dark:text-gold",
  primary: "bg-green border-green text-cream",
  secondary: "bg-cream dark:bg-green-dark border-gold/20 dark:border-gold/10 text-green-dark dark:text-cream",
  outline: "bg-transparent border-gold/30 text-green-dark dark:text-cream",
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
