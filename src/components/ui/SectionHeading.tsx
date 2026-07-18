"use client"

import { motion } from "framer-motion"

interface Props {
  badge: string
  title: string
  accent?: string
  description?: string
  align?: "center" | "left"
}

export default function SectionHeading({
  badge,
  title,
  accent,
  description,
  align = "center",
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${alignClass} mb-16`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
        <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">
          {badge}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-[1.15] tracking-tight text-balance">
        {titleEl}
      </h2>
      {description && (
        <p className="mt-4 text-secondary max-w-2xl mx-auto">{description}</p>
      )}
    </motion.div>
  )
}
