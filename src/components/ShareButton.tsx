"use client"

import { useState } from "react"
import { Share2, MessageCircle, Link as LinkIcon, Check } from "lucide-react"

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  image?: string
  className?: string
  variant?: "icon" | "button"
}

export default function ShareButton({ 
  url, 
  title, 
  description = "", 
  image, 
  className = "", 
  variant = "icon" 
}: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== "undefined" 
    ? new URL(url, window.location.origin).toString() 
    : url

  const shareText = `${title}\n\n${fullUrl}`

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: fullUrl,
        })
        setOpen(false)
        return
      } catch {
        // user cancelled or error, fall through to dropdown
      }
    }
    setOpen(!open)
  }

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(shareText)
    window.open(`https://wa.me/?text=${text}`, "_blank")
    setOpen(false)
  }

  const shareToFacebook = () => {
    const u = encodeURIComponent(fullUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, "_blank")
    setOpen(false)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setOpen(false)
      }, 1200)
    } catch {
      // fallback
      prompt("Salin link ini:", fullUrl)
      setOpen(false)
    }
  }

  const shareToInstagramStory = async () => {
    const caption = `${title}\n\nBaca selengkapnya:\n${fullUrl}`
    try {
      await navigator.clipboard.writeText(caption)
      // Try to open Instagram
      window.open("https://www.instagram.com/", "_blank")
      // Show instruction
      setTimeout(() => {
        alert("Teks sudah disalin!\n\nBuka Instagram → Buat Story baru → Tempel teksnya.")
      }, 300)
    } catch {
      alert("Gagal menyalin. Coba manual:\n\n" + caption)
    }
    setOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleNativeShare()
        }}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-cream/80 hover:bg-gold/10 text-green/60 hover:text-gold transition-all border border-gold/20"
        aria-label="Bagikan"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)} 
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-cream border border-gold/20 rounded-xl shadow-lg z-50 py-1 text-sm">
            <button
              onClick={shareToWhatsApp}
              className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gold/5 text-left"
            >
              <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <span>WhatsApp</span>
            </button>

            <button
              onClick={shareToFacebook}
              className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gold/5 text-left"
            >
              <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center">
                <span className="text-white text-[11px] font-bold">f</span>
              </div>
              <span>Facebook</span>
            </button>

            <button
              onClick={shareToInstagramStory}
              className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gold/5 text-left"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F56040] via-[#E1306C] to-[#C13584] flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">IG</span>
              </div>
              <span>Instagram Story</span>
            </button>

            <div className="h-px bg-gold/10 my-1" />

            <button
              onClick={copyLink}
              className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-gold/5 text-left"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-gold" />
                  <span className="text-gold">Link disalin!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  <span>Salin Link</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
