"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"
import type { ManuscriptStatus } from "@/types/dashboard"
import { statusLabels } from "@/lib/dashboard/data"

const steps: ManuscriptStatus[] = ["draft", "submitted", "review", "editing", "layout", "printing", "published"]

interface Props {
  currentStatus: ManuscriptStatus
}

export default function ManuscriptTimeline({ currentStatus }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const currentIndex = steps.indexOf(currentStatus)

  return (
    <div className="bg-cream rounded-2xl border border-gold/20 p-6">
      <h3 className="text-sm font-semibold text-green-dark mb-5">Progress Naskah</h3>
      <div className="space-y-0">
        {steps.map((step, i) => {
          const completed = i <= currentIndex
          const isCurrent = i === currentIndex
          return (
            <motion.div
              key={step}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-3 pb-5 last:pb-0"
            >
              {i < steps.length - 1 && (
                <div className={`absolute left-[15px] top-7 bottom-0 w-0.5 ${completed ? "bg-gold/40" : "bg-gold/10"}`} />
              )}
              <div className="relative z-10 mt-0.5">
                {completed ? (
                  <CheckCircle2 className={`w-7 h-7 ${isCurrent ? "text-gold" : "text-gold/60"}`} />
                ) : (
                  <Circle className="w-7 h-7 text-green/30" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className={`text-sm font-medium ${completed ? "text-green-dark" : "text-green/60"}`}>
                  {statusLabels[step]}
                </p>
                {isCurrent && <p className="text-xs text-gold mt-0.5">Sedang dalam proses ini</p>}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
