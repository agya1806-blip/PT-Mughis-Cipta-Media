"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import Link from "next/link"
import TextLogo from "@/components/TextLogo"

export default function StorySection() {
  return (
    <section className="relative py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-green-dark font-semibold text-sm tracking-widest uppercase">Tentang Kami</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-green-dark mt-4 mb-8 leading-tight">
              Cerita{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dark">
                Kami
              </span>
            </h2>

            <div className="space-y-5 text-green/80 leading-relaxed">
              <p className="text-lg">
                PT Mughis Cipta Media lahir dari keprihatinan terhadap minimnya akses terhadap buku-buku berkualitas di Indonesia. Berdiri sebagai perusahaan yang bergerak di bidang penerbitan dan media kreatif, kami bertekad untuk menjadi jembatan antara penulis dan pembaca, antara ilmu pengetahuan dan masyarakat.
              </p>
              <p className="text-lg">
                Dengan pengalaman bertahun-tahun di industri penerbitan, tim kami memahami bahwa setiap buku adalah mahakarya yang berharga. Kami hadir untuk membantu para penulis, akademisi, dan institusi mewujudkan karya terbaik mereka melalui proses penerbitan yang profesional, transparan, dan bermutu tinggi.
              </p>
            </div>

            <div className="relative mt-10 pl-6 border-l-4 border-gold">
              <Quote className="absolute -left-3 -top-2 w-6 h-6 text-green-dark bg-cream" />
              <p className="text-xl font-medium text-green-dark italic">
                Setiap buku adalah satu langkah menuju peradaban yang lebih cerah.
              </p>
              <p className="text-sm text-green/80 mt-2">— Founder PT Mughis Cipta Media</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <Link
                href="/tentang-kami"
                className="inline-flex items-center gap-2 text-sm font-medium text-green-dark hover:text-green transition-colors group"
              >
                Baca Cerita Lengkap
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold to-gold-dark opacity-90" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDI0YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

              <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                <div className="mb-6">
                  <TextLogo variant="inline" className="[&_span:last-child]:text-cream" />
                </div>
                <p className="text-white leading-relaxed">
                  Menghadirkan karya-karya berkualitas yang mencerahkan, menginspirasi, dan memberdayakan generasi bangsa.
                </p>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-white/40"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
