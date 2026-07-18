"use client"

import { useEffect, useState } from "react"

const SETTING_FIELDS = [
  { key: "site_name", label: "Nama Toko" },
  { key: "contact_phone", label: "No. WhatsApp" },
  { key: "contact_email", label: "Email" },
  { key: "address", label: "Alamat" },
  { key: "instagram_url", label: "URL Instagram" },
  { key: "facebook_url", label: "URL Facebook" },
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
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Pengaturan</h1>
      <div className="max-w-lg space-y-4">
        {SETTING_FIELDS.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-zinc-600 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            className="h-11 px-6 rounded-xl bg-amber-700 text-white font-medium hover:bg-amber-800 disabled:opacity-50"
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
