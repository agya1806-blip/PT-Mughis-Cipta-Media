"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import FormSection from "@/components/admin/FormSection"
import { TeamRole, TeamMemberStatus } from "@/lib/team/types"
import { TeamPhotoUpload } from "@/components/team/TeamPhotoUpload"

const ROLE_OPTIONS = [
  { value: "FOUNDER", label: "Founder" },
  { value: "GENERAL_MANAGER", label: "General Manager" },
  { value: "HEAD_OF_DIVISION", label: "Ketua Divisi" },
]

const DIVISION_OPTIONS = [
  { value: "executive", label: "Eksekutif" },
  { value: "administration", label: "Administrasi & Keuangan" },
  { value: "editorial", label: "Editorial & Produksi" },
  { value: "technology", label: "Teknologi Informasi & Layanan Digital" },
]

export default function EditTeamMember() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState({
    name: "",
    position: "",
    division: "",
    role: "HEAD_OF_DIVISION" as TeamRole,
    bio: "",
    photo: "",
    email: "",
    password: "",
    whatsapp: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    website: "",
    skills: "",
    quote: "",
    status: "ACTIVE" as TeamMemberStatus,
    displayOrder: "0",
  })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/team/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setForm({
          name: data.name || "",
          position: data.position || "",
          division: data.division || "",
          role: data.role || "HEAD_OF_DIVISION",
          bio: data.bio || "",
          photo: data.photo || "",
          email: data.email || "",
          password: "",
          whatsapp: data.whatsapp || "",
          linkedin: data.linkedin || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          website: data.website || "",
          skills: data.skills || "",
          quote: data.quote || "",
          status: data.status || "ACTIVE",
          displayOrder: String(data.displayOrder || 0),
        })
      })
      .catch(() => alert("Gagal memuat data"))
      .finally(() => setLoading(false))
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const body: Record<string, unknown> = {
        name: form.name,
        position: form.position,
        division: form.division,
        role: form.role,
        bio: form.bio,
        photo: form.photo || null,
        email: form.email,
        whatsapp: form.whatsapp || null,
        linkedin: form.linkedin || null,
        facebook: form.facebook || null,
        instagram: form.instagram || null,
        website: form.website || null,
        skills: form.skills || null,
        quote: form.quote || null,
        status: form.status,
        displayOrder: parseInt(form.displayOrder) || 0,
      }
      if (form.password) body.password = form.password

      const res = await fetch(`/api/admin/team/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Gagal menyimpan")
      }
      router.push("/admin/team")
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menyimpan")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-green-dark/80">Memuat...</p>
      </div>
    )
  }

  const inputClass =
    "w-full rounded-lg border border-gold/20 bg-cream px-3 py-2.5 text-sm text-green-dark placeholder-green-dark/80 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">Edit Anggota Tim</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-green-dark/80 hover:text-green-dark"
        >
          Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Data Anggota" description="Informasi dasar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-green-dark mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Jabatan
              </label>
              <input
                type="text"
                required
                className={inputClass}
                value={form.position}
                onChange={(e) =>
                  setForm({ ...form, position: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Divisi
              </label>
              <select
                required
                className={inputClass}
                value={form.division}
                onChange={(e) => setForm({ ...form, division: e.target.value })}
              >
                {DIVISION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Role
              </label>
              <select
                required
                className={inputClass}
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as TeamRole })}
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Urutan Tampil
              </label>
              <input
                type="number"
                className={inputClass}
                value={form.displayOrder}
                onChange={(e) =>
                  setForm({ ...form, displayOrder: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Status
              </label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as TeamMemberStatus,
                  })
                }
              >
                <option value="ACTIVE">Aktif</option>
                <option value="INACTIVE">Nonaktif</option>
              </select>
            </div>
          </div>
        </FormSection>

        <FormSection title="Akun Login" description="Email dan password">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Password Baru
              </label>
              <input
                type="password"
                className={inputClass}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Kosongkan jika tidak diubah"
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="Kontak" description="Informasi kontak publik">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                LinkedIn URL
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.instagram}
                onChange={(e) =>
                  setForm({ ...form, instagram: e.target.value })
                }
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
                className={inputClass}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div>
              <TeamPhotoUpload
                value={form.photo}
                onChange={(val) => setForm({ ...form, photo: val })}
                label="Foto Profil"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Skills (pisahkan dengan koma)
              </label>
              <input
                type="text"
                className={inputClass}
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
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
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
              />
            </div>
          </div>
        </FormSection>

        <div className="flex gap-3 pt-2 pb-8">
          <button
            type="submit"
            disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-green-dark font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all"
          >
            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="h-12 px-6 rounded-xl border border-zinc-300 text-green-dark/80 font-medium hover:bg-zinc-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
