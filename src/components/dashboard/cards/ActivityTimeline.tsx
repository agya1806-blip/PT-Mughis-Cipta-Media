"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { Clock, FileEdit, MessageSquare, Send } from "lucide-react"
import type { Activity } from "@/types/dashboard"

interface Props {
  activities: Activity[]
}

const iconMap: Record<string, typeof Send> = {
  system: Send,
  editor: MessageSquare,
  publishing: Clock,
  general: FileEdit,
}

const colorMap: Record<string, string> = {
  system: "bg-gold/10 text-green-dark border-gold/20",
  editor: "bg-gold/5 text-gold border-gold/20",
  publishing: "bg-green/10 text-green-dark border-gold/20",
  general: "bg-cream text-green/70 border-gold/20",
}

export default function ActivityTimeline({ activities }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="bg-cream dark:bg-green-dark/80 rounded-2xl border border-gold/20 dark:border-gold/10 p-6">
      <h3 className="text-sm font-semibold text-green-dark dark:text-cream mb-5 flex items-center gap-2">
        <FileEdit className="w-4 h-4 text-gold" />
        Aktivitas Terbaru
      </h3>
      <div className="space-y-0">
        {activities.map((activity, i) => {
          const Icon = iconMap[activity.type]
          return (
            <motion.div
              key={activity.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              {i < activities.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gold/20 dark:bg-gold/10" />
              )}
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[activity.type]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm font-medium text-green-dark dark:text-cream">{activity.action}</p>
                <p className="text-xs text-green/70 dark:text-gold/80 mt-0.5 line-clamp-2">{activity.description}</p>
                <p className="text-[11px] text-green/60 dark:text-gold/70 mt-1">{activity.timestamp}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
