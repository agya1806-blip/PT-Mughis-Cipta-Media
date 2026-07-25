"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { MOTION } from "@/config/design"
import { ProgressBar } from "./ProgressBar"
import { CAMPAIGN } from "@/config/campaign"

export function QuotaSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-green via-green-dark to-green overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(211,194,151,0.08),transparent_50%)]" />
      <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/10 mb-6">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">Kuota Terbatas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.15] tracking-tight">
            Kuota{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Program</span>
          </h2>
          <p className="mt-3 text-cream/60">
            Hanya 50 peserta pertama yang bisa mengikuti program ini. Segera daftarkan diri Anda.
          </p>
        </motion.div>

        <motion.div
          variants={MOTION.scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-cream/5 backdrop-blur-sm rounded-3xl border border-cream/10 p-8 sm:p-10"
        >
          <ProgressBar total={CAMPAIGN.quota.total} current={CAMPAIGN.quota.registered} />
        </motion.div>
      </div>
    </section>
  )
}
