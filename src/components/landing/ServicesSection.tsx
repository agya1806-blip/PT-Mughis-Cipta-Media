"use client"
import { motion } from "framer-motion"
import { BookOpen, FileEdit, Search, Layout, Palette, Printer, Truck, PenTool, Monitor } from "lucide-react"
import SectionWrapper from "./SectionWrapper"
import SectionHeader from "./SectionHeader"

const services = [
  { icon: BookOpen, label: "Penerbitan Buku", desc: "Proses penerbitan lengkap dari naskah hingga buku siap edar" },
  { icon: FileEdit, label: "Editing", desc: "Editing substansi dan bahasa oleh editor profesional" },
  { icon: Search, label: "Proofreading", desc: "Pemeriksaan detail untuk hasil akhir yang sempurna" },
  { icon: Layout, label: "Layout", desc: "Tata letak halaman yang rapi, nyaman, dan estetis" },
  { icon: Palette, label: "Desain Cover", desc: "Desain cover premium yang menarik dan profesional" },

  { icon: Printer, label: "Percetakan", desc: "Cetak digital & offset dengan kualitas terbaik" },
  { icon: Truck, label: "Distribusi", desc: "Distribusi nasional ke toko buku dan platform online" },
  { icon: PenTool, label: "Penerbitan Mandiri", desc: "Kontrol penuh bagi penulis yang ingin mandiri" },
  { icon: Monitor, label: "Media Kreatif", desc: "Layanan desain grafis, video, dan konten kreatif" },
]

export default function ServicesSection() {
  return (
    <SectionWrapper>
      <SectionHeader
        badge="Layanan"
        title="Solusi Lengkap"
        accent="Dunia Penerbitan"
        description="Dari hulu ke hilir — kami menangani seluruh proses penerbitan dengan standar kualitas tertinggi"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {services.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative bg-cream rounded-2xl border border-gold/20 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5 hover:border-gold/40"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <s.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-semibold text-green-dark mb-2">{s.label}</h3>
              <p className="text-sm text-green/80 leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
