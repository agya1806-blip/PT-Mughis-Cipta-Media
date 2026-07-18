"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode
  className?: string
  y?: number
  scale?: number
  duration?: number
}

export default function HoverWrapper({
  children,
  className = "",
  y = -2,
  scale = 1.01,
  duration = 0.3,
}: Props) {
  return (
    <motion.div
      whileHover={{ y, scale }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
