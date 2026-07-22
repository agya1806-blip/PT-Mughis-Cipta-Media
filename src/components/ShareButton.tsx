"use client"

import { useState, useEffect } from "react"
import { Share2, MessageCircle, Link as LinkIcon, Check } from "lucide-react"

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function ShareButton({ url, title, description = "", className = "" }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== "undefined" 
    ? new URL(url, window.location.origin).toString() 
    : url

  const shareText = `${title}\n\n${fullUrl}`

  // Close dropdown on Escape
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

    // Best experience on mobile
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
    const caption = `${title}\n\nBaca selengkapnya:\n${fullUrl}`
    try {
      await navigator.clipboard.writeText(caption)
      window.open("https://www.instagram.com/", "_blank")
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setOpen(false)
      }, 1400)
    } catch {
      window.open("https://www.instagram.com/", "_blank")
      setOpen(false)
    }
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
          
          <div className="absolute right-0 mt-2 w-52 bg-cream border border-gold/20 rounded-2xl shadow-2xl z-50 text-sm overflow-hidden">
            <div className="px-4 py-2 text-[10px] font-medium tracking-[0.5px] text-green/50 border-b border-gold/10 bg-cream/50">
              BAGIKAN
            </div>

            <button onClick={shareWhatsApp} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gold/5 active:bg-gold/10 text-left">
              <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-green-dark">WhatsApp</span>
            </button>

            <button onClick={shareFacebook} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gold/5 active:bg-gold/10 text-left">
              <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0">
                <span className="text-white text-[11px] font-bold">f</span>
              </div>
              <span className="text-green-dark">Facebook</span>
            </button>

            <button onClick={shareInstagramStory} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gold/5 active:bg-gold/10 text-left">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F56040] via-[#E1306C] to-[#C13584] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white">IG</span>
              </div>
              <span className="text-green-dark">Instagram Story</span>
            </button>

            <div className="h-px bg-gold/10 mx-2" />

            <button onClick={copyLink} className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gold/5 active:bg-gold/10 text-left">
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-gold" />
                  <span className="text-gold font-medium">Link disalin!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-green-dark">Salin Link</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
