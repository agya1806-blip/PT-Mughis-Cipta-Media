"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import type { Milestone } from "./company-data"

interface Props {
  items: Milestone[]
}

export default function Timeline({ items }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-950/50 overflow-hidden">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[11px] font-medium uppercase tracking-[0.1em] mb-6">Perjalanan Perusahaan</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
            Tonggak <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Sejarah</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">Perjalanan PT Mughis Cipta Media dari awal berdiri hingga menjadi penerbit terpercaya.</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-700/50" />
          <motion.div variants={MOTION.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
            {items.map((milestone, i) => {
              const Icon = milestone.icon
              return (
                <motion.div key={i} variants={MOTION.fadeUp} className="relative pl-14">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border-2 border-gold/30 flex items-center justify-center z-10">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700/30 hover:border-gold/30 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-3">{milestone.year}</span>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{milestone.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
