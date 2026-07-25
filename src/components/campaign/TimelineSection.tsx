"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import { timelineEvents } from "@/config/campaign"

export function TimelineSection() {
  return (
    <section id="transformasi" className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold-dark text-[11px] font-medium uppercase tracking-[0.1em]">Perjalanan Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-dark leading-[1.15] tracking-tight">
            Cerita{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Transformasi</span>
          </h2>
          <p className="mt-4 text-green/80 max-w-xl mx-auto">
            Dari penerbit indie menjadi perusahaan resmi — perjalanan kami dalam membangun ekosistem penerbitan yang profesional.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/10 via-gold/30 to-gold/10 hidden lg:block" />

          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.year}
                variants={MOTION.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative lg:text-center"
              >
                <div className="flex items-start gap-5 lg:flex-col lg:items-center">
                  <div className="relative z-10 shrink-0">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-cream border-2 border-gold/30 flex items-center justify-center shadow-lg">
                      <span className="text-lg font-bold text-gold-dark">{event.year}</span>
                    </div>
                    {i < timelineEvents.length - 1 && (
                      <div className="lg:hidden absolute top-14 left-7 w-0.5 h-8 bg-gradient-to-b from-gold/40 to-transparent" />
                    )}
                  </div>
                  <div className="lg:mt-4 lg:text-center flex-1">
                    <h3 className="text-lg font-bold text-green-dark">{event.title}</h3>
                    <p className="text-sm text-green-dark/80 mt-1.5 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
