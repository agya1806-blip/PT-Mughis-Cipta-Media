"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import SectionWrapper from "./SectionWrapper"
import SectionHeader from "./SectionHeader"

const testimonials = [
  { name: "Ahmad Fauzi", role: "Penulis", content: "Proses penerbitan sangat mudah dan cepat. Tim Mughis sangat profesional dalam mendampingi penulis pemula seperti saya. Hasil cetakan berkualitas premium.", rating: 5 },
  { name: "Dr. Siti Nurhaliza", role: "Dosen Universitas", content: "Kualitas cetakan sangat bagus dan tepat waktu. Saya sudah 3 kali menerbitkan buku di sini dan selalu puas dengan hasilnya. Highly recommended!", rating: 5 },
  { name: "M. Rizky Pratama", role: "Pimpinan Pesantren", content: "Layanan cetak modul dan buku ajar untuk pesantren kami sangat membantu. Harga bersahabat dengan kualitas terbaik. Proses cepat dan komunikatif.", rating: 5 },
  { name: "Rina Wulandari", role: "Guru SMA", content: "Self publishing di Mughis memberikan saya kebebasan penuh atas buku saya. Tim editing sangat membantu menyempurnakan naskah saya.", rating: 5 },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const next = () => setCurrent((p) => (p + 1) % testimonials.length)
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)
  const t = testimonials[current]

  return (
    <SectionWrapper muted>
      <SectionHeader
        badge="Testimonial"
        title="Apa Kata"
        accent="Mereka"
      />
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-cream rounded-2xl border border-gold/20 p-8 sm:p-12 shadow-xl">
          <div className="absolute -top-4 left-8 w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
            <Quote className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < t.rating ? "fill-gold text-gold" : "text-zinc-300 dark:text-zinc-600"}`} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg sm:text-xl text-zinc-600 leading-relaxed mb-8"
            >
              &ldquo;{t.content}&rdquo;
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-4 pt-6 border-t border-gold/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center">
              <span className="text-gold font-bold text-lg">{t.name[0]}</span>
            </div>
            <div>
              <p className="font-semibold text-green-dark">{t.name}</p>
              <p className="text-sm text-zinc-600">{t.role}</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button onClick={prev} className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center hover:bg-cream transition-colors">
                <ChevronLeft className="w-4 h-4 text-gold" />
              </button>
              <button onClick={next} className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center hover:bg-cream transition-colors">
                <ChevronRight className="w-4 h-4 text-gold" />
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-gold" : "bg-zinc-300 dark:bg-zinc-600"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
