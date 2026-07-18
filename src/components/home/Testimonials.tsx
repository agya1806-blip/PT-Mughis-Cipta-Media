"use client"

import { motion, useReducedMotion } from "framer-motion"
import SectionWrapper from "@/components/landing/SectionWrapper"
import SectionHeader from "@/components/landing/SectionHeader"
import TestimonialCard from "@/components/ui/TestimonialCard"
import { testimonials } from "./testimonials-data"

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <SectionWrapper muted>
      <SectionHeader
        badge="Testimonial"
        title="Apa Kata"
        accent="Mereka?"
        description="Kepercayaan para penulis dan mitra menjadi motivasi kami untuk terus menghadirkan layanan penerbitan yang profesional dan berkualitas."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
            className="h-full"
          >
            <TestimonialCard testimonial={t} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
