"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

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
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(200,169,106,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,169,106,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,169,106,0.03),transparent_60%)]" />

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
            <span className="text-3xl font-bold text-gold">M</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-4">
            Siap Menerbitkan{" "}
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">Buku Anda?</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-lg mx-auto mb-10">
            Konsultasikan kebutuhan penerbitan, percetakan, dan distribusi buku Anda bersama tim profesional kami.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/katalog"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
            >
              Mulai Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" /> Konsultasi
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
