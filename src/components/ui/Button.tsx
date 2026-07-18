"use client"

import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "ghost"
type Size = "default" | "small"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  children: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gold hover:bg-gold-dark text-white shadow-md hover:shadow-lg hover:shadow-gold/25",
  secondary:
    "border border-border text-primary hover:bg-zinc-50 dark:hover:bg-zinc-800",
  ghost:
    "text-secondary hover:text-primary hover:bg-zinc-50 dark:hover:bg-zinc-800",
}

const sizeStyles: Record<Size, string> = {
  default: "h-11 px-6 text-sm font-semibold",
  small: "h-9 px-4 text-xs font-medium",
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
