"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ahmad Fauzi",
    role: "Penulis Buku \"Pendidikan Karakter\"",
    content: "Proses penerbitan sangat mudah dan cepat. Tim Mughis sangat profesional dalam mendampingi penulis pemula seperti saya.",
    rating: 5,
  },
  {
    name: "Dr. Siti Nurhaliza",
    role: "Dosen Universitas Negeri Malang",
    content: "Kualitas cetakan sangat bagus dan tepat waktu. Saya sudah 3 kali menerbitkan buku di sini dan selalu puas.",
    rating: 5,
  },
  {
    name: "M. Rizky Pratama",
    role: "Owner Pesantren Modern",
    content: "Layanan cetak modul dan buku ajar untuk pesantren kami sangat membantu. Harga bersahabat dengan kualitas terbaik.",
    rating: 5,
  },
  {
    name: "Rina Wulandari",
    role: "Guru SMA Negeri 5 Surabaya",
    content: "Self publishing di Mughis memberikan saya kebebasan penuh atas buku saya. Sangat direkomendasikan!",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Testimoni dari para penulis dan mitra yang telah bekerja sama dengan kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < t.rating ? "text-amber-400 fill-amber-400" : "text-zinc-600"}`}
                  />
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="border-t border-white/10 pt-3">
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-zinc-500 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
