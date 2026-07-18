"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

type Radius = "sm" | "md" | "lg"

interface Props {
  children: ReactNode
  className?: string
  hover?: boolean
  as?: "div" | "motion"
  radius?: Radius
  padding?: boolean
}

const radiusMap: Record<Radius, string> = {
  sm: "rounded-xl",
  md: "rounded-2xl",
  lg: "rounded-3xl",
}

export default function Card({
  children,
  className = "",
  hover = true,
  as = "motion",
  radius = "md",
  padding = true,
}: Props) {
  const base = `bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 shadow-sm ${radiusMap[radius]}`
  const withPadding = padding ? "p-6 sm:p-8" : ""
  const hoverClasses = hover
    ? "transition-all duration-300 hover:shadow-lg hover:border-gold/30"
    : ""

  if (as === "motion") {
    return (
      <motion.div
        whileHover={hover ? { y: -2 } : undefined}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`${base} ${withPadding} ${hoverClasses} ${className}`}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${base} ${withPadding} ${hoverClasses} ${className}`}>
      {children}
    </div>
  )
}
