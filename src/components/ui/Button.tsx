"use client"

import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "outline" | "ghost" | "accent"
type Size = "default" | "small" | "icon"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-green hover:bg-green-dark text-gold shadow-md hover:shadow-lg hover:shadow-gold/25",
  secondary:
    "bg-green-dark hover:bg-green/90 text-cream shadow-md hover:shadow-lg hover:shadow-green/25",
  outline:
    "border border-gold/30 dark:border-gold/20 text-green-dark dark:text-cream hover:bg-cream dark:hover:bg-green-dark/50 hover:border-gold",
  ghost:
    "text-zinc-500 dark:text-zinc-400 hover:text-green-dark dark:hover:text-cream hover:bg-cream dark:hover:bg-green-dark/50",
  accent:
    "bg-cream hover:bg-cream/90 text-green shadow-md hover:shadow-lg hover:shadow-gold/25",
}

const sizeStyles: Record<Size, string> = {
  default: "h-11 px-6 text-sm font-semibold",
  small: "h-9 px-4 text-xs font-medium",
  icon: "h-10 w-10 p-0",
}

export default function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className = "",
  ...props
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
