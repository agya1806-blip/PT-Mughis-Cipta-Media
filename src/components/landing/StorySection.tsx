"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 sm:py-32 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.1),transparent_60%)]" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/20 dark:from-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-gold">M</span>
                  </div>
                  <p className="text-zinc-400 dark:text-zinc-500 text-sm">Est. 2020</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border border-gold/20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-gold">5+</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Tahun</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Quote className="w-3.5 h-3.5 text-gold" />
              <span className="text-gold text-xs font-medium uppercase tracking-wider">Tentang Kami</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white leading-[1.15] tracking-tight">
              Kami Percaya Bahwa Buku{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                Mengubah Peradaban
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <p>
                Berawal dari kecintaan terhadap literasi dan keyakinan bahwa setiap ide layak
                untuk diabadikan dalam bentuk buku, PT Mughis Cipta Media hadir sebagai mitra
                terpercaya bagi para penulis, institusi, dan organisasi di Indonesia.
              </p>
              <p>
                Kami tidak sekadar menerbitkan buku. Kami membangun jembatan antara penulis
                dan pembaca, antara ide dan karya nyata, antara mimpi dan kenyataan.
              </p>
              <p>
                Dengan standar kualitas tinggi, proses profesional, dan sentuhan personal,
                kami telah membantu ratusan penulis mewujudkan buku impian mereka.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              {["Terpercaya", "Profesional", "Berkualitas"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
