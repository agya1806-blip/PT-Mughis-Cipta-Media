"use client"
import { motion } from "framer-motion"
import SectionWrapper from "./SectionWrapper"

const types = [
  { icon: "📘", label: "Buku" },
  { icon: "📖", label: "Kitab" },
  { icon: "🌐", label: "Kitab Terjemahan" },
  { icon: "📚", label: "Terjemahan Buku" },
  { icon: "📝", label: "Modul" },
  { icon: "🎓", label: "Buku Ajar" },
  { icon: "📙", label: "Buku Referensi" },
  { icon: "📜", label: "Monograf" },
  { icon: "📄", label: "Prosiding" },
  { icon: "🖋️", label: "Antologi" },
  { icon: "📚", label: "Kumpulan Puisi" },
  { icon: "📕", label: "Kumpulan Cerpen" },
  { icon: "📗", label: "Novel" },
  { icon: "📒", label: "Pedoman" },
  { icon: "📔", label: "Panduan" },
  { icon: "📖", label: "Ensiklopedia" },
  { icon: "📘", label: "Kamus" },
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
          {types.map((t, i) => (
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
                <span className="text-2xl block mb-1.5 group-hover:scale-110 transition-transform duration-300">{t.icon}</span>
                <h3 className="text-sm font-semibold text-green-dark">{t.label}</h3>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: types.length * 0.03, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="group relative bg-gradient-to-br from-gold/5 to-gold/10 rounded-xl border border-gold/20 px-4 py-5 transition-all duration-300 hover:shadow-lg hover:border-gold/40 col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-5"
          >
            <div className="text-center">
              <span className="text-xl block mb-1">✨</span>
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
