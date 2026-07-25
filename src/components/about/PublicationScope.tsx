"use client"

import { motion } from "framer-motion"

const items = [
  "Buku",
  "Kitab",
  "Kitab Terjemahan",
  "Terjemahan Buku",
  "Modul",
  "Buku Ajar",
  "Buku Referensi",
  "Monograf",
  "Prosiding",
  "Antologi",
  "Novel",
  "Kumpulan Puisi",
  "Kumpulan Cerpen",
  "Pedoman",
  "Panduan",
  "Ensiklopedia",
  "Kamus",
]

export default function PublicationScope() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-green font-semibold text-sm tracking-widest uppercase">Jangkauan Penerbitan</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-green-dark mt-4">
            Ruang Lingkup{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">
              Penerbitan
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <p className="text-green-dark/80 leading-relaxed text-lg">
            PT Mughis Cipta Media hadir sebagai perusahaan penerbit yang melayani penerbitan berbagai jenis karya tulis. Kami berkomitmen menjadi mitra bagi penulis, akademisi, pendidik, ulama, peneliti, maupun masyarakat umum dalam mewujudkan karya yang berkualitas dan bermanfaat.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="group relative bg-cream rounded-xl border border-gold/20 px-4 py-3.5 transition-all duration-300 hover:shadow-md hover:border-gold/40"
            >
              <p className="text-sm font-medium text-green-dark text-center">{item}</p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: items.length * 0.03, duration: 0.4 }}
            className="col-span-2 sm:col-span-3 lg:col-span-4 bg-gradient-to-br from-gold/5 to-gold/10 rounded-xl border border-gold/20 px-4 py-3.5 transition-all duration-300 hover:shadow-md hover:border-gold/40"
          >
            <p className="text-sm font-semibold text-green-dark text-center">Dan berbagai jenis karya tulis lainnya.</p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center text-green-dark/80 text-sm leading-relaxed max-w-3xl mx-auto"
        >
          &ldquo;Dengan dukungan tim yang profesional, PT Mughis Cipta Media berupaya menghadirkan layanan penerbitan yang terpercaya, berkualitas, serta sesuai dengan standar administrasi penerbitan di Indonesia.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
