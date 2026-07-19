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
  system: "bg-blue-50 text-blue-600 border-blue-200",
  editor: "bg-gold/5 text-gold border-gold/20",
  publishing: "bg-green-50 text-green-600 border-green-200",
  general: "bg-zinc-50 text-zinc-600 border-zinc-200",
}

export default function ActivityTimeline({ activities }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="bg-white dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700/50 p-6">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-5 flex items-center gap-2">
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
                <div className="absolute left-[19px] top-10 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700" />
              )}
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[activity.type]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{activity.action}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">{activity.description}</p>
                <p className="text-[11px] text-zinc-400 mt-1">{activity.timestamp}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
