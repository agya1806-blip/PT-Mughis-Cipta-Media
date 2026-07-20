"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export default function ServiceHero({
  icon, title, tagline, description, index
}: {
  icon: ReactNode
  title: string
  tagline: string
  description: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 mb-6">
        {icon}
      </div>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium uppercase tracking-wider mb-4">
        Layanan {index + 1} dari 5
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mt-3">
        {title}
      </h2>
      <p className="mt-2 text-gold-dark font-medium">{tagline}</p>
      <p className="mt-6 text-zinc-600 max-w-3xl mx-auto text-lg leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
