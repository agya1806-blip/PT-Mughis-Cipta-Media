"use client"

import { motion } from "framer-motion"
import { Eye, Target, CheckCircle } from "lucide-react"

const missions = [
  "Menerbitkan buku-buku berkualitas tinggi yang mencerahkan masyarakat",
  "Memberikan layanan penerbitan yang profesional, transparan, dan terpercaya",
  "Mendukung dan memberdayakan penulis Indonesia dari berbagai latar belakang",
  "Mengembangkan ekosistem literasi yang inklusif dan berkelanjutan",
  "Memanfaatkan teknologi digital untuk memperluas jangkauan literasi",
  "Menjalin kerja sama strategis dengan berbagai institusi pendidikan dan budaya",
]

export default function VisionMission() {
  return (
    <section className="relative py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm tracking-widest uppercase">Arah & Tujuan</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-green-dark mt-4">
            Visi &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">
              Misi
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="relative h-full bg-cream rounded-3xl p-8 lg:p-10 border border-gold/20 hover:border-gold/40 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-dark mb-4">Visi</h3>
                <p className="text-zinc-600 leading-relaxed text-lg">
                  Menjadi perusahaan penerbitan dan media kreatif yang terpercaya, inovatif, serta berkontribusi dalam membangun peradaban melalui ilmu pengetahuan, pendidikan, dan literasi.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-dark rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group"
          >
            <div className="relative h-full bg-cream rounded-3xl p-8 lg:p-10 border border-gold/20 hover:border-gold/40 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-3xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-dark mb-6">Misi</h3>
                <ul className="space-y-4">
                  {missions.map((m, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <span className="text-zinc-600">{m}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-dark rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
