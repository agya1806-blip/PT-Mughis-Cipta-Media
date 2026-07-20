"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ServiceFAQ({ faq }: { faq: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <h3 className="text-xl font-bold text-green-dark mb-6 text-center">FAQ</h3>
      <div className="space-y-3">
        {faq.map((item, i) => (
          <div key={i} className="rounded-xl border border-gold/20 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-green-dark hover:bg-cream transition-colors"
            >
              {item.q}
              <ChevronDown className={`w-4 h-4 text-gold transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-green/80 leading-relaxed dark:text-cream">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
