"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const reasons = [
  "Badan usaha resmi dengan legalitas lengkap dan terpercaya",
  "Proses penerbitan yang profesional dan transparan",
  "Harga kompetitif dengan kualitas terbaik",
  "Kualitas cetak terbaik dengan teknologi modern",
  "Pengerjaan tepat waktu sesuai jadwal yang disepakati",
  "Tim berpengalaman di industri penerbitan dan percetakan",
  "Konsultasi gratis sebelum memulai proyek",
  "Mendukung penulis pemula maupun profesional",
  "Layanan tersedia untuk seluruh wilayah Indonesia",
  "Pendampingan penuh dari naskah hingga distribusi",
]

export default function WhyUs() {
  return (
    <section className="relative py-24 lg:py-32 bg-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">Keunggulan</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mt-4 mb-6 leading-tight">
              Mengapa Memilih{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">
                Kami?
              </span>
            </h2>
            <p className="text-zinc-500 text-lg mb-8">
              Kami memahami bahwa setiap penulis memiliki kebutuhan yang unik. Itulah mengapa kami memberikan layanan yang personal, profesional, dan terpercaya.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-zinc-700 text-sm">{r}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-10 text-white overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),transparent_50%)]" />
              <div className="relative">
                <h3 className="text-xl font-bold mb-2">Siap Memulai?</h3>
                <p className="text-zinc-400 text-sm mb-6">
                  Konsultasikan naskah Anda dengan tim kami. Kami siap membantu mewujudkan buku impian Anda.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Penulis Terbantu", value: "100+" },
                    { label: "Proyek Selesai", value: "500+" },
                    { label: "Kepuasan Klien", value: "98%" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                      <span className="text-zinc-400 text-sm">{label}</span>
                      <span className="font-bold text-gold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
