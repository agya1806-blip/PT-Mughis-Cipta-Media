"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function ServiceCTA() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 leading-tight mb-4">
            Siap Menerbitkan Buku?
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto mb-10">
            Konsultasikan naskah Anda dengan tim profesional kami. Kami siap membantu mewujudkan buku Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25"
            >
              Konsultasi Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/6285723456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-300 text-zinc-700 font-semibold rounded-full hover:bg-zinc-50 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
