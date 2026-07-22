"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, X, ExternalLink, Image as ImageIcon } from "lucide-react"

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
    const img = new Image()
    img.onload = () => {
      const MAX = 1200
      let w = img.naturalWidth, h = img.naturalHeight
      if (w > MAX || h > MAX) {
        if (w > h) { h = (h / w) * MAX; w = MAX }
        else { w = (w / h) * MAX; h = MAX }
      }
      const c = document.createElement("canvas")
      c.width = w; c.height = h
      const ctx = c.getContext("2d")!
      ctx.drawImage(img, 0, 0, w, h)
      const dataUrl = c.toDataURL("image/jpeg", 0.6)
      setPreview(dataUrl)
      onChange(dataUrl)
    }
    img.src = URL.createObjectURL(file)
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
        <label className="block text-sm font-medium text-green/70">{label}</label>
        <div className="flex items-center gap-1 bg-gold/10 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === "upload" ? "bg-cream text-green-dark shadow-sm" : "text-green/70 hover:text-green-dark"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Unggah
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === "url" ? "bg-cream text-green-dark shadow-sm" : "text-green/70 hover:text-green-dark"
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            URL
          </button>
        </div>
      </div>

      {preview && (
        <div className="relative w-full max-w-xs rounded-lg overflow-hidden border border-gold/20 bg-cream">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-contain"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-green/60 flex items-center justify-center hover:bg-green-dark/80 transition-colors"
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
              : "border-gold/30 hover:border-gold/50 hover:bg-gold/5"
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
          <p className="text-sm text-green/70">
            <span className="text-gold font-medium">Klik untuk unggah</span> atau seret file ke sini
          </p>
          <p className="text-xs text-green/60">Format: JPG, PNG, WebP (max 5MB)</p>
        </div>
      ) : (
        <div className="relative">
          <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green/60 pointer-events-none" />
          <input
            type="url"
            placeholder="https://contoh.com/gambar.jpg"
            className="w-full rounded-lg border border-gold/30 bg-cream pl-10 pr-3 py-2.5 text-sm text-green-dark focus:outline-none focus:ring-2 focus:ring-gold/50"
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
