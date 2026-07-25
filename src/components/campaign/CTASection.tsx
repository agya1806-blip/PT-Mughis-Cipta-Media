"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { MOTION } from "@/config/design"
import { useCampaignStatus } from "@/lib/campaign/useCampaignStatus"
import { getMicrocopy } from "@/lib/campaign/microcopy"

export function CTASection({ onCtaClick }: { onCtaClick: () => void }) {
  const { status, isOpen, loading } = useCampaignStatus()
  const mc = !loading ? getMicrocopy(status, isOpen) : null

  const buttonText = !loading
    ? !isOpen && status === "before"
      ? "Segera Dibuka"
      : !isOpen
      ? "Telah Ditutup"
      : "Daftar Sekarang"
    : "Daftar Sekarang"

  return (
    <section className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-10 text-center relative">
        <motion.div variants={MOTION.scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-dark leading-[1.15] tracking-tight">
            Jangan Lewatkan{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Kesempatan Ini
            </span>
          </h2>
          <p className="mt-4 text-green-dark/80 text-lg max-w-md mx-auto">
            {!loading && mc
              ? mc.microcopy
              : "Kuota terbatas. Segera daftarkan diri Anda dan dapatkan pendampingan administrasi penerbitan."}
          </p>
          <div className="mt-10">
            <button
              onClick={onCtaClick}
              disabled={!isOpen && !loading}
              className="group inline-flex items-center gap-2 h-14 px-10 text-sm font-semibold rounded-full bg-green hover:bg-green-dark text-gold shadow-lg shadow-green/25 hover:shadow-xl hover:shadow-green/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {buttonText}
              {isOpen && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
