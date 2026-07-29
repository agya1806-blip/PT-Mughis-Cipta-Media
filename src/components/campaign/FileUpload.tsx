"use client"

import { useCallback, useRef, useState } from "react"
import { Upload, FileText, Image as ImageIcon, X, Check } from "lucide-react"
import { motion } from "framer-motion"

interface FileUploadProps {
  accept: string
  maxSizeMB?: number
  label: string
  hint?: string
  value: File | null
  onChange: (file: File | null) => void
  error?: string
  preview?: "image" | "none"
}

export function FileUpload({ accept, maxSizeMB = 5, label, hint, value, onChange, error, preview = "none" }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const validateAndSet = useCallback((file: File | null) => {
    if (!file) { onChange(null); return }
    if (file.size > maxSizeMB * 1024 * 1024) { onChange(null); return }
    onChange(file)
  }, [maxSizeMB, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) validateAndSet(file)
  }, [validateAndSet])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) validateAndSet(file)
  }, [validateAndSet])

  const sizeLabel = `Maks. ${maxSizeMB} MB`

  const previewUrl = value && preview === "image" ? URL.createObjectURL(value) : null

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-green-dark">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-5 transition-all duration-200 ${
          dragOver
            ? "border-gold bg-gold/5"
            : value
              ? "border-green/30 bg-green/[0.02]"
              : error
                ? "border-red-300 bg-red-50/30"
                : "border-gold/30 hover:border-gold/60 bg-cream/50"
        }`}
      >
        <input ref={inputRef} type="file" accept={accept} onChange={handleInput} className="hidden" />
        {previewUrl ? (
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-cream border border-gold/10 shrink-0">
              <img src={previewUrl} alt={label} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-dark truncate">{value?.name}</p>
              <p className="text-xs text-green/70">{value ? `${(value.size / 1024 / 1024).toFixed(1)} MB` : sizeLabel}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onChange(null) }}
              className="shrink-0 w-7 h-7 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
        ) : value ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              {accept.includes("image") ? <ImageIcon className="w-5 h-5 text-green-dark" /> : <FileText className="w-5 h-5 text-green-dark" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-dark truncate">{value.name}</p>
              <p className="text-xs text-green/70">{(value.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
            <Check className="w-5 h-5 text-green shrink-0" />
            <button
              onClick={(e) => { e.stopPropagation(); onChange(null) }}
              className="shrink-0 w-7 h-7 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2">
            <motion.div
              animate={dragOver ? { y: -4, scale: 1.1 } : {}}
              className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"
            >
              <Upload className="w-5 h-5 text-green-dark" />
            </motion.div>
            <div className="text-center">
              <p className="text-sm text-green-dark font-medium">Klik atau seret file ke sini</p>
              <p className="text-xs text-green/70 mt-0.5">{accept.split(",").join(", ")} — {sizeLabel}</p>
              {hint && <p className="text-xs text-green-dark/80 mt-0.5">{hint}</p>}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
