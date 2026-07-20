"use client"

import { motion } from "framer-motion"
import Badge from "./Badge"

interface Props {
  badge?: string
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${alignClass} ${className}`}
    >
      {badge && (
        <Badge variant="gold" className="mb-6">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-dark leading-[1.15] tracking-tight text-balance">
        {titleEl}
      </h2>
      {description && (
        <p className="mt-4 text-green/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
