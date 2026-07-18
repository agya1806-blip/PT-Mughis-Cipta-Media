"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"

interface Props {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionTitle({ title, subtitle, className = "" }: Props) {
  return (
    <motion.div
      variants={MOTION.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
