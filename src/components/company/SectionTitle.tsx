"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"

interface Props {
  badge?: string
  title: string
  accent?: string
  description?: string
  align?: "center" | "left"
  className?: string
}

export default function SectionTitle({
  badge,
  title,
  accent,
  description,
  align = "center",
  className = "",
}: Props) {
  return (
    <motion.div
      variants={MOTION.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium uppercase tracking-[0.1em] mb-6">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-dark leading-[1.15] tracking-tight text-balance">
        {title}{" "}
        {accent && (
          <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
            {accent}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-green/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
