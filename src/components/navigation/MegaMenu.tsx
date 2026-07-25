"use client"

import Link from "next/link"
import { BookOpen, Printer, FileCheck, MessageCircle, ArrowRight } from "lucide-react"
import type { MegaMenuItem } from "@/config/navigation"

interface Props {
  items: MegaMenuItem[]
  isOpen: boolean
  onKeepOpen: () => void
  onStartClose: () => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Penerbitan Buku": BookOpen,
  "Percetakan Buku": Printer,
  "Legalitas Buku": FileCheck,
  "Konsultasi": MessageCircle,
}

export default function MegaMenu({ items, isOpen, onKeepOpen, onStartClose }: Props) {
  if (!isOpen) return null

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[580px]"
      onMouseEnter={onKeepOpen}
      onMouseLeave={onStartClose}
    >
      <div className="bg-cream/95 dark:bg-green-dark/95 backdrop-blur-2xl border border-gold/20 dark:border-gold/10 rounded-2xl shadow-2xl p-5">
        <div className="grid grid-cols-1 gap-2">
          {items.map((item) => {
            const Icon = iconMap[item.label] || BookOpen
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 p-3.5 rounded-xl hover:bg-gold/10 dark:hover:bg-cream/5 transition-all duration-250"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 dark:bg-cream/5 flex items-center justify-center shrink-0 group-hover:bg-gold/20 dark:group-hover:bg-cream/10 transition-colors duration-250">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-green-dark dark:text-cream group-hover:text-green dark:group-hover:text-gold transition-colors duration-250">
                      {item.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-green/30 dark:text-cream/30 group-hover:text-gold translate-x-0 group-hover:translate-x-1 transition-all duration-250" />
                  </div>
                  <p className="text-xs text-green/70 dark:text-cream/70 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
