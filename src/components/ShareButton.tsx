"use client"

import { useState, useEffect } from "react"
import { Share2, MessageCircle, Link as LinkIcon, Check, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  image?: string
  className?: string
}

export default function ShareButton({ url, title, description = "", image, className = "" }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent
      setIsIOS(/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window))
    }
  }, [])

  const fullUrl = typeof window !== "undefined"
    ? new URL(url, window.location.origin).toString()
    : url

  const shareText = `${title}\n${description ? `${description}\n\n` : "\n"}🔗 ${fullUrl}${image ? `\n🖼️ ${image}` : ""}`

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) document.addEventListener("keydown", onEscape)
    return () => document.removeEventListener("keydown", onEscape)
  }, [open])

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: fullUrl,
        })
        return
      } catch {}
    }
    setOpen(!open)
  }

  const openExternal = (e: React.MouseEvent, link: string) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(link, "_blank")
    setOpen(false)
  }

  const shareWhatsApp = (e: React.MouseEvent) =>
    openExternal(e, `https://wa.me/?text=${encodeURIComponent(shareText)}`)

  const shareFacebook = (e: React.MouseEvent) =>
    openExternal(e, `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`)

  const shareInstagramStory = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const caption = `${title}\n\n${description || "Baca selengkapnya:"}\n${fullUrl}`
    try {
      await navigator.clipboard.writeText(caption)
    } catch {}

    if (isIOS) {
      window.location.href = "instagram-stories://share"
      setTimeout(() => {
        window.open("https://www.instagram.com/", "_blank")
        setOpen(false)
      }, 500)
    } else {
      window.open("https://www.instagram.com/", "_blank")
      setOpen(false)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  const copyLink = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setOpen(false)
      }, 1400)
    } catch {
      prompt("Salin link ini:", fullUrl)
      setOpen(false)
    }
  }

  return (
    <div className={`relative ${className}`} onClick={e => e.stopPropagation()}>
      <button
        onClick={handleShare}
        title="Bagikan"
        className="group flex items-center justify-center w-8 h-8 rounded-full bg-cream border border-gold/20 text-green/60 hover:text-gold hover:bg-gold/10 hover:border-gold/40 transition-all active:scale-95"
        aria-label="Bagikan"
        aria-expanded={open}
      >
        <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 mt-2 w-56 bg-cream border border-gold/20 rounded-2xl shadow-2xl z-50 text-sm overflow-hidden">
            <div className="px-4 py-2 text-[10px] font-medium tracking-[0.5px] text-green/50 border-b border-gold/10 bg-cream/50 flex items-center justify-between">
              <span>BAGIKAN</span>
              {image && (
                <span className="flex items-center gap-1 text-[9px] text-gold/60">
                  <ImageIcon className="w-3 h-3" /> with preview
                </span>
              )}
            </div>

            {image && (
              <div className="relative w-full aspect-[16/9] bg-cream-dark border-b border-gold/10">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain"
                  sizes="224px"
                />
              </div>
            )}

            <button onClick={shareWhatsApp} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gold/5 active:bg-gold/10 text-left transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-green-dark font-medium block">WhatsApp</span>
                <span className="text-[10px] text-green/40">Kirim dengan gambar cover</span>
              </div>
            </button>

            <button onClick={shareFacebook} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gold/5 active:bg-gold/10 text-left transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0">
                <span className="text-white text-[12px] font-bold">f</span>
              </div>
              <div className="min-w-0">
                <span className="text-green-dark font-medium block">Facebook</span>
                <span className="text-[10px] text-green/40">Preview otomatis dari link</span>
              </div>
            </button>

            <button onClick={shareInstagramStory} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gold/5 active:bg-gold/10 text-left transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F56040] via-[#E1306C] to-[#C13584] flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-white">IG</span>
              </div>
              <div className="min-w-0">
                <span className="text-green-dark font-medium block">Instagram Story</span>
                <span className="text-[10px] text-green/40">{isIOS ? "Buka Stories langsung" : "Caption + Buka IG"}</span>
              </div>
            </button>

            <div className="h-px bg-gold/10 mx-2" />

            <button onClick={copyLink} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gold/5 active:bg-gold/10 text-left transition-colors">
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-gold font-medium">Link disalin!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-5 h-5 shrink-0" />
                  <span className="text-green-dark font-medium">Salin Link</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
