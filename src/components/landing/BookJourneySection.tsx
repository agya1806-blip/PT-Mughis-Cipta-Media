"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Lightbulb, FileEdit, Search, Layout, Palette, Hash, Printer, Truck, Heart } from "lucide-react"

const steps = [
  { icon: Lightbulb, label: "Ide Penulis" },
  { icon: FileEdit, label: "Editing" },
  { icon: Search, label: "Proofreading" },
  { icon: Layout, label: "Layout" },
  { icon: Palette, label: "Cover Design" },
  { icon: Hash, label: "ISBN" },
  { icon: Printer, label: "Printing" },
  { icon: Truck, label: "Distribution" },
  { icon: Heart, label: "Reader" },
]

export default function BookJourneySection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold text-xs font-medium uppercase tracking-wider">Book Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white">
            Perjalanan{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
              Sebuah Buku
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Dari ide penulis hingga sampai ke tangan pembaca — setiap tahap kami tangani dengan standar kualitas tertinggi
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 hidden lg:block" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute left-0 top-1/2 h-0.5 bg-gradient-to-r from-gold via-gold-light to-gold -translate-y-1/2 hidden lg:block"
          />

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-4 lg:gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="hidden lg:block absolute top-1/2 left-1/2 w-full h-0.5 -translate-y-1/2 bg-transparent" />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                  className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-lg hover:shadow-gold/10 hover:border-gold/30 transition-all duration-300 group cursor-default"
                >
                  <step.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent"
                  />
                </motion.div>
                <p className="mt-3 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {step.label}
                </p>
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="lg:hidden w-0.5 h-6 bg-gradient-to-b from-gold/50 to-transparent mx-auto mt-1"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
