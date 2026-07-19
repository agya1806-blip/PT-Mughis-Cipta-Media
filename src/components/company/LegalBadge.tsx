"use client"

import { CheckCircle, Shield } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Props {
  icon?: LucideIcon
  title: string
  subtitle?: string
  status?: "active" | "verified"
  className?: string
}

export default function LegalBadge({
  icon: Icon = Shield,
  title,
  subtitle,
  status = "active",
  className = "",
}: Props) {
  const statusColor =
    status === "verified"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      : "bg-gold/10 text-gold border-gold/20"

  const statusLabel = status === "verified" ? "Terverifikasi" : "Aktif"

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-semibold uppercase tracking-[0.08em] ${statusColor} ${className}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{title}</span>
      <span className="w-1 h-1 rounded-full bg-current opacity-40" />
      <span className="flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        {statusLabel}
      </span>
    </div>
  )
}
