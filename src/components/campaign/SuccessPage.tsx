"use client"

import { motion } from "framer-motion"
import { CheckCircle, MessageCircle, ArrowLeft } from "lucide-react"
import { MOTION } from "@/config/design"
import { CAMPAIGN } from "@/config/campaign"

interface SuccessPageProps {
  registrationNumber: string
}

export function SuccessPage({ registrationNumber }: SuccessPageProps) {
  const waUrl = `https://wa.me/${CAMPAIGN.whatsappAdmin}?text=Halo%20Admin%20PT%20Mughis%20Cipta%20Media%2C%20saya%20sudah%20mendaftar%20Program%20Apresiasi%20Penulis.`

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green via-green-dark to-green overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(211,194,151,0.1),transparent_60%)]" />
      <div className="max-w-lg mx-auto px-6 text-center relative">
        <motion.div
          variants={MOTION.scaleIn}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-green/30 border-2 border-gold/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Berhasil Mendaftar!
          </h1>
          <p className="text-cream/90 mt-3">
            Terima kasih telah mendaftar Program Apresiasi Penulis.
            Tim kami akan segera menghubungi Anda.
          </p>
        </motion.div>

        <motion.div
          variants={MOTION.fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-cream/10 backdrop-blur-sm rounded-2xl border border-cream/20 p-6 mb-8"
        >
          <p className="text-cream/85 text-sm mb-2">Nomor Registrasi</p>
          <p className="text-2xl sm:text-3xl font-bold text-gold tracking-wider">{registrationNumber}</p>
        </motion.div>

        <motion.div
          variants={MOTION.fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 h-12 sm:h-14 px-8 text-sm font-semibold rounded-full bg-gold hover:bg-gold-dark text-green-dark shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi Admin WhatsApp
          </a>
          <div>
            <a
              href="/transformasi"
              className="inline-flex items-center gap-1.5 text-sm text-cream/85 hover:text-cream transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke halaman utama
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
