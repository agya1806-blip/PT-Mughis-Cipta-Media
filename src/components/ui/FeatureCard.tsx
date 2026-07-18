"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import IconWrapper from "./IconWrapper"

interface Props {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export default function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 transition-all duration-300 hover:shadow-lg hover:border-gold/30 ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative">
        <IconWrapper size="md" variant="gold">
          {icon}
        </IconWrapper>
        <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white text-sm sm:text-base">{title}</h3>
        <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
