"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { BookOpen, Users, Layers, Percent } from "lucide-react"

const stats = [
  { icon: Users, value: 100, suffix: "+", label: "Penulis" },
  { icon: Layers, value: 500, suffix: "+", label: "Proyek" },
  { icon: BookOpen, value: 1000, suffix: "+", label: "Buku" },
  { icon: Percent, value: 100, suffix: "%", label: "Komitmen" },
]

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Dampak{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
              Kami
            </span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Angka-angka ini adalah bukti komitmen kami dalam mengembangkan literasi di Indonesia.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <Counter target={value} suffix={suffix} />
                </div>
                <p className="text-zinc-400 text-sm">{label}</p>

                <div className="absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-500/50 to-amber-500/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
