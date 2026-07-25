"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight, BookOpen, FileText, Users, Package } from "lucide-react"

const searchCategories = [
  { label: "Buku", href: "/katalog", icon: BookOpen },
  { label: "Artikel", href: "/blog", icon: FileText },
  { label: "Penulis", href: "/penulis", icon: Users },
  { label: "Layanan", href: "/layanan-penerbitan", icon: Package },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (open) {
      setQuery("")
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
      onClose()
    }
  }, [query, router, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-green/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Cari"
          >
            <div className="bg-cream rounded-2xl border border-gold/20 shadow-2xl overflow-hidden">
              <form onSubmit={handleSubmit} className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-green-dark/80" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari buku, artikel, layanan..."
                  className="w-full h-16 pl-14 pr-14 bg-transparent text-base text-green-dark placeholder-green-dark/80 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-green-dark/80 hover:bg-gold/10 hover:text-green-dark transition-colors"
                  aria-label="Tutup pencarian"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
              <div className="border-t border-gold/20 px-5 py-4">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-green-dark/80 mb-3">
                  Jelajahi
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {searchCategories.map((cat) => {
                    const Icon = cat.icon
                    return (
                      <button
                        key={cat.label}
                        onClick={() => {
                          router.push(cat.href)
                          onClose()
                        }}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gold/5 hover:bg-gold/10 text-left transition-colors duration-200 group"
                      >
                        <Icon className="w-4 h-4 text-gold shrink-0" />
                        <span className="text-sm font-medium text-green-dark group-hover:text-green transition-colors">
                          {cat.label}
                        </span>
                        <ArrowRight className="w-3 h-3 text-green-dark/70 ml-auto group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="px-5 py-3 bg-gold/5 border-t border-gold/20">
                <p className="text-[11px] text-green-dark/80 text-center">
                  Tekan <kbd className="px-1.5 py-0.5 rounded bg-gold/10 text-green-dark text-[10px] font-mono">ESC</kbd> untuk menutup
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
