"use client"
import { motion } from "framer-motion"
import { MessageCircle, FileText, FileEdit, Palette, Printer, CheckCircle } from "lucide-react"
import SectionWrapper from "./SectionWrapper"
import SectionHeader from "./SectionHeader"

const steps = [
  { icon: MessageCircle, label: "Konsultasi", desc: "Diskusi kebutuhan dan rencana penerbitan" },
  { icon: FileText, label: "Naskah", desc: "Pengiriman dan review naskah" },
  { icon: FileEdit, label: "Editing", desc: "Penyuntingan substansi dan bahasa" },
  { icon: Palette, label: "Desain", desc: "Layout, cover, dan ilustrasi" },
  { icon: Printer, label: "Cetak", desc: "Produksi dengan kualitas terbaik" },
  { icon: CheckCircle, label: "Selesai", desc: "Buku siap distribusi dan terbit" },
]

export default function WorkProcessSection() {
  return (
    <SectionWrapper>
      <SectionHeader
        badge="Proses"
        title="Cara"
        accent="Kerja Kami"
        description="Proses yang transparan dan terstruktur dari awal hingga buku terbit"
      />
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gold/20 hidden sm:block" />
        <div className="space-y-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-start gap-6 pl-0 sm:pl-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cream border border-gold/20 flex items-center justify-center shadow-lg shrink-0"
              >
                <s.icon className="w-6 h-6 text-gold" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
              </motion.div>
              <div className="pt-3">
                <h3 className="font-semibold text-green-dark text-lg">{s.label}</h3>
                <p className="text-sm text-green/80 mt-1">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
