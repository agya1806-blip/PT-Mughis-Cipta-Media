"use client"

import { useEffect, useState } from "react"

const SETTING_FIELDS = [
  { key: "site_name", label: "Nama Toko" },
  { key: "contact_phone", label: "No. WhatsApp" },
  { key: "contact_email", label: "Email" },
  { key: "address", label: "Alamat" },
  { key: "instagram_url", label: "URL Instagram" },
  { key: "facebook_url", label: "URL Facebook" },
  { key: "legal_nib", label: "NIB" },
  { key: "legal_nib_date", label: "Tanggal Terbit NIB" },
  { key: "legal_nib_status", label: "Status NIB" },
  { key: "legal_akta", label: "Akta Pendirian" },
  { key: "legal_akta_date", label: "Tanggal Akta" },
  { key: "legal_npwp", label: "NPWP Perusahaan" },
  { key: "legal_npwp_date", label: "Tanggal NPWP" },
  { key: "legal_sku", label: "SKU" },
  { key: "legal_sku_date", label: "Tanggal SKU" },
  { key: "legal_ikapi", label: "Sertifikat IKAPI" },
  { key: "legal_ikapi_date", label: "Tanggal IKAPI" },
]

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => {})
  }, [])

  async function handleSave() {
    setSaving(true)
    setMessage("")
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-dark mb-6">Pengaturan</h1>
      <div className="max-w-lg space-y-4">
        {SETTING_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-green/70 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark placeholder-green/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={settings[field.key] || ""}
              onChange={(e) =>
                setSettings({ ...settings, [field.key]: e.target.value })
              }
            />
          </div>
        ))}
        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="h-11 px-6 rounded-xl bg-gold text-white font-medium hover:bg-gold-dark disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          {message && (
            <span className="ml-3 text-sm text-green-600">{message}</span>
          )}
        </div>
      </div>
    </div>
  )
}
