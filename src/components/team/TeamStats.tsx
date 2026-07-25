"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import { TEAM_CONFIG } from "@/config/team"

export function TeamStats() {
  return (
    <section className="relative -mt-20 z-10 pb-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          variants={MOTION.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {TEAM_CONFIG.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative bg-cream/80 backdrop-blur-md rounded-2xl border border-gold/20 p-6 sm:p-8 text-center shadow-lg shadow-green/5 hover:shadow-xl hover:shadow-gold/10 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="text-3xl sm:text-4xl font-bold text-green-dark mb-1">
                  {stat.value}
                </div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-gold/60 to-gold-dark/60 mx-auto mb-2" />
                <div className="text-xs sm:text-sm text-green-dark/80 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
