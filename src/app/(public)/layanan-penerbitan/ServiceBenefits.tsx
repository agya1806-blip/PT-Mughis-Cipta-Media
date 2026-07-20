"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function ServiceBenefits({ benefits }: { benefits: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <h3 className="text-xl font-bold text-zinc-800 mb-6 text-center">Keunggulan</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {benefits.map((b) => (
          <div key={b} className="flex items-start gap-3 p-4 rounded-xl bg-gold/[0.03] border border-gold/10">
            <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <span className="text-sm text-zinc-700">{b}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
