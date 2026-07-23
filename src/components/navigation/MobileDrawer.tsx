"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X, ArrowRight, Search, ChevronRight } from "lucide-react"
import type { NavLink } from "@/config/navigation"
import { secondaryNavLinks } from "@/config/navigation"

interface Props {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export default function MobileDrawer({ open, onClose, links }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const prevOverflow = useRef("")

  useEffect(() => {
    if (!open) return
    prevOverflow.current = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => { document.body.style.overflow = prevOverflow.current }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    onClose()
    setSearchQuery("")
  }, [pathname])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`)
    onClose()
  }, [searchQuery, router, onClose])

  function isActive(href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(href))
  }

  const spring = prefersReducedMotion
    ? { duration: 0.1 }
    : { type: "spring" as const, damping: 30, stiffness: 260 }

  const itemTransition = prefersReducedMotion
    ? { duration: 0.05 }
    : { delay: 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-green/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            ref={drawerRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={spring}
            className="absolute bottom-0 inset-x-0 max-h-[85vh] bg-cream dark:bg-green-dark rounded-t-3xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi menu"
            drag={prefersReducedMotion ? false : "y"}
            dragConstraints={{ top: 0, bottom: 150 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose()
            }}
          >
            <div className="shrink-0">
              <div className="flex items-center justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-green/30 dark:bg-cream/30" />
              </div>
              <div className="flex items-center justify-between px-6 pb-3 border-b border-gold/20 dark:border-gold/10">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-green/60 dark:text-cream/70">
                  Menu
                </span>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Tutup menu"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-green/60 dark:text-cream/70 hover:bg-gold/10 dark:hover:bg-cream/10 hover:text-green-dark dark:hover:text-cream transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSearch} className="shrink-0 px-4 pt-3 pb-2">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green/60 dark:text-cream/60 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari buku atau artikel..."
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-gold/5 dark:bg-cream/5 border border-gold/20 dark:border-cream/20 text-sm text-green-dark dark:text-cream placeholder-green/50 dark:placeholder-cream/50 focus:outline-none focus:ring-2 focus:ring-gold/50 dark:focus:ring-cream/50 transition-all"
                />
              </div>
            </form>

            <div className="flex-1 overflow-y-auto px-4 pb-2 space-y-0.5">
              {links.map((link) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={itemTransition}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? "bg-gold text-white font-semibold"
                        : "text-green-dark dark:text-cream hover:bg-gold/10 dark:hover:bg-cream/10"
                    }`}
                  >
                    <span>{link.label}</span>
                    {!isActive(link.href) && (
                      <ChevronRight className="w-4 h-4 text-green/40 dark:text-cream/40" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <div className="border-t border-gold/20 dark:border-cream/10 my-2 pt-2">
                <p className="px-4 pb-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-green/50 dark:text-cream/50">
                  Lainnya
                </p>
                {secondaryNavLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={itemTransition}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between min-h-[44px] px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive(link.href)
                          ? "bg-gold text-white font-semibold"
                          : "text-green/70 dark:text-cream/70 hover:bg-gold/10 dark:hover:bg-cream/10"
                      }`}
                    >
                      <span>{link.label}</span>
                      {!isActive(link.href) && (
                        <ChevronRight className="w-3.5 h-3.5 text-green/40 dark:text-cream/40" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="shrink-0 px-4 pb-6 pt-3 border-t border-gold/20 dark:border-cream/10 bg-cream dark:bg-green-dark" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}>
              <Link
                href="/kontak"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full min-h-[48px] px-5 bg-green hover:bg-green-dark text-gold text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green/25"
              >
                Hubungi Kami
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
