"use client"

import { useState, useRef } from "react"
import { FileText, Upload, X, File, Download } from "lucide-react"

interface Props {
  value: string
  onChange: (val: string) => void
  label?: string
}

export default function DocumentUpload({ value, onChange, label = "File Dokumen" }: Props) {
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase()
    if (!ext || !["pdf", "doc", "docx"].includes(ext)) {
      alert("Hanya file PDF, DOC, atau DOCX")
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      alert("File maksimal 20MB")
      return
    }
    setUploading(true)
    setFileName(file.name)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) throw new Error()
      const data = await res.json()
      onChange(data.url)
    } catch {
      alert("Gagal mengunggah file")
      setFileName("")
    } finally {
      setUploading(false)
    }
  }

  const clearFile = () => {
    onChange("")
    setFileName("")
    if (inputRef.current) inputRef.current.value = ""
  }

  const isFile = value && (value.endsWith(".pdf") || value.endsWith(".doc") || value.endsWith(".docx"))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-zinc-600">{label}</label>
      </div>

      {isFile && (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 bg-zinc-50">
          <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-800 truncate">{fileName || value.split("/").pop()}</p>
            <p className="text-xs text-zinc-500">File terunggah</p>
          </div>
          <div className="flex gap-1">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-500 hover:text-gold hover:bg-white transition-colors"
              title="Lihat file"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={clearFile}
              className="p-2 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-white transition-colors"
              title="Hapus file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {!uploading ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 w-full h-32 rounded-xl border-2 border-dashed border-zinc-300 hover:border-gold/50 hover:bg-zinc-50 cursor-pointer transition-all"
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-gold" />
          </div>
          <p className="text-sm text-zinc-500">
            <span className="text-gold font-medium">Klik untuk unggah</span> atau seret file
          </p>
          <p className="text-xs text-zinc-400">Format: PDF, DOC, DOCX (max 20MB)</p>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 w-full h-32 rounded-xl border-2 border-gold/30 bg-gold/5">
          <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-zinc-600">Mengunggah...</span>
        </div>
      )}
    </div>
  )
}
