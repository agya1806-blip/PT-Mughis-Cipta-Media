"use client"

import { useState, useRef, useCallback } from "react"
import Cropper, { Area } from "react-easy-crop"
import { Upload, X, Camera, Loader2, ZoomIn, ZoomOut } from "lucide-react"

interface TeamPhotoUploadProps {
  value: string
  onChange: (val: string) => void
  label?: string
}

export function TeamPhotoUpload({ value, onChange, label = "Foto Profil" }: TeamPhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [cropImage, setCropImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const hasPhoto = !!value

  function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")!
        const size = 600
        canvas.width = size
        canvas.height = size

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          size,
          size
        )

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob)
            else reject(new Error("Canvas toBlob failed"))
          },
          "image/jpeg",
          0.85
        )
      }
      image.onerror = reject
      image.src = imageSrc
    })
  }

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = () => {
      setCropImage(reader.result as string)
      setZoom(1)
      setCrop({ x: 0, y: 0 })
    }
    reader.readAsDataURL(file)

    if (inputRef.current) inputRef.current.value = ""
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFileSelect(file)
    },
    [handleFileSelect]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFileSelect(file)
    },
    [handleFileSelect]
  )

  const handleCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleCropApply = useCallback(async () => {
    if (!cropImage || !croppedAreaPixels) return
    setUploading(true)
    try {
      const blob = await getCroppedImg(cropImage, croppedAreaPixels)
      const formData = new FormData()
      formData.append("file", blob, "photo.jpg")

      const res = await fetch("/api/upload/team", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Upload gagal")
      }

      const data = await res.json()
      onChange(data.url)
      setCropImage(null)
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload gagal")
    } finally {
      setUploading(false)
    }
  }, [cropImage, croppedAreaPixels, onChange])

  const handleRemove = () => {
    onChange("")
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-green-dark">{label}</label>

      {/* Preview */}
      {hasPhoto && !cropImage && (
        <div className="relative w-full max-w-xs">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gold/20 shadow-md">
            <img
              src={value}
              alt="Foto profil"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 left-1 w-7 h-7 rounded-full bg-green/70 hover:bg-red-500 flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Drop zone (when no photo and no crop modal) */}
      {!hasPhoto && !cropImage && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false)
          }}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2.5 w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragging
              ? "border-gold bg-gold/5 shadow-lg shadow-gold/10"
              : "border-gold/30 hover:border-gold/50 hover:bg-gold/[0.03] hover:shadow-md"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
            <Camera className="w-5 h-5 text-green-dark" />
          </div>
          <div className="text-center">
            <p className="text-sm text-green-dark font-medium">
              <span className="text-green-dark">Klik untuk unggah</span> atau seret foto
            </p>
            <p className="text-xs text-green-dark/80 mt-0.5">JPG, PNG, WebP — Maks 10MB</p>
          </div>
        </div>
      )}

      {/* Crop Modal */}
      {cropImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-green-dark/80 backdrop-blur-sm p-4">
          <div className="bg-cream rounded-2xl border border-gold/20 shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gold/10">
              <h3 className="text-lg font-bold text-green-dark">Atur Foto Profil</h3>
              <button
                type="button"
                onClick={() => setCropImage(null)}
                className="w-8 h-8 rounded-full hover:bg-gold/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-green-dark/80" />
              </button>
            </div>

            {/* Crop area */}
            <div className="relative w-full h-72 bg-green-dark/5">
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>

            {/* Zoom control */}
            <div className="px-5 py-4 border-t border-gold/10 space-y-4">
              <div className="flex items-center gap-3">
                <ZoomOut className="w-4 h-4 text-green-dark/80" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 h-1.5 rounded-full appearance-none bg-gold/30 accent-gold cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-md"
                />
                <ZoomIn className="w-4 h-4 text-green-dark/80" />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setCropImage(null)}
                  className="flex-1 h-11 rounded-xl border border-gold/30 text-green-dark/80 text-sm font-medium hover:bg-gold/5 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleCropApply}
                  disabled={uploading}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-green-dark font-bold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Mengupload...</>
                  ) : (
                    "Simpan Foto"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
