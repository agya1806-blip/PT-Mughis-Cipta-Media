"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"
import TextLogo from "@/components/TextLogo"

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const scaleIcon = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, delay: 0.1 },
  },
}

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-dark to-green" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(211,194,151,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(211,194,151,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(211,194,151,0.03),transparent_60%)]" />

      <div className="container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            variants={scaleIcon}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6"
          >
            <TextLogo variant="inline" className="[&_span:first-child]:text-cream [&_span:last-child]:text-cream" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-[1.15] tracking-tight mb-4">
            Siap Menerbitkan{" "}
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">Buku Anda?</span>
          </h2>
          <p className="text-lg text-cream/70 max-w-lg mx-auto mb-10">
            Konsultasikan kebutuhan penerbitan, percetakan, dan distribusi buku Anda bersama tim profesional kami.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/katalog"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-cream hover:bg-cream/90 text-green font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
            >
              Mulai Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-8 py-4 border border-cream/30 text-cream font-semibold rounded-full hover:bg-cream/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" /> Konsultasi
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
