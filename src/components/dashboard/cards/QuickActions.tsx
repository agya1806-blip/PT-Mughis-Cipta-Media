"use client"

import Link from "next/link"
import { FilePlus, FileText, MessageSquare, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"

const actions = [
  { href: "/dashboard/manuscripts/new", label: "Naskah Baru", icon: FilePlus, desc: "Ajukan naskah baru" },
  { href: "/dashboard/manuscripts", label: "Lihat Naskah", icon: FileText, desc: "Kelola semua naskah" },
  { href: "/dashboard/notifications", label: "Pesan Editor", icon: MessageSquare, desc: "Lihat catatan editor" },
  { href: "/dashboard/settings", label: "Bantuan", icon: HelpCircle, desc: "Pengaturan & bantuan" },
]

export default function QuickActions() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="bg-cream dark:bg-green-dark/80 rounded-2xl border border-gold/20 dark:border-gold/10 p-6">
      <h3 className="text-sm font-semibold text-green-dark dark:text-cream mb-4">Aksi Cepat</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <motion.div
            key={action.href}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gold/20 dark:border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition-all duration-200 group text-center"
            >
              <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <action.icon className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-dark dark:text-cream">{action.label}</p>
                <p className="text-[10px] text-green/60 dark:text-gold/70 mt-0.5">{action.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
