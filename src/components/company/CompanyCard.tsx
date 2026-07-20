"use client"

import { motion } from "framer-motion"
import { MOTION } from "@/config/design"
import type { LucideIcon } from "lucide-react"

interface Props {
  icon: LucideIcon
  title: string
  description: string
  index?: number
}

export default function CompanyCard({ icon: Icon, title, description, index = 0 }: Props) {
  return (
    <motion.div
      variants={MOTION.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <div className="relative h-full bg-cream rounded-2xl p-6 sm:p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
          <Icon className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-lg font-bold text-green-dark mb-3">{title}</h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{description}</p>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-dark rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  )
}
