"use client"

import { motion } from "framer-motion"

import { ReactNode } from "react"

interface Props {
  icon?: ReactNode
  value: string
  label: string
  suffix?: string
  className?: string
}

export default function StatisticCard({
  icon,
  value,
  label,
  suffix,
  className = "",
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`group relative bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 sm:p-8 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500 ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative">
        {icon && <div className="mb-4">{icon}</div>}
        <div className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-1">
          {value}
          {suffix && <span className="text-gold">{suffix}</span>}
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      </div>
    </motion.div>
  )
}
