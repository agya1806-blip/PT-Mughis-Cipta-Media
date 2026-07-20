"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BookOpen, Users, Building2, Award } from "lucide-react"
import { Counter } from "./Counter"

const stats = [
  { icon: BookOpen, value: 500, suffix: "+", label: "Judul Buku" },
  { icon: Users, value: 100, suffix: "+", label: "Penulis" },
  { icon: Building2, value: 20, suffix: "+", label: "Institusi" },
  { icon: Award, value: 100, suffix: "%", label: "Komitmen" },
]

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative -mt-20 z-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8 hover:shadow-xl hover:shadow-gold/5 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <s.icon className="w-5 h-5 text-gold mb-4" />
                <div className="text-3xl sm:text-4xl font-bold text-green-dark mb-1">
                  <Counter from={0} to={s.value} inView={inView} />
                  <span>{s.suffix}</span>
                </div>
                <p className="text-sm text-zinc-600">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
