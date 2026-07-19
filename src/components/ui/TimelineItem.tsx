"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface Props {
  icon: ReactNode
  label: string
  description?: string
  step: number
  className?: string
  active?: boolean
}

export default function TimelineItem({
  icon,
  label,
  description,
  step,
  className = "",
  active = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: step * 0.1 }}
      className={`relative flex items-start gap-6 ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: step * 0.15, type: "spring", stiffness: 200 }}
        className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-zinc-800/50 border flex items-center justify-center shadow-lg shrink-0 ${
          active
            ? "border-gold text-gold"
            : "border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400"
        }`}
      >
        {icon}
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center">
          {step}
        </span>
      </motion.div>
      <div className="pt-3">
        <h3 className="font-semibold text-zinc-900 dark:text-white text-lg">{label}</h3>
        {description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{description}</p>
        )}
      </div>
    </motion.div>
  )
}
