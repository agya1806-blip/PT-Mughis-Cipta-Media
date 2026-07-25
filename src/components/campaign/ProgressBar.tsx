"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  total: number
  current: number
}

export function ProgressBar({ total, current }: ProgressBarProps) {
  const percent = Math.min((current / total) * 100, 100)
  const remaining = total - current

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-cream">{total}</p>
            <p className="text-xs text-cream/80 mt-0.5">Total Kuota</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-cream">{current}</p>
            <p className="text-xs text-cream/80 mt-0.5">Terdaftar</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gold">{remaining}</p>
            <p className="text-xs text-cream/80 mt-0.5">Slot Tersisa</p>
          </div>
        </div>
      </div>
      <div className="relative h-3 bg-gold/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold to-gold-dark"
        />
      </div>
    </div>
  )
}
