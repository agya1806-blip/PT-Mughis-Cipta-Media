"use client"

import { motion } from "framer-motion"
import { CheckCircle, Gift } from "lucide-react"
import { MOTION } from "@/config/design"
import { useCampaignStatus } from "@/lib/campaign/useCampaignStatus"
import { getMicrocopy } from "@/lib/campaign/microcopy"

export function ProgramSection({ onCtaClick }: { onCtaClick: () => void }) {
  const { status, isOpen, loading } = useCampaignStatus()
  const mc = !loading ? getMicrocopy(status, isOpen) : null

  const buttonText = !loading
    ? !isOpen && status === "before"
      ? "Segera Dibuka"
      : !isOpen
      ? "Program Telah Ditutup"
      : "Daftar Program Sekarang"
    : "Daftar Program Sekarang"

  return (
    <section className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-green-dark text-[11px] font-medium uppercase tracking-[0.1em]">Program Spesial</span>
            {!loading && mc && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.08em] ${
                status === "before" ? "bg-amber-100 text-amber-700" : status === "after" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
              }`}>
                {mc.badge}
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-dark leading-[1.15] tracking-tight">
            Program Apresiasi{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Penulis</span>
          </h2>
          <p className="mt-4 text-green-dark/80 text-lg leading-relaxed">
            Dalam rangka transformasi menjadi PT Mughis Cipta Media, kami menghadirkan Program Apresiasi Penulis.
            Program ini memberikan pendampingan administrasi penerbitan secara GRATIS sesuai ketentuan yang berlaku.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Pendampingan administrasi penerbitan",
              "Konsultasi penerbitan dengan tim profesional",
              "Pendampingan proses ISBN sesuai ketentuan Perpustakaan Nasional RI",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-7 h-7 rounded-full bg-green/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green" />
                </div>
                <span className="text-green-dark/90">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10">
            <button
              onClick={onCtaClick}
              disabled={!isOpen && !loading}
              className="group inline-flex items-center gap-2 h-12 sm:h-14 px-7 sm:px-8 text-sm font-semibold rounded-full bg-green hover:bg-green-dark text-gold shadow-md hover:shadow-xl hover:shadow-green/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <Gift className="w-4 h-4" />
              {buttonText}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
