"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Props {
  icon: ReactNode
  title: string
  description: string
  index?: number
}

export default function TrustCard({ icon, title, description, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative bg-white/70 dark:bg-zinc-800/40 backdrop-blur-xl rounded-2xl border border-zinc-200/50 dark:border-zinc-700/30 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/20 hover:border-gold/30"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 text-gold group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        <h3 className="font-semibold text-zinc-900 dark:text-white text-lg mb-2">{title}</h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>

        <div className="flex items-center gap-1 text-gold mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  )
}
