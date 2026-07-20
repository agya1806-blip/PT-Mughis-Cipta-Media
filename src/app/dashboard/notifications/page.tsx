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
  system: "bg-green/10 text-green-dark border-gold/20",
  editor: "bg-gold/10 text-gold-dark border-gold/20",
  publishing: "bg-gold/10 text-green-dark border-gold/20",
  general: "bg-cream text-green/70 border-gold/20",
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
          <h1 className="text-2xl font-bold text-green-dark dark:text-cream">Notifikasi</h1>
          <p className="text-sm text-green/70 dark:text-gold/80 mt-1">{unreadCount} notifikasi belum dibaca</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-gold text-green-dark shadow-sm"
                : "bg-cream dark:bg-green-dark/80 text-green/70 dark:text-gold/80 border border-gold/20 dark:border-gold/10 hover:border-gold/30 hover:text-green-dark dark:hover:text-cream"
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
              className={`bg-cream dark:bg-green-dark/80 rounded-2xl border p-5 transition-all duration-200 hover:shadow-sm ${
                notification.read
                  ? "border-gold/20 dark:border-gold/10"
                  : "border-gold/30 dark:border-gold/20 bg-gradient-to-r from-gold/[0.05] to-transparent"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${categoryColors[notification.category]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-xs font-medium text-green/60 dark:text-gold/70 uppercase tracking-wider">{categoryLabels[notification.category]}</span>
                      <h4 className="text-sm font-semibold text-green-dark dark:text-cream mt-0.5">{notification.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!notification.read && <span className="w-2 h-2 rounded-full bg-gold" />}
                      <span className="text-[11px] text-green/60 dark:text-gold/70">{notification.createdAt}</span>
                    </div>
                  </div>
                  <p className="text-sm text-green/70 dark:text-gold/80 leading-relaxed">{notification.message}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
