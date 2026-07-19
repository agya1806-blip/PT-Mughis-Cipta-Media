"use client"

import Link from "next/link"
import { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "outline" | "ghost"
type Size = "default" | "small" | "icon"

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
    "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900",
  outline:
    "border border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-gold/40",
  ghost:
    "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800",
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
