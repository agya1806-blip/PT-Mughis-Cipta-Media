"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { MOTION } from "@/config/design"
import { requirements } from "@/config/campaign"

export function RequirementsSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(211,194,151,0.06),transparent_50%)]" />
      <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold-dark text-[11px] font-medium uppercase tracking-[0.1em]">Persyaratan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.15] tracking-tight">
            Syarat{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Pendaftaran</span>
          </h2>
          <p className="mt-3 text-cream/60">
            Pastikan Anda memenuhi persyaratan berikut sebelum mendaftar.
          </p>
        </motion.div>

        <motion.div variants={MOTION.stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          {requirements.map((req, i) => (
            <motion.div
              key={i}
              variants={MOTION.fadeUp}
              className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5"
            >
              <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5 text-green" />
              </div>
              <div>
                <p className="text-white font-medium">{req.label}</p>
                {req.description && <p className="text-cream/50 text-sm mt-0.5">{req.description}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
