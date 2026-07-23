"use client"

import { useState, useEffect } from "react"

interface DashboardData {
  totalBooks: number
  activeResellers: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((d) => { if (d && typeof d === "object" && !d.error) setData(d) })
      .catch(() => {})
  }, [])

  if (!data) {
    return <div className="text-green/70">Memuat...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-dark mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <MetricCard title="Total Buku" value={data.totalBooks} />
        <MetricCard title="Reseller Aktif" value={data.activeResellers} />
        <MetricCard title="Pesan Belum Dibaca" value={data.unreadMessages} color="gold" />
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  color = "zinc",
}: {
  title: string
  value: string | number
  color?: string
}) {
  const colors: Record<string, string> = {
    zinc: "bg-gold/5 border-gold/20 text-green-dark",
    gold: "bg-gold/5 border-gold/20 text-gold-dark",
    green: "bg-green-50 border-green-200 text-green-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
  }

  return (
    <div className={`rounded-xl border p-4 ${colors[color] || colors.zinc}`}>
      <p className="text-sm font-medium opacity-70">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  )
}
