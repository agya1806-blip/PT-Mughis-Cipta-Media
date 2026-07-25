"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { MOTION, SECTION_BADGE, SECTION_BADGE_TEXT, TYPOGRAPHY } from "@/config/design"
import { TEAM_CONFIG } from "@/config/team"

export function TeamHero() {
  return (
    <section className="relative min-h-[75vh] flex items-center bg-gradient-to-br from-green via-green-dark to-green overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(211,194,151,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(211,194,151,0.06),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              variants={MOTION.fadeUp}
              initial="hidden"
              animate="visible"
              className={SECTION_BADGE}
            >
              <Users className="w-3.5 h-3.5 text-gold-dark" />
              <span className={SECTION_BADGE_TEXT}>Tim Profesional</span>
            </motion.div>

            <motion.h1
              variants={MOTION.blurReveal}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Tim Profesional{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                PT Mughis Cipta Media
              </span>
            </motion.h1>

            <motion.p
              variants={MOTION.fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-cream/70 leading-relaxed max-w-xl"
            >
              {TEAM_CONFIG.hero.subtitle}
            </motion.p>
          </div>

          <motion.div
            variants={MOTION.scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full blur-3xl" />
              <div className="relative w-full h-full rounded-full border border-gold/20 bg-cream/5 backdrop-blur-sm flex items-center justify-center">
                <Users className="w-32 h-32 text-gold/40" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gold/10 border border-gold/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl font-bold text-gold">5</span>
              </div>
              <div className="absolute -bottom-2 -left-4 w-20 h-20 rounded-full bg-green/30 border border-cream/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xs text-cream/80 text-center leading-tight">Tim<br/>Solid</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
