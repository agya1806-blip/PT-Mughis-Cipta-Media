"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Counter } from "@/components/landing/Counter"
import IconWrapper from "./IconWrapper"
import type { ReactNode } from "react"

interface MetricCardProps {
  icon: ReactNode
  value: number
  suffix?: string
  title: string
  description: string
  index?: number
}

export default function MetricCard({
  icon,
  value,
  suffix = "",
  title,
  description,
  index = 0,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={prefersReducedMotion ? {} : { y: -4 }}
      className="group relative bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8 hover:shadow-xl hover:shadow-gold/5 transition-shadow duration-500"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative">
        <IconWrapper size="lg" variant="gold">
          {icon}
        </IconWrapper>
        <div className="mt-4 text-3xl sm:text-4xl font-bold text-green-dark">
          <Counter from={0} to={value} inView={inView} />
          {suffix && <span className="text-gold">{suffix}</span>}
        </div>
        <h3 className="mt-2 font-semibold text-green-dark">{title}</h3>
        <p className="mt-1 text-sm text-green/80 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
