"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function ContactCTA({ phone = "6285723456789" }: { phone?: string }) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green to-green-dark" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(211,194,151,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(211,194,151,0.08),transparent_50%)]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mx-auto mb-6 flex items-center justify-center">
            <Image
              src="/logo-original.png"
              alt="PT Mughis Cipta Media"
              width={160}
              height={17}
              className="h-10 w-auto brightness-0 invert"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-[1.15] tracking-tight mb-4">
            Konsultasi{" "}
            <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
              Penerbitan
            </span>
          </h2>
          <p className="text-lg text-cream/70 max-w-lg mx-auto mb-10">
            Tim kami siap membantu mewujudkan buku Anda. Diskusikan kebutuhan penerbitan Anda sekarang.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-cream hover:bg-cream/90 text-green font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Konsultasi via WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="mailto:admin@pt-mughis-cipta-media.com"
              className="inline-flex items-center gap-2 px-8 py-4 border border-cream/30 text-cream font-semibold rounded-full hover:bg-cream/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              Email Kami
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
