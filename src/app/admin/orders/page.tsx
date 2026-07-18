"use client"

import { useState, useEffect } from "react"

interface Order {
  id: number
  orderId: string
  customerName: string
  customerEmail: string
  total: string
  status: string
  shippingAwb: string | null
  createdAt: string
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Menunggu",
  PAID: "Dibayar",
  PROCESSING: "Diproses",
  SHIPPING: "Dikirim",
  DELIVERED: "Terkirim",
  CANCELLED: "Dibatalkan",
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [awbInput, setAwbInput] = useState("")

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), limit: "20" })
    if (statusFilter) params.set("status", statusFilter)
    fetch(`/api/admin/orders?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders)
        setTotal(data.total)
      })
      .catch(() => {})
  }, [page, statusFilter])

  async function updateOrder(orderId: number, data: Record<string, string>) {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const updated = await res.json()
        setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)))
        setEditingId(null)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Manajemen Pesanan</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => { setStatusFilter(""); setPage(1) }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
            !statusFilter ? "bg-amber-700 text-white border-amber-700" : "border-zinc-300 text-zinc-600 hover:bg-zinc-50"
          }`}
        >
          Semua
        </button>
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => { setStatusFilter(key); setPage(1) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              statusFilter === key ? "bg-amber-700 text-white border-amber-700" : "border-zinc-300 text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Order ID</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Pelanggan</th>
              <th className="text-right px-4 py-3 font-medium text-zinc-600">Total</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Status</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Resi</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-4 py-3 text-zinc-800 font-mono text-xs">{order.orderId}</td>
                <td className="px-4 py-3">
                  <p className="text-zinc-800">{order.customerName}</p>
                  <p className="text-xs text-zinc-400">{order.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-right text-zinc-800">
                  Rp {Number(order.total).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrder(order.id, { status: e.target.value })}
                    className="text-xs rounded border border-zinc-300 px-2 py-1"
                  >
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-center">
                  {editingId === order.id ? (
                    <div className="flex gap-1 items-center justify-center">
                      <input
                        type="text"
                        className="w-24 text-xs border border-zinc-300 rounded px-1 py-0.5"
                        value={awbInput}
                        onChange={(e) => setAwbInput(e.target.value)}
                      />
                      <button
                        onClick={() => updateOrder(order.id, { shippingAwb: awbInput })}
                        className="text-xs text-amber-700 hover:underline"
                      >
                        Simpan
                      </button>
                    </div>
                  ) : (
                    <span
                      className="cursor-pointer text-xs"
                      onClick={() => {
                        setEditingId(order.id)
                        setAwbInput(order.shippingAwb || "")
                      }}
                    >
                      {order.shippingAwb || "Input Resi"}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-xs text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
