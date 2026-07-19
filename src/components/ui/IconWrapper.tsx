import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "gold" | "surface" | "subtle"
}

const sizeMap = {
  sm: "w-8 h-8 rounded-lg",
  md: "w-10 h-10 rounded-xl",
  lg: "w-12 h-12 rounded-xl",
}

const variantMap = {
  gold: "bg-gold/10 text-gold",
  surface: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
  subtle: "bg-white/5 text-white/80",
}

export default function IconWrapper({
  children,
  className = "",
  size = "md",
  variant = "gold",
}: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${sizeMap[size]} ${variantMap[variant]} ${className}`}
    >
      {children}
    </div>
  )
}
