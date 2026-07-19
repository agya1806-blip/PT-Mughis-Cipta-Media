"use client"

import { useRef, useState, useCallback } from "react"
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Link, Eye, Edit3, FileUp, Loader2 } from "lucide-react"

interface Props {
  value: string
  onChange: (val: string) => void
  label?: string
  placeholder?: string
  minRows?: number
}

export default function AdminEditor({ value, onChange, label = "Konten", placeholder = "Tulis di sini...", minRows = 12 }: Props) {
  const [preview, setPreview] = useState(false)
  const [converting, setConverting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const docxInputRef = useRef<HTMLInputElement>(null)

  const insert = useCallback((before: string, after: string = "") => {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = value.substring(start, end)
    const newVal = value.substring(0, start) + before + selected + after + value.substring(end)
    onChange(newVal)
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(start + before.length, start + before.length + selected.length)
    })
  }, [value, onChange])

  const handleDocx = async (file: File) => {
    if (!file.name.endsWith(".docx")) {
      alert("Hanya file .docx yang didukung")
      return
    }
    setConverting(true)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const mammoth = await import("mammoth")
      const result = await mammoth.default.convertToHtml({ arrayBuffer })
      onChange(result.value || "(Gagal mengonversi)")
    } catch {
      alert("Gagal mengonversi file. Pastikan file adalah .docx yang valid.")
    } finally {
      setConverting(false)
    }
  }

  const handlePdf = async (file: File) => {
    alert("Konversi PDF belum didukung. Silakan salin teks secara manual.")
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.name.endsWith(".docx")) {
      handleDocx(file)
    } else {
      handlePdf(file)
    }
    e.target.value = ""
  }

  const toolbar = [
    { icon: <Bold className="w-4 h-4" />, label: "Tebal", action: () => insert("<strong>", "</strong>") },
    { icon: <Italic className="w-4 h-4" />, label: "Miring", action: () => insert("<em>", "</em>") },
    { icon: <Heading2 className="w-4 h-4" />, label: "Heading 2", action: () => insert("\n<h2>", "</h2>\n") },
    { icon: <Heading3 className="w-4 h-4" />, label: "Heading 3", action: () => insert("\n<h3>", "</h3>\n") },
    { icon: <List className="w-4 h-4" />, label: "Bullet List", action: () => insert("\n<ul>\n  <li>", "</li>\n</ul>\n") },
    { icon: <ListOrdered className="w-4 h-4" />, label: "Numbered List", action: () => insert("\n<ol>\n  <li>", "</li>\n</ol>\n") },
    { icon: <Link className="w-4 h-4" />, label: "Link", action: () => {
      const url = prompt("URL:", "https://")
      if (url) insert(`<a href="${url}">`, "</a>")
    }},
    { icon: <Eye className="w-4 h-4" />, label: "Preview", action: () => setPreview(!preview) },
    { icon: converting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />, label: converting ? "Mengonversi..." : "Upload DOCX", action: () => docxInputRef.current?.click() },
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-zinc-600">{label}</label>
        {preview && (
          <button type="button" onClick={() => setPreview(false)} className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-dark">
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
        )}
      </div>
      <div className="rounded-xl border border-zinc-300 overflow-hidden bg-white">
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-zinc-200 bg-zinc-50">
          <input
            ref={docxInputRef}
            type="file"
            accept=".docx,.pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          {toolbar.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              title={item.label}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-white transition-colors"
            >
              {item.icon}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-zinc-400 font-mono">HTML</span>
        </div>
        {preview ? (
          <div className="p-4 sm:p-6 min-h-[200px] prose prose-sm max-w-none text-zinc-800">
            <PreviewRenderer html={value} />
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={minRows}
            className="w-full px-4 py-3 text-sm font-mono text-zinc-800 placeholder-zinc-400 resize-y focus:outline-none"
          />
        )}
      </div>
    </div>
  )
}

function PreviewRenderer({ html }: { html: string }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
