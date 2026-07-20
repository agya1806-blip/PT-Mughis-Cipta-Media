"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

interface Props {
  label: string
  value: string | number
  icon: ReactNode
  trend?: string
  trendDirection?: "up" | "down"
  color?: "gold" | "blue" | "violet" | "green"
}

const colorMap = {
  gold: "from-gold/10 to-gold-dark/5 border-gold/20",
  blue: "from-blue-500/10 to-sky-500/5 border-blue-200/50",
  violet: "from-violet-500/10 to-purple-500/5 border-violet-200/50",
  green: "from-green-500/10 to-gold/5 border-green-200/50",
}

const iconColorMap = {
  gold: "text-gold bg-gold/10",
  blue: "text-blue-600 bg-blue-50",
  violet: "text-violet-600 bg-violet-50",
  green: "text-green-600 bg-green-50",
}

export default function KpiCard({ label, value, icon, trend, trendDirection = "up", color = "gold" }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${colorMap[color]} p-5`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColorMap[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trendDirection === "up" ? "text-green-600" : "text-red-500"}`}>
            {trendDirection === "up" ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-green-dark dark:text-cream mb-1">{value}</p>
      <p className="text-sm text-green/70 dark:text-gold/80">{label}</p>
    </motion.div>
  )
}
