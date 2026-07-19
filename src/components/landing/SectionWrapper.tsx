"use client"

import { forwardRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode
  className?: string
  muted?: boolean
  id?: string
}

const SectionWrapper = forwardRef<HTMLDivElement, Props>(function SectionWrapper(
  { children, className = "", muted = false, id },
  ref
) {
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-24 sm:py-32 overflow-hidden ${
        muted ? "bg-zinc-50 dark:bg-zinc-900/50" : ""
      } ${className}`}
    >
      <div className="container">{children}</div>
    </motion.section>
  )
})

export default SectionWrapper
