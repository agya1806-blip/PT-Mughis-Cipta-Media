"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import { flowSteps } from "@/config/campaign"

export function FlowSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-green-dark text-[11px] font-medium uppercase tracking-[0.1em]">Alur Program</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-dark leading-[1.15] tracking-tight">
            Bagaimana{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Cara Kerjanya</span>
          </h2>
          <p className="mt-4 text-green-dark/80 max-w-lg mx-auto">
            Proses yang transparan dan mudah dari pendaftaran hingga pendampingan.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gold/20 hidden sm:block" />
          <div className="space-y-8 sm:space-y-0">
            {flowSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={MOTION.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative flex items-start gap-5 sm:gap-8 sm:pl-20"
              >
                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cream border-2 border-gold/30 flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-green-dark">{step.number}</span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="sm:hidden absolute top-12 left-6 w-0.5 h-6 bg-gradient-to-b from-gold/40 to-transparent" />
                  )}
                </div>
                <div className="pt-2 sm:pt-3">
                  <h3 className="text-lg font-bold text-green-dark">{step.title}</h3>
                  <p className="text-sm text-green-dark/80 mt-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
