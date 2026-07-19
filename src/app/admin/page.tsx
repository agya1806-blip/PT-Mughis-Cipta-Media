"use client"

import { useState, useEffect } from "react"

interface DashboardData {
  totalBooks: number
  totalOrders: number
  pendingOrders: number
  paidOrders: number
  activeResellers: number
  todayOrders: number
  monthSales: number
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  if (!data) {
    return <div className="text-zinc-500">Memuat...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Buku" value={data.totalBooks} />
        <MetricCard title="Total Pesanan" value={data.totalOrders} />
        <MetricCard title="Pesanan Baru" value={data.pendingOrders} color="gold" />
        <MetricCard title="Pesanan Dibayar" value={data.paidOrders} color="green" />
        <MetricCard title="Reseller Aktif" value={data.activeResellers} />
        <MetricCard title="Pesanan Hari Ini" value={data.todayOrders} color="blue" />
        <MetricCard title="Penjualan Bulan Ini" value={`Rp ${data.monthSales.toLocaleString("id-ID")}`} color="green" />
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
    zinc: "bg-zinc-50 border-zinc-200 text-zinc-800",
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
