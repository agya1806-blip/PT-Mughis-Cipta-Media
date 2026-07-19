"use client"

import { motion } from "framer-motion"
import { Building2, BookOpen, Printer, Globe, Target } from "lucide-react"

const milestones = [
  {
    year: "Awal Berdiri",
    title: "Didirikan",
    desc: "PT Mughis Cipta Media resmi didirikan sebagai perusahaan yang bergerak di bidang penerbitan dan media kreatif.",
    icon: Building2,
  },
  {
    year: "Tahap Awal",
    title: "Menjadi Penerbit",
    desc: "Perusahaan memulai operasional penerbitan dengan menerbitkan buku-buku pertama yang mendapatkan sambutan positif dari masyarakat.",
    icon: BookOpen,
  },
  {
    year: "Pengembangan",
    title: "Mengembangkan Percetakan",
    desc: "Mengembangkan divisi percetakan dengan investasi peralatan modern untuk meningkatkan kualitas dan kapasitas produksi.",
    icon: Printer,
  },
  {
    year: "Ekspansi",
    title: "Ekspansi Digital",
    desc: "Memperluas jangkauan melalui platform digital, media kreatif, dan pengembangan pasar online untuk menjangkau pembaca yang lebih luas.",
    icon: Globe,
  },
  {
    year: "Masa Depan",
    title: "Target Nasional",
    desc: "Terus berkembang menjadi penerbit nasional yang berkontribusi dalam meningkatkan literasi dan kualitas pendidikan Indonesia.",
    icon: Target,
  },
]

export default function Timeline() {
  return (
    <section className="relative py-24 lg:py-32 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-semibold text-sm tracking-widest uppercase">Perjalanan</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 mt-4">
            Timeline{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">
              Perusahaan
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold to-gold-dark hidden md:block" />

          <div className="space-y-12">
            {milestones.map(({ year, title, desc, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative md:pl-20"
              >
                <div className="absolute left-4 top-1 w-8 h-8 md:left-4 md:top-1 hidden md:flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-gold flex items-center justify-center z-10">
                    <Icon className="w-4 h-4 text-gold-dark" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-zinc-200 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                  <span className="inline-block text-xs font-semibold text-gold-dark bg-gold/10 px-3 py-1 rounded-full mb-3">
                    {year}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
