"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import SectionTitle from "./SectionTitle"

export interface TimelineItem {
  year: string
  title: string
  description: string
  icon: LucideIcon
}

interface Props {
  items: TimelineItem[]
  title?: string
  accent?: string
  description?: string
}

export default function Timeline({ items, title = "Timeline", accent = "Perusahaan", description }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-950/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <SectionTitle badge="Perjalanan" title={title} accent={accent} description={description} align="center" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold to-gold-dark/50 hidden md:block" />
          <div className="space-y-12">
            {items.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative md:pl-20">
                  <div className="hidden md:flex absolute left-4 top-1 w-8 h-8 items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-gold flex items-center justify-center z-10">
                      <Icon className="w-4 h-4 text-gold-dark" />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700/30 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-gold-dark bg-gold/10 px-3 py-1 rounded-full mb-3">
                      <Icon className="w-3.5 h-3.5 md:hidden" />{item.year}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
