"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function ServiceProcess({ process }: { process: { label: string; desc: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-16"
    >
      <h3 className="text-xl font-bold text-zinc-800 mb-8 text-center">Alur Proses</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {process.map((step, i) => (
          <div key={step.label} className="relative flex flex-col items-center text-center p-5 bg-white rounded-xl border border-zinc-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm mb-3">
              {i + 1}
            </div>
            <h4 className="font-semibold text-zinc-800 text-sm mb-1">{step.label}</h4>
            <p className="text-xs text-zinc-500">{step.desc}</p>
            {i < process.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-[2px] bg-gold/30" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
