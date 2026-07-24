"use client"

import { motion } from "framer-motion"
import { MessageCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export default function AboutCTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold-dark to-green-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(251,191,36,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.15),transparent_50%)]" />

      <div className="absolute top-10 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex mb-6"
          >
            <Sparkles className="w-8 h-8 text-gold-light" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
            Wujudkan Buku Impian Anda{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark">
              Bersama Kami
            </span>
          </h2>

          <p className="text-lg text-gold/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Dari naskah mentah hingga menjadi buku yang siap dinikmati masyarakat. Tim profesional kami siap mendampingi setiap langkah perjalanan penerbitan Anda.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kontak"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-cream text-green-dark font-semibold rounded-2xl hover:bg-gold/10 transition-all duration-300 shadow-lg shadow-gold/20"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi Kami
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                →
              </motion.span>
            </Link>

            <Link
              href="/kontak"
              className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-cream/20 text-cream font-semibold rounded-2xl hover:bg-cream/10 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Konsultasi Gratis
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  )
}
