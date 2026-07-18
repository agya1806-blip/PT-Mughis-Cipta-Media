"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { ReactNode } from "react"

interface Props {
  quote: string
  author: string
  role?: string
  avatar?: ReactNode
  rating?: number
  className?: string
}

export default function QuoteCard({
  quote,
  author,
  role,
  avatar,
  className = "",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6 sm:p-8 shadow-sm ${className}`}
    >
      <Quote className="w-6 h-6 text-gold/40 mb-4" />
      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700/50 flex items-center gap-3">
        {avatar ? (
          <div className="shrink-0">{avatar}</div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <span className="text-gold font-semibold text-sm">{author[0]}</span>
          </div>
        )}
        <div>
          <p className="font-semibold text-zinc-900 dark:text-white text-sm">{author}</p>
          {role && <p className="text-xs text-zinc-500 dark:text-zinc-400">{role}</p>}
        </div>
      </div>
    </motion.div>
  )
}
