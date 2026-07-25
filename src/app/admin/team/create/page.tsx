"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import FormSection from "@/components/admin/FormSection"
import { validateTeamForm } from "@/lib/team/validation"
import { TeamFormErrors } from "@/lib/team/types"

const ROLE_OPTIONS = [
  { value: "HEAD_OF_DIVISION", label: "Ketua Divisi" },
  { value: "GENERAL_MANAGER", label: "General Manager" },
]

const DIVISION_OPTIONS = [
  { value: "administration", label: "Administrasi & Keuangan" },
  { value: "editorial", label: "Editorial & Produksi" },
  { value: "technology", label: "Teknologi Informasi & Layanan Digital" },
]

export default function CreateTeamMember() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    position: "",
    division: "",
    role: "HEAD_OF_DIVISION",
    bio: "",
    email: "",
    password: "",
    whatsapp: "",
    skills: "",
    quote: "",
  })
  const [errors, setErrors] = useState<TeamFormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateTeamForm(form, true)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Gagal menambah anggota")
      }
      router.push("/admin/team")
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menambah anggota")
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gold/20 bg-cream px-3 py-2.5 text-sm text-green-dark placeholder-green/60 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">
          Tambah Anggota Tim
        </h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-green/70 hover:text-green-dark"
        >
          Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Data Anggota" description="Informasi dasar anggota tim">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-green-dark mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                className={errors.name ? `${inputClass} border-red-300` : inputClass}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Jabatan
              </label>
              <input
                type="text"
                required
                className={errors.position ? `${inputClass} border-red-300` : inputClass}
                value={form.position}
                onChange={(e) => update("position", e.target.value)}
                placeholder="Contoh: Head of ..."
              />
              {errors.position && (
                <p className="text-xs text-red-500 mt-1">{errors.position}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Divisi
              </label>
              <select
                required
                className={errors.division ? `${inputClass} border-red-300` : inputClass}
                value={form.division}
                onChange={(e) => update("division", e.target.value)}
              >
                <option value="">Pilih Divisi</option>
                {DIVISION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="text-xs text-red-500 mt-1">{errors.division}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Role
              </label>
              <select
                required
                className={inputClass}
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </FormSection>

        <FormSection title="Akun Login" description="Email dan password untuk login">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className={errors.email ? `${inputClass} border-red-300` : inputClass}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className={errors.password ? `${inputClass} border-red-300` : inputClass}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
          </div>
        </FormSection>

        <FormSection title="Kontak" description="Informasi kontak yang ditampilkan">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.whatsapp}
                onChange={(e) => update("whatsapp", e.target.value)}
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Profil" description="Bio, skills, dan quote">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Bio
              </label>
              <textarea
                rows={3}
                className={
                  errors.bio ? `${inputClass} border-red-300` : inputClass
                }
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
              />
              {errors.bio && (
                <p className="text-xs text-red-500 mt-1">{errors.bio}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Skills (pisahkan dengan koma)
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.skills}
                onChange={(e) => update("skills", e.target.value)}
                placeholder="Kepemimpinan, Strategi, Inovasi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Quote
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.quote}
                onChange={(e) => update("quote", e.target.value)}
                placeholder="Quote profesional..."
              />
            </div>
          </div>
        </FormSection>

        <div className="flex gap-3 pt-2 pb-8">
          <button
            type="submit"
            disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all"
          >
            {submitting ? "Menyimpan..." : "Simpan Anggota"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="h-12 px-6 rounded-xl border border-zinc-300 text-zinc-600 font-medium hover:bg-zinc-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
