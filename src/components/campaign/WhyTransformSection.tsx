"use client"

import { motion } from "framer-motion"
import { Building2, Shield, TrendingUp, Zap, Heart, Globe, type LucideIcon } from "lucide-react"
import { MOTION } from "@/config/design"
import { whyCards } from "@/config/campaign"

const iconMap: Record<string, LucideIcon> = { Building2, Shield, TrendingUp, Zap, Heart, Globe }

export function WhyTransformSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(211,194,151,0.06),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold-dark text-[11px] font-medium uppercase tracking-[0.1em]">Mengapa Bertransformasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
            Standar Baru,{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Kualitas Lebih Baik</span>
          </h2>
          <p className="mt-4 text-cream/60 max-w-xl mx-auto">
            Transformasi ini bukan sekadar perubahan nama, tetapi peningkatan standar di seluruh aspek pelayanan.
          </p>
        </motion.div>

        <motion.div variants={MOTION.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyCards.map((card) => {
            const Icon = iconMap[card.icon]
            return (
              <motion.div
                key={card.title}
                variants={MOTION.fadeUp}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 hover:bg-white/10 hover:border-gold/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {Icon && <Icon className="w-6 h-6 text-gold" />}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-cream/60 leading-relaxed">{card.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
