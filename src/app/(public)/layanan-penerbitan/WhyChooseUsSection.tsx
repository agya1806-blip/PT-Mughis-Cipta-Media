"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

export default function WhyChooseUsSection({ items }: { items: { icon: ReactNode; title: string; description: string }[] }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium uppercase tracking-wider mb-6"
      >
        Kenapa Memilih Kami
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4"
      >
        Mitra Penerbitan{" "}
        <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Terpercaya</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-zinc-400 max-w-2xl mx-auto mb-12"
      >
        Mengapa penulis dan penerbit mempercayakan penerbitan mereka kepada PT Mughis Cipta Media.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/[0.08] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
        ))}
      </div>
    </div>
  )
}
