"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { BookOpen } from "lucide-react"

export default function BlogHero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,106,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,169,106,0.08),transparent_50%)]" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6 border border-gold/10">
              <BookOpen className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5">
              Insight & Inspirasi{" "}
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Dunia Penerbitan
              </span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Temukan artikel, panduan, tips menulis, informasi ISBN, percetakan, dan berbagai wawasan yang membantu perjalanan menerbitkan buku.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
