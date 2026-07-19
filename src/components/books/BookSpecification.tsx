"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import SectionTitle from "./SectionTitle"
import { getSpecItems } from "./book-detail-data"
import type { BookDetail } from "./book-detail-data"

interface Props {
  book: BookDetail
}

export default function BookSpecification({ book }: Props) {
  const specs = getSpecItems(book)

  return (
    <section className="space-y-8">
      <SectionTitle
        title="Spesifikasi Buku"
        subtitle="Informasi teknis lengkap"
      />
      <motion.div
        variants={MOTION.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {specs.map((spec) => {
          const Icon = spec.icon
          return (
            <motion.div
              key={spec.label}
              variants={MOTION.fadeUp}
              className="group relative bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/30 p-5 transition-all duration-300 hover:shadow-lg hover:border-gold/30 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">
                    {spec.label}
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    {spec.value}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
