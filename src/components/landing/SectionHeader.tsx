"use client"

import { motion } from "framer-motion"
import { fadeInUp } from "./types"

interface Props {
  badge: string
  title: string
  accent?: string
  description?: string
  align?: "center" | "left"
  className?: string
}

export default function SectionHeader({
  badge,
  title,
  accent,
  description,
  align = "center",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "text-center" : "text-left"

  const titleEl = accent ? (
    <>
      {title}{" "}
      <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
        {accent}
      </span>
    </>
  ) : (
    title
  )

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`${alignClass} mb-16 ${className}`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
        <span className="text-gold text-xs font-medium uppercase tracking-wider">
          {badge}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight">
        {titleEl}
      </h2>
      {description && (
        <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}
