"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { MOTION } from "@/config/design"
import { CAMPAIGN, KATEGORI_BUKU, STATUS_NASKAH_OPTIONS } from "@/config/campaign"
import { validateForm } from "@/lib/campaign/validation"
import type { CampaignFormData, FormErrors } from "@/lib/campaign/types"
import { FileUpload } from "./FileUpload"
import { SuccessPage } from "./SuccessPage"
import { useToast } from "./Toast"
import { useCampaignStatus } from "@/lib/campaign/useCampaignStatus"
import { Countdown } from "./Countdown"
import { getMicrocopy } from "@/lib/campaign/microcopy"

const initialForm: CampaignFormData = {
  nama: "", whatsapp: "", email: "", provinsi: "", kota: "", alamat: "",
  judulBuku: "", kategoriBuku: "", jumlahHalaman: "", statusNaskah: "", targetTerbit: "",
  deskripsiBuku: "", fileNaskah: null, fileCover: null, fileBuktiFollow: null,
  fileBuktiFollowFounder: null, persetujuan: false,
}

export function RegistrationForm() {
  const [form, setForm] = useState<CampaignFormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [regNumber, setRegNumber] = useState("")
  const { showToast } = useToast()
  const { status, isOpen, loading: campLoading } = useCampaignStatus()

  const update = useCallback(<K extends keyof CampaignFormData>(key: K, value: CampaignFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => { const { [key]: _, ...rest } = prev; return rest })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isOpen || campLoading) {
      showToast("error", "Pendaftaran ditutup", "Pendaftaran belum dibuka atau telah ditutup")
      return
    }
    const errs = validateForm(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      showToast("error", "Lengkapi formulir", "Ada field yang belum diisi atau tidak valid")
      return
    }
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([key, val]) => {
        if (val instanceof File) fd.append(key, val)
        else if (val !== null) fd.append(key, String(val))
      })
      const res = await fetch("/api/campaign/register", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal mendaftar")
      const number = data.registrationNumber || `${CAMPAIGN.registrationPrefix}-${String(data.id).padStart(4, "0")}`
      setRegNumber(number)
      setSubmitted(true)
      showToast("success", "Pendaftaran berhasil!", `Nomor registrasi: ${number}`)
    } catch (err) {
      showToast("error", "Gagal mendaftar", err instanceof Error ? err.message : "Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <SuccessPage registrationNumber={regNumber} />

  const inputClass = "w-full rounded-xl border border-gold/20 px-4 py-3 text-sm bg-cream text-green-dark placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-200"
  const errorClass = "w-full rounded-xl border border-red-300 px-4 py-3 text-sm bg-red-50/50 text-green-dark focus:outline-none focus:ring-2 focus:ring-red-300/50 focus:border-red-300 transition-all duration-200"
  const labelClass = "block text-sm font-medium text-green-dark mb-1.5"

  const renderField = (label: string, key: keyof CampaignFormData, field: React.ReactNode) => (
    <div>
      <label className={labelClass}>{label}</label>
      {field}
      {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <section id="daftar" className="relative py-24 sm:py-32 bg-cream">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div variants={MOTION.fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <span className="text-gold-dark text-[11px] font-medium uppercase tracking-[0.1em]">Pendaftaran</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-dark leading-[1.15] tracking-tight">
            Daftar{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">Sekarang</span>
          </h2>
          <p className="mt-3 text-green/80">Isi formulir di bawah untuk mengikuti Program Apresiasi Penulis.</p>
        </motion.div>

        {!campLoading && (
          <div className="mb-10 p-5 sm:p-6 rounded-2xl border border-gold/20 bg-gold/[0.03]">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.08em] ${
                  status === "before"
                    ? "bg-amber-100 text-amber-700"
                    : status === "after"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {getMicrocopy(status, isOpen).badge}
              </span>
            </div>
            {status !== "after" && <Countdown />}
            <p className="mt-3 text-sm text-green/70 leading-relaxed">
              {getMicrocopy(status, isOpen).microcopy}
            </p>
          </div>
        )}

        <motion.form
          variants={MOTION.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-10"
        >
          {/* DATA DIRI */}
          <div className="bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8 space-y-5">
            <h3 className="text-lg font-bold text-green-dark flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gold rounded-full" />
              Data Diri
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {renderField("Nama Lengkap", "nama",
                <input type="text" className={errors.nama ? errorClass : inputClass} value={form.nama} onChange={(e) => update("nama", e.target.value)} placeholder="Masukkan nama lengkap" />)}
              {renderField("Nomor WhatsApp", "whatsapp",
                <input type="tel" className={errors.whatsapp ? errorClass : inputClass} value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="08xxxxxxxxxx" />)}
              {renderField("Email", "email",
                <input type="email" className={errors.email ? errorClass : inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="contoh@email.com" />)}
              {renderField("Provinsi", "provinsi",
                <input type="text" className={errors.provinsi ? errorClass : inputClass} value={form.provinsi} onChange={(e) => update("provinsi", e.target.value)} placeholder="Provinsi" />)}
              {renderField("Kabupaten/Kota", "kota",
                <input type="text" className={errors.kota ? errorClass : inputClass} value={form.kota} onChange={(e) => update("kota", e.target.value)} placeholder="Kabupaten/Kota" />)}
              <div className="sm:col-span-2">
                {renderField("Alamat", "alamat",
                  <textarea className={errors.alamat ? errorClass : inputClass} rows={3} value={form.alamat} onChange={(e) => update("alamat", e.target.value)} placeholder="Alamat lengkap" />)}
              </div>
            </div>
          </div>

          {/* DATA BUKU */}
          <div className="bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8 space-y-5">
            <h3 className="text-lg font-bold text-green-dark flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gold rounded-full" />
              Data Buku
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {renderField("Judul Buku", "judulBuku",
                <input type="text" className={errors.judulBuku ? errorClass : inputClass} value={form.judulBuku} onChange={(e) => update("judulBuku", e.target.value)} placeholder="Judul buku Anda" />)}
              {renderField("Kategori Buku", "kategoriBuku",
                <select className={errors.kategoriBuku ? errorClass : inputClass} value={form.kategoriBuku} onChange={(e) => update("kategoriBuku", e.target.value)}>
                  <option value="">Pilih kategori</option>
                  {KATEGORI_BUKU.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>)}
              {renderField("Jumlah Halaman", "jumlahHalaman",
                <input type="number" className={errors.jumlahHalaman ? errorClass : inputClass} value={form.jumlahHalaman} onChange={(e) => update("jumlahHalaman", e.target.value)} placeholder="Contoh: 200" min="1" />)}
              {renderField("Status Naskah", "statusNaskah",
                <select className={errors.statusNaskah ? errorClass : inputClass} value={form.statusNaskah} onChange={(e) => update("statusNaskah", e.target.value as any)}>
                  <option value="">Pilih status</option>
                  {STATUS_NASKAH_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>)}
              <div className="sm:col-span-2">
                {renderField("Target Terbit", "targetTerbit",
                  <input type="text" className={inputClass} value={form.targetTerbit} onChange={(e) => update("targetTerbit", e.target.value)} placeholder="Contoh: 2026" />)}
              </div>
            </div>
            <div>
              {renderField("Deskripsi Singkat Buku", "deskripsiBuku",
                <textarea className={errors.deskripsiBuku ? errorClass : inputClass} rows={4} value={form.deskripsiBuku} onChange={(e) => update("deskripsiBuku", e.target.value)} placeholder="Ceritakan secara singkat tentang buku Anda..." />)}
            </div>
          </div>

          {/* UPLOAD FILE */}
          <div className="bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8 space-y-5">
            <h3 className="text-lg font-bold text-green-dark flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gold rounded-full" />
              Upload File
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FileUpload
                accept=".docx,.pdf"
                maxSizeMB={10}
                label="Upload Naskah"
                hint="Format .docx atau .pdf"
                value={form.fileNaskah}
                onChange={(f) => update("fileNaskah", f)}
              />
              <FileUpload
                accept=".jpg,.jpeg,.png"
                maxSizeMB={5}
                label="Upload Cover"
                hint="Format .jpg atau .png"
                value={form.fileCover}
                onChange={(f) => update("fileCover", f)}
                preview="image"
              />
              <FileUpload
                accept=".jpg,.jpeg,.png"
                maxSizeMB={5}
                label="Bukti Follow Instagram PT Mughis Cipta Media"
                hint="Screenshot bukti follow"
                value={form.fileBuktiFollow}
                onChange={(f) => update("fileBuktiFollow", f)}
                preview="image"
              />
              <FileUpload
                accept=".jpg,.jpeg,.png"
                maxSizeMB={5}
                label={`Bukti Follow Instagram Founder`}
                hint={`Screenshot follow @${CAMPAIGN.founderInstagram}`}
                value={form.fileBuktiFollowFounder}
                onChange={(f) => update("fileBuktiFollowFounder", f)}
                preview="image"
              />
            </div>
          </div>

          {/* PERSETUJUAN */}
          <div className="bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.persetujuan}
                onChange={(e) => update("persetujuan", e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gold/30 text-gold focus:ring-gold/50"
              />
              <span className="text-sm text-green-dark/90">
                Saya menyatakan seluruh data yang saya kirimkan adalah benar dan dapat dipertanggungjawabkan.
              </span>
            </label>
            {errors.persetujuan && <p className="text-xs text-red-500 mt-2">{errors.persetujuan}</p>}
          </div>

          {/* SUBMIT */}
          <div className="text-center">
            <button
              type="submit"
              disabled={submitting || campLoading || !isOpen}
              className="group inline-flex items-center gap-2 h-14 px-10 text-sm font-bold rounded-full bg-gradient-to-r from-gold to-gold-dark text-green-dark shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Mendaftarkan...</>
              ) : campLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Memeriksa status...</>
              ) : !isOpen && status === "before" ? (
                <><span className="tracking-wider">PENDAFTARAN BELUM DIBUKA</span></>
              ) : !isOpen && status === "after" ? (
                <><span className="tracking-wider">PENDAFTARAN TELAH DITUTUP</span></>
              ) : !isOpen ? (
                <><span className="tracking-wider">PENDAFTARAN DITUTUP</span></>
              ) : (
                <><span className="tracking-wider">DAFTAR SEKARANG</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
