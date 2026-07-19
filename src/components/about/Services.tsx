"use client"

import { motion } from "framer-motion"
import {
  BookOpen, Printer, PenLine, FileEdit, Search,
  LayoutTemplate, Palette, QrCode, Truck, ShoppingBag,
  Radio,
} from "lucide-react"

const services = [
  { icon: BookOpen, title: "Penerbitan Buku", desc: "Proses penerbitan buku yang lengkap dan profesional, dari naskah hingga buku siap edar." },
  { icon: Printer, title: "Percetakan Buku", desc: "Layanan percetakan berkualitas tinggi dengan berbagai pilihan ukuran, kertas, dan finishing." },
  { icon: PenLine, title: "Penerbitan Mandiri", desc: "Solusi penerbitan mandiri untuk penulis yang ingin mengontrol penuh proses kreatifnya." },
  { icon: FileEdit, title: "Editing", desc: "Layanan editing naskah profesional meliputi substansi, bahasa, dan penyempurnaan konten." },
  { icon: Search, title: "Proofreading", desc: "Pemeriksaan detail untuk memastikan naskah bebas dari kesalahan ejaan, tanda baca, dan tata bahasa." },
  { icon: LayoutTemplate, title: "Layout Buku", desc: "Penataan isi buku yang rapi, nyaman dibaca, dan sesuai standar industri penerbitan." },
  { icon: Palette, title: "Desain Cover", desc: "Desain sampul buku yang menarik, profesional, dan mencerminkan isi buku." },
  { icon: QrCode, title: "Pengurusan ISBN", desc: "Bantuan pengurusan ISBN Perpustakaan Nasional RI untuk setiap buku yang diterbitkan." },
  { icon: Truck, title: "Distribusi Buku", desc: "Jaringan distribusi yang luas untuk menjangkau pembaca di seluruh Indonesia." },
  { icon: ShoppingBag, title: "Pemasaran Buku", desc: "Strategi pemasaran untuk memperkenalkan buku Anda ke pasar yang lebih luas." },
  { icon: Radio, title: "Media Kreatif", desc: "Layanan media kreatif termasuk konten digital, multimedia, dan promosi buku." },
]

export default function Services() {
  return (
    <section className="relative py-24 lg:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm tracking-widest uppercase">Apa yang Kami Tawarkan</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mt-4">
            Layanan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">
              Kami
            </span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-2xl mx-auto">
            Solusi lengkap untuk kebutuhan penerbitan dan media kreatif Anda, dari hulu ke hilir.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="group relative bg-white rounded-2xl p-6 border border-zinc-200 hover:border-gold/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <Icon className="w-5 h-5 text-gold-dark" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">{title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
