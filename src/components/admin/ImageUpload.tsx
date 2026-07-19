"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, X, Link, Image as ImageIcon } from "lucide-react"

interface Props {
  value: string
  onChange: (val: string) => void
  label?: string
  accept?: string
}

export default function ImageUpload({ value, onChange, label = "Gambar", accept = "image/*" }: Props) {
  const [mode, setMode] = useState<"upload" | "url">(value && !value.startsWith("data:") ? "url" : "upload")
  const [preview, setPreview] = useState(value || "")
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setPreview(dataUrl)
      onChange(dataUrl)
    }
    reader.readAsDataURL(file)
  }, [onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false)
  }

  const clearImage = () => {
    setPreview("")
    onChange("")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-zinc-600">{label}</label>
        <div className="flex items-center gap-1 bg-zinc-100 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === "upload" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Unggah
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === "url" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            URL
          </button>
        </div>
      </div>

      {preview && (
        <div className="relative w-full max-w-xs rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-contain"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {mode === "upload" ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 w-full h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragging
              ? "border-gold bg-gold/5"
              : "border-zinc-300 hover:border-gold/50 hover:bg-zinc-50"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
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
            <span className="text-gold font-medium">Klik untuk unggah</span> atau seret file ke sini
          </p>
          <p className="text-xs text-zinc-400">Format: JPG, PNG, WebP (max 5MB)</p>
        </div>
      ) : (
        <div className="relative">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
          <input
            type="url"
            placeholder="https://contoh.com/gambar.jpg"
            className="w-full rounded-lg border border-zinc-300 pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            value={value && !value.startsWith("data:") ? value : ""}
            onChange={(e) => {
              onChange(e.target.value)
              setPreview(e.target.value)
            }}
          />
        </div>
      )}
    </div>
  )
}
