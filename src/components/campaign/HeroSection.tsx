"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { MOTION } from "@/config/design"

export function HeroSection({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-green via-green-dark to-green">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(211,194,151,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(211,194,151,0.08),transparent_50%)]" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-32 sm:py-40">
        <motion.div variants={MOTION.blurReveal} initial="hidden" animate="visible" className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/5 border border-cream/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">
              Transformasi Perusahaan
            </span>
          </div>

          <p className="text-gold/80 text-lg sm:text-xl font-medium tracking-wide mb-4">
            Maktabah Al-Mughis Kini Bertransformasi Menjadi
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight">
            PT Mughis{" "}
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold-dark bg-clip-text text-transparent">
              Cipta Media
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-cream/70 leading-relaxed max-w-xl">
            Era baru penerbitan yang lebih profesional, modern, dan terpercaya telah dimulai.
            Kami hadir dengan standar baru untuk karya Anda.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onCtaClick}
              className="group inline-flex items-center gap-2 h-12 sm:h-14 px-7 sm:px-8 text-sm font-semibold rounded-full bg-gold hover:bg-gold-dark text-green-dark shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Daftar Program
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#transformasi"
              className="group inline-flex items-center gap-2 h-12 sm:h-14 px-7 sm:px-8 text-sm font-semibold rounded-full border border-cream/20 text-cream/80 hover:text-cream hover:bg-cream/10 transition-all duration-300"
            >
              Pelajari Selengkapnya
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="mt-16 flex items-center gap-8 text-sm text-cream/50">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Legalitas Resmi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Standar Profesional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Terpercaya</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
