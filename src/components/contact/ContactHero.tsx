"use client"

import { motion } from "framer-motion"

export default function ContactHero() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,106,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,169,106,0.06),transparent_50%)]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse-glow" />
            <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">
              Hubungi Kami
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            Diskusikan{" "}
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              Buku Anda
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-zinc-400 max-w-lg leading-relaxed">
            Punya naskah siap cetak atau pertanyaan seputar penerbitan? Tim kami siap membantu mewujudkan buku Anda.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
