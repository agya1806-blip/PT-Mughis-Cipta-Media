"use client"

import { useEffect, useState } from "react"

interface CampaignData {
  campaign_name: string
  campaign_start_date: string
  campaign_end_date: string
  campaign_quota_total: string
  campaign_quota_registered: string
  campaign_active: string
}

export default function AdminCampaignPage() {
  const [data, setData] = useState<CampaignData>({
    campaign_name: "Program Apresiasi Penulis",
    campaign_start_date: "2026-07-26T00:00:00+07:00",
    campaign_end_date: "2026-08-04T23:59:00+07:00",
    campaign_quota_total: "50",
    campaign_quota_registered: "0",
    campaign_active: "true",
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/campaign")
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData((prev) => ({ ...prev, ...d })) })
      .catch(() => {})
  }, [])

  async function handleSave() {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/campaign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setMessage("Tersimpan!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage("Gagal menyimpan")
      }
    } catch {
      setMessage("Error")
    } finally {
      setSaving(false)
    }
  }

  const now = new Date()
  const start = new Date(data.campaign_start_date)
  const end = new Date(data.campaign_end_date)
  let statusLabel = "Belum Dimulai"
  if (now >= start && now <= end) statusLabel = "Sedang Berlangsung"
  else if (now > end) statusLabel = "Telah Ditutup"

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-dark mb-1">Pengaturan Campaign</h1>
      <p className="text-sm text-green/60 mb-6">
        Status: <span className="font-semibold text-gold">{statusLabel}</span>
      </p>

      <div className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-green/70 mb-1">Nama Program</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark placeholder-green/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
            value={data.campaign_name}
            onChange={(e) => setData({ ...data, campaign_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-green/70 mb-1">
            Tanggal Mulai (ISO 8601 + offset)
          </label>
          <input
            type="datetime-local"
            className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark focus:outline-none focus:ring-2 focus:ring-gold/50"
            value={data.campaign_start_date.slice(0, 16)}
            onChange={(e) =>
              setData({ ...data, campaign_start_date: e.target.value + ":00+07:00" })
            }
          />
          <p className="text-[11px] text-green/40 mt-0.5">Waktu: {data.campaign_start_date}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-green/70 mb-1">
            Tanggal Selesai (ISO 8601 + offset)
          </label>
          <input
            type="datetime-local"
            className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark focus:outline-none focus:ring-2 focus:ring-gold/50"
            value={data.campaign_end_date.slice(0, 16)}
            onChange={(e) =>
              setData({ ...data, campaign_end_date: e.target.value + ":00+07:00" })
            }
          />
          <p className="text-[11px] text-green/40 mt-0.5">Waktu: {data.campaign_end_date}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-green/70 mb-1">Kuota Total</label>
            <input
              type="number"
              min="0"
              className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={data.campaign_quota_total}
              onChange={(e) => setData({ ...data, campaign_quota_total: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green/70 mb-1">Telah Mendaftar</label>
            <input
              type="number"
              min="0"
              className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={data.campaign_quota_registered}
              onChange={(e) => setData({ ...data, campaign_quota_registered: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green/70 mb-1">Status Aktif</label>
          <select
            className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark focus:outline-none focus:ring-2 focus:ring-gold/50"
            value={data.campaign_active}
            onChange={(e) => setData({ ...data, campaign_active: e.target.value })}
          >
            <option value="true">Aktif</option>
            <option value="false">Nonaktif</option>
          </select>
          <p className="text-[11px] text-green/40 mt-0.5">
            Nonaktifkan untuk menutup pendaftaran secara manual (mengesampingkan jadwal)
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="h-11 px-6 rounded-xl bg-gold text-white font-medium hover:bg-gold-dark disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          {message && <span className="ml-3 text-sm text-green-600">{message}</span>}
        </div>
      </div>
    </div>
  )
}
