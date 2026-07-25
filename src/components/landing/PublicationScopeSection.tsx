"use client"
import { motion } from "framer-motion"
import {
  BookOpen, BookText, Globe, Languages, FileText, GraduationCap,
  BookMarked, Scroll, Files, PenTool, Feather, Book, ClipboardList,
  Compass, Sparkles,
} from "lucide-react"
import SectionWrapper from "./SectionWrapper"
import type { LucideIcon } from "lucide-react"

const types: { icon: LucideIcon; label: string }[] = [
  { icon: BookOpen, label: "Buku" },
  { icon: BookText, label: "Kitab" },
  { icon: Globe, label: "Kitab Terjemahan" },
  { icon: Languages, label: "Terjemahan Buku" },
  { icon: FileText, label: "Modul" },
  { icon: GraduationCap, label: "Buku Ajar" },
  { icon: BookMarked, label: "Buku Referensi" },
  { icon: Scroll, label: "Monograf" },
  { icon: Files, label: "Prosiding" },
  { icon: PenTool, label: "Antologi" },
  { icon: Feather, label: "Kumpulan Puisi" },
  { icon: BookOpen, label: "Kumpulan Cerpen" },
  { icon: Book, label: "Novel" },
  { icon: ClipboardList, label: "Pedoman" },
  { icon: Compass, label: "Panduan" },
  { icon: BookMarked, label: "Ensiklopedia" },
  { icon: BookText, label: "Kamus" },
]

export default function PublicationScopeSection() {
  return (
    <SectionWrapper muted>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-green-dark text-xs font-medium uppercase tracking-wider">Jenis Terbitan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-dark leading-[1.15]">
            Lebih dari Sekadar{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Penerbit Buku</span>
          </h2>
          <p className="mt-4 text-green/80 max-w-3xl mx-auto leading-relaxed">
            PT Mughis Cipta Media merupakan perusahaan penerbit yang berkomitmen mendukung lahirnya berbagai karya berkualitas. Kami tidak hanya menerbitkan buku, tetapi juga berbagai jenis terbitan lainnya sesuai standar penerbitan nasional.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {types.map((t, i) => {
            const Icon = t.icon
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="group relative bg-cream rounded-xl border border-gold/20 px-4 py-5 transition-all duration-300 hover:shadow-lg hover:border-gold/40"
              >
                <div className="text-center">
                  <Icon className="w-6 h-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-sm font-semibold text-green-dark">{t.label}</h3>
                </div>
              </motion.div>
            )
          })}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: types.length * 0.03, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="group relative bg-gradient-to-br from-gold/5 to-gold/10 rounded-xl border border-gold/20 px-4 py-5 transition-all duration-300 hover:shadow-lg hover:border-gold/40 col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5"
          >
            <div className="text-center">
              <Sparkles className="w-5 h-5 text-gold mx-auto mb-1" />
              <h3 className="text-sm font-semibold text-green-dark">Dan berbagai jenis karya tulis lainnya.</h3>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-center text-green/70 text-sm leading-relaxed max-w-3xl mx-auto"
        >
          &ldquo;Setiap karya diproses dengan standar profesional mulai dari penyuntingan, layout, desain, administrasi penerbitan, hingga pendampingan proses ISBN sesuai ketentuan yang berlaku.&rdquo;
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
