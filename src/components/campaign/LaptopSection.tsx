"use client"

import { motion } from "framer-motion"
import { Laptop, MessageCircle, CheckCircle2 } from "lucide-react"
import { MOTION } from "@/config/design"
import { CAMPAIGN } from "@/config/campaign"

const items = [
  "Microsoft Word",
  "Menulis Buku",
  "Skripsi & Tesis",
  "Canva",
  "Zoom Meeting",
  "Editing Ringan",
  "Aktivitas Perkantoran",
]

export function LaptopSection() {
  const waUrl = `https://wa.me/${CAMPAIGN.laptopWhatsapp}?text=Halo%20Admin%20Laptop%2C%20saya%20ingin%20konsultasi%20tentang%20laptop.`

  return (
    <section className="relative py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={MOTION.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Laptop className="w-3.5 h-3.5 text-gold" />
              <span className="text-green-dark text-[11px] font-medium uppercase tracking-[0.1em]">Layanan Tambahan</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-green-dark leading-[1.15] tracking-tight">
              Butuh Laptop untuk{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Menulis?</span>
            </h2>

            <p className="mt-4 text-green-dark/80 leading-relaxed">
              Selain mendampingi proses penerbitan karya, PT Mughis Cipta Media juga menyediakan laptop pilihan yang cocok
              untuk penulis, mahasiswa, guru, dosen, peneliti, dan pekerja kreatif.
            </p>

            <p className="mt-5 text-sm font-semibold text-green-dark">Laptop yang kami sediakan telah dipilih agar nyaman digunakan untuk:</p>

            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-green-dark/80">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-green hover:bg-green-dark text-gold text-sm font-semibold shadow-lg shadow-green/25 hover:shadow-xl hover:shadow-green/30 transition-all duration-300 hover:scale-[1.03]"
              >
                <MessageCircle className="w-4 h-4" />
                Hubungi Admin Laptop
              </a>
              <p className="mt-3 text-xs text-green-dark/60">
                Konsultasi gratis untuk memilih laptop sesuai kebutuhan dan anggaran.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={MOTION.scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-gold/5 rounded-[2rem] blur-2xl transition-all duration-500 group-hover:blur-3xl group-hover:scale-105" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[2rem] bg-gradient-to-br from-cream/80 to-cream border border-gold/30 backdrop-blur-sm shadow-xl shadow-gold/10 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-gold/20">
                <Laptop className="w-28 h-28 sm:w-32 sm:h-32 text-gold/80 transition-all duration-500 group-hover:scale-110 group-hover:text-gold" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
