"use client"

import { motion } from "framer-motion"
import { Shield, Briefcase, Lightbulb, Star, Handshake, HeartHandshake } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Integritas",
    desc: "Kami menjunjung tinggi kejujuran, etika, dan tanggung jawab dalam setiap aspek bisnis. Kepercayaan adalah fondasi utama hubungan kami dengan penulis dan mitra.",
    gradient: "from-gold to-gold-dark",
  },
  {
    icon: Briefcase,
    title: "Profesionalisme",
    desc: "Tim kami bekerja dengan standar profesional tertinggi, memastikan setiap proyek ditangani dengan kompetensi, ketepatan, dan dedikasi penuh.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Lightbulb,
    title: "Inovasi",
    desc: "Kami terus berinovasi dalam teknologi penerbitan, desain, dan distribusi untuk menghadirkan solusi terbaik yang relevan dengan perkembangan zaman.",
    gradient: "from-gold to-gold-dark",
  },
  {
    icon: Star,
    title: "Kualitas",
    desc: "Tidak ada kompromi dalam kualitas. Setiap buku yang kami terbitkan melalui proses kurasi, editing, dan produksi yang ketat untuk hasil terbaik.",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: Handshake,
    title: "Kolaborasi",
    desc: "Kami percaya bahwa sinergi dengan penulis, penerbit lain, institusi, dan masyarakat adalah kunci untuk menciptakan dampak literasi yang lebih luas.",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    icon: HeartHandshake,
    title: "Pelayanan Terbaik",
    desc: "Kepuasan penulis dan mitra adalah prioritas kami. Kami memberikan pendampingan penuh, komunikasi terbuka, dan solusi yang sesuai kebutuhan.",
    gradient: "from-teal-500 to-teal-600",
  },
]

export default function CompanyValues() {
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
           <span className="text-green dark:text-gold font-semibold text-sm tracking-widest uppercase">Fundasi Perusahaan</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-green-dark dark:text-cream mt-4">
            Nilai{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">
              Perusahaan
            </span>
          </h2>
          <p className="text-green/80 mt-4 max-w-2xl mx-auto">
            Nilai-nilai yang menjadi fondasi setiap langkah dan keputusan kami dalam melayani penulis dan masyarakat.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, desc, gradient }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative h-full bg-cream rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-green-dark mb-3">{title}</h3>
                <p className="text-green/80 text-sm leading-relaxed">{desc}</p>

                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
