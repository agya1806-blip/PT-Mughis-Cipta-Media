"use client"

import { useState, useEffect } from "react"

interface Reseller {
  id: number
  name: string
  email: string
  phone: string | null
  approvalStatus: string
  referralCode: string | null
  createdAt: string
  _count: { orders: number }
}

export default function AdminResellers() {
  const [resellers, setResellers] = useState<Reseller[]>([])
  const [filter, setFilter] = useState("pending")

  function load() {
    const params = new URLSearchParams()
    if (filter) params.set("status", filter)
    fetch(`/api/admin/resellers?${params}`)
      .then((r) => r.json())
      .then(setResellers)
      .catch(() => {})
  }

  useEffect(() => { load() }, [filter])

  async function updateStatus(userId: number, status: string) {
    try {
      const res = await fetch("/api/admin/resellers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, approvalStatus: status }),
      })
      if (res.ok) load()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Manajemen Reseller</h1>

      <div className="flex gap-2 mb-4">
        {["pending", "approved", "rejected", ""].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              filter === s ? "bg-amber-700 text-white border-amber-700" : "border-zinc-300 text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : "Semua"}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Nama</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Email</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Telepon</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Status</th>
              <th className="text-right px-4 py-3 font-medium text-zinc-600">Pesanan</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {resellers.map((r) => (
              <tr key={r.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-4 py-3 text-zinc-800">{r.name}</td>
                <td className="px-4 py-3 text-zinc-500">{r.email}</td>
                <td className="px-4 py-3 text-zinc-500">{r.phone || "-"}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      r.approvalStatus === "approved"
                        ? "bg-green-100 text-green-700"
                        : r.approvalStatus === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {r.approvalStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-zinc-600">{r._count.orders}</td>
                <td className="px-4 py-3 text-center">
                  {r.approvalStatus === "pending" && (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => updateStatus(r.id, "approved")}
                        className="text-xs px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => updateStatus(r.id, "rejected")}
                        className="text-xs px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Tolak
                      </button>
                    </div>
                  )}
                  {r.approvalStatus !== "pending" && (
                    <button
                      onClick={() => updateStatus(r.id, "pending")}
                      className="text-xs text-zinc-500 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
