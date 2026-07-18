"use client"
import { motion } from "framer-motion"
import { Building2, FileCheck, Users, Award, BadgeCheck, MapPin } from "lucide-react"
import SectionWrapper from "./SectionWrapper"
import { fadeInLeft } from "./types"

const reasons = [
  { icon: Building2, label: "Legalitas Lengkap", desc: "Perusahaan berbadan hukum PT dengan NIB dan izin usaha resmi" },
  { icon: FileCheck, label: "PT Resmi & NIB", desc: "Dokumen legalitas lengkap dan transparan untuk kebutuhan mitra" },
  { icon: Users, label: "Tim Berpengalaman", desc: "Didukung tim profesional yang berpengalaman di bidang penerbitan" },
  { icon: Award, label: "Kualitas Premium", desc: "Standar kualitas tinggi di setiap tahap produksi buku" },
  { icon: BadgeCheck, label: "Harga Kompetitif", desc: "Harga terbaik tanpa mengorbankan kualitas hasil cetakan" },
  { icon: MapPin, label: "Nasional", desc: "Melayani pengiriman ke seluruh wilayah Indonesia" },
]

export default function WhyUsSection() {
  return (
    <SectionWrapper muted>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold text-xs font-medium uppercase tracking-wider">Mengapa Kami</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.15]">
            Kenapa Memilih{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Kami?</span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Kami berkomitmen memberikan layanan terbaik dengan standar kualitas tertinggi. Setiap proyek ditangani dengan penuh tanggung jawab dan perhatian terhadap detail.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="group relative bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-5 transition-all duration-300 hover:shadow-lg hover:border-gold/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <r.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">{r.label}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
