"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUpload"
import AdminEditor from "@/components/admin/AdminEditor"
import FormSection from "@/components/admin/FormSection"
import { useToast } from "@/components/admin/Toast"
import { Sparkles, Bot, RefreshCw } from "lucide-react"

export default function CreateArticle() {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState({ title: "", slug: "", content: "", featuredImage: "", fileUrl: "" })
  const [submitting, setSubmitting] = useState(false)

  // AI Copilot State
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  async function handleAiGenerate() {
    if (!aiPrompt.trim()) {
      toast("error", "Harap isi topik atau judul artikel untuk AI Copilot")
      return
    }

    setAiLoading(true)
    try {
      const res = await fetch("/api/admin/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: aiPrompt,
          type: "article"
        })
      })

      const json = await res.json()
      if (json.success && json.data) {
        const generatedTitle = json.data.title || aiPrompt
        const generatedContent = json.data.content || `<p>${json.data.excerpt || aiPrompt}</p>`
        setForm({
          ...form,
          title: generatedTitle,
          slug: generateSlug(generatedTitle),
          content: generatedContent
        })
        toast("success", "Artikel berhasil dibuat otomatis oleh AI Copilot!")
      } else {
        toast("error", "Gagal meng-generate artikel AI")
      }
    } catch {
      toast("error", "Terjadi kesalahan jaringan saat memanggil AI Copilot")
    } finally {
      setAiLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.content) {
      toast("error", "Harap isi konten artikel")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Gagal")
      }
      toast("success", "Artikel berhasil dibuat!")
      router.push("/admin/articles")
    } catch (e: unknown) {
      toast("error", e instanceof Error ? e.message : "Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">Artikel Baru</h1>
        <button type="button" onClick={() => router.back()} className="text-sm text-green-dark/80 hover:text-green-dark">Batal</button>
      </div>

      {/* 🤖 AI ADMIN COPILOT ARTICLE GENERATOR */}
      <div className="max-w-3xl mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white space-y-3 shadow-xl border-2 border-emerald-500/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">AI Article Copilot (Penulis Artikel Otomatis)</h3>
              <p className="text-xs text-emerald-200">Ketik topik/judul artikel, AI akan otomatis menuliskan draf lengkap & SEO-friendly</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Gemini AI Active
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Contoh: Tips Memilih Penerbit Buku ISBN Terbaik di Aceh untuk Penulis Pemula..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-xs font-medium focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleAiGenerate}
            disabled={aiLoading}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
          >
            {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{aiLoading ? "Menulis Artikel..." : "🤖 Auto-Generate Artikel AI"}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Informasi Artikel" description="Judul dan URL artikel">
          <div>
            <label className="block text-sm font-medium text-green-dark/80 mb-1">Judul</label>
            <input type="text" required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-dark/80 mb-1">Slug (URL)</label>
            <input type="text" required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 font-mono"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
        </FormSection>

        <FormSection title="Gambar Utama" description="Upload atau masukkan URL gambar">
          <ImageUpload label="" value={form.featuredImage} onChange={(val) => setForm({ ...form, featuredImage: val })} />
        </FormSection>

        <FormSection title="File Pendukung" description="Upload file PDF/DOCX (opsional)">
          <input type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
            placeholder="https://..." />
        </FormSection>

        <FormSection title="Konten Artikel" description="Tulis langsung atau hasil AI Copilot">
          <AdminEditor
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val })}
            placeholder="Tulis konten artikel di sini, atau gunakan AI Copilot di atas untuk membuat artikel otomatis..."
          />
        </FormSection>

        <div className="flex gap-3">
          <button type="submit" disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-green-dark font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all">
            {submitting ? "Menyimpan..." : "Simpan Artikel"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="h-12 px-6 rounded-xl border border-zinc-300 text-green-dark/80 font-medium hover:bg-zinc-50">
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
