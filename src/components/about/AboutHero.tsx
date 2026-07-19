"use client"

import { motion } from "framer-motion"
import { BookOpen, Printer, PenLine, Monitor } from "lucide-react"
import Link from "next/link"

const floatingIcons = [
  { Icon: BookOpen, delay: 0, x: "15%", y: "20%", size: 28 },
  { Icon: Printer, delay: 0.3, x: "80%", y: "15%", size: 32 },
  { Icon: PenLine, delay: 0.6, x: "10%", y: "65%", size: 24 },
  { Icon: Monitor, delay: 0.9, x: "85%", y: "70%", size: 30 },
]

export default function AboutHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(217,119,6,0.08),transparent_50%)]" />

      {floatingIcons.map(({ Icon, delay, x, y, size }) => (
        <motion.div
          key={Icon.name}
          className="absolute text-emerald-500/20"
          style={{ left: x, top: y }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PT Mughis Cipta Media
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Membangun Peradaban{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300">
                Melalui Buku dan Pengetahuan
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl"
            >
              PT Mughis Cipta Media merupakan perusahaan yang bergerak di bidang penerbitan, percetakan, distribusi buku, dan media kreatif yang berkomitmen menghadirkan karya berkualitas bagi dunia pendidikan, literasi, agama, dan pengembangan sumber daya manusia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/kontak"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-semibold rounded-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Hubungi Kami</span>
                <motion.span
                  className="relative z-10 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                href="/layanan-penerbitan"
                className="group inline-flex items-center gap-2 px-8 py-4 border border-zinc-600 hover:border-emerald-500/50 text-zinc-300 hover:text-white font-semibold rounded-2xl transition-all duration-300"
              >
                Lihat Layanan
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/20 rounded-3xl" />
              <div className="relative grid grid-cols-2 gap-4 p-4">
                {[
                  { label: "Penerbitan", icon: BookOpen, color: "from-emerald-500 to-emerald-600" },
                  { label: "Percetakan", icon: Printer, color: "from-amber-500 to-amber-600" },
                  { label: "Penulisan", icon: PenLine, color: "from-blue-500 to-blue-600" },
                  { label: "Digital", icon: Monitor, color: "from-violet-500 to-violet-600" },
                ].map(({ label, icon: Icon, color }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{label}</h3>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </section>
  )
}
