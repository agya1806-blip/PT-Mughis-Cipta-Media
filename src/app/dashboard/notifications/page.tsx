"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { MessageSquare, Send, Settings, BookOpen } from "lucide-react"
import { mockNotifications } from "@/lib/dashboard/data"

const categoryIcons: Record<string, typeof Send> = {
  system: Send,
  editor: MessageSquare,
  publishing: BookOpen,
  general: Settings,
}

const categoryColors: Record<string, string> = {
  system: "bg-blue-50 text-blue-600 border-blue-200",
  editor: "bg-amber-50 text-amber-600 border-amber-200",
  publishing: "bg-green-50 text-green-600 border-green-200",
  general: "bg-zinc-50 text-zinc-600 border-zinc-200",
}

const categoryLabels: Record<string, string> = {
  system: "Sistem",
  editor: "Editor",
  publishing: "Penerbitan",
  general: "Umum",
}

const tabs = ["Semua", "Sistem", "Editor", "Penerbitan", "Umum"]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("Semua")
  const prefersReducedMotion = useReducedMotion()

  const filtered = activeTab === "Semua"
    ? mockNotifications
    : mockNotifications.filter((n) => categoryLabels[n.category] === activeTab)

  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Notifikasi</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{unreadCount} notifikasi belum dibaca</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-gold text-white shadow-sm"
                : "bg-white dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50 hover:border-gold/30 hover:text-zinc-900 dark:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((notification, i) => {
          const Icon = categoryIcons[notification.category]
          return (
            <motion.div
              key={notification.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className={`bg-white dark:bg-zinc-800/50 rounded-2xl border p-5 transition-all duration-200 hover:shadow-sm ${
                notification.read
                  ? "border-zinc-200 dark:border-zinc-700/50"
                  : "border-gold/30 dark:border-gold/20 bg-gradient-to-r from-gold/[0.02] to-transparent"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${categoryColors[notification.category]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{categoryLabels[notification.category]}</span>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mt-0.5">{notification.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!notification.read && <span className="w-2 h-2 rounded-full bg-gold" />}
                      <span className="text-[11px] text-zinc-400">{notification.createdAt}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{notification.message}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
