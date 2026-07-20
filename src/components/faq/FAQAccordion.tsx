"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { FAQItem } from "./FAQData"

interface Props {
  items: FAQItem[]
  className?: string
}

export default function FAQAccordion({ items, className = "" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (items.length === 0) {
    return (
      <div className={`text-center py-12 text-green/60 ${className}`}>
        <p>Tidak ada hasil untuk pencarian Anda</p>
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="bg-cream rounded-xl border border-gold/20 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-cream transition-colors"
          >
            <span className="font-medium text-green-dark pr-4">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-gold shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
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
                <p className="px-5 pb-5 text-green/80 leading-relaxed border-t border-gold/10 pt-4">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
