"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"
import { Button, GlassPanel } from "@/components/ui"
import CTAFeature from "@/components/ui/CTAFeature"
import { ctaData } from "./cta-data"

export default function FinalCTA() {
  const prefersReducedMotion = useReducedMotion()
  const { headline, subtitle, primaryCta, secondaryCta, features } = ctaData

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,106,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,169,106,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,169,106,0.03),transparent_60%)]" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="max-w-xl">
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight"
            >
              {headline}
            </motion.h2>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-lg text-zinc-400 leading-relaxed"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 space-y-3"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.25,
                    delay: 0.2 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <CTAFeature label={feature} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              {!prefersReducedMotion && (
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-4 bg-gradient-to-br from-gold/10 via-transparent to-transparent rounded-3xl blur-3xl pointer-events-none"
                />
              )}
              <GlassPanel intensity="medium" border className="relative p-8 sm:p-10">
                <div className="relative space-y-4">
                  <Button
                    href={primaryCta.href}
                    variant="primary"
                    className="w-full h-12 text-base group"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    href={secondaryCta.href}
                    variant="outline"
                    className="w-full"
                  >
                    {secondaryCta.label}
                  </Button>
                </div>
              </GlassPanel>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
