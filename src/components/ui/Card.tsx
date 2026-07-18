"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode
  className?: string
  hover?: boolean
  as?: "div" | "motion"
}

export default function Card({
  children,
  className = "",
  hover = true,
  as = "motion",
}: Props) {
  const base = "bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-sm"
  const hoverClasses = hover
    ? "transition-all duration-300 hover:shadow-lg hover:border-gold/30"
    : ""

  if (as === "motion") {
    return (
      <motion.div
        whileHover={hover ? { y: -2 } : undefined}
        className={`${base} ${hoverClasses} ${className}`}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={`${base} ${hoverClasses} ${className}`}>{children}</div>
}
