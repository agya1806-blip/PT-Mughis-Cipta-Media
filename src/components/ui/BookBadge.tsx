import type { ReactNode } from "react"

type BadgeVariant = "best-seller" | "new" | "featured"

const variantStyles: Record<BadgeVariant, string> = {
  "best-seller": "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20 backdrop-blur-xl",
  "new": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 backdrop-blur-xl",
  "featured": "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20 backdrop-blur-xl",
}

const variantLabels: Record<BadgeVariant, string> = {
  "best-seller": "Best Seller",
  "new": "Baru",
  "featured": "Unggulan",
}

interface Props {
  variant?: BadgeVariant
  className?: string
  children?: ReactNode
}

export default function BookBadge({ variant = "featured", className = "", children }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.08em] border ${variantStyles[variant]} ${className}`}
    >
      {children || variantLabels[variant]}
    </span>
  )
}

export type { BadgeVariant }
