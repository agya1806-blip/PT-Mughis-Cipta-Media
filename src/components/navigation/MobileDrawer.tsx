"use client"

import { useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, ArrowRight, ChevronDown } from "lucide-react"
import { mainNav } from "@/config/navigation"
import TextLogo from "@/components/TextLogo"
import type { MegaMenuItem } from "@/config/navigation"

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => { document.body.style.overflow = "" }
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

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname])

  function isActive(href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(href))
  }

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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-cream dark:bg-green-dark shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-gold/20 dark:border-gold/10 shrink-0">
              <TextLogo variant="card" />
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Tutup menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-green/60 dark:text-cream/70 hover:bg-gold/10 dark:hover:bg-cream/10 hover:text-green-dark dark:hover:text-cream transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 pt-4 pb-2 shrink-0">
              <button
                onClick={() => {
                  onClose()
                  router.push("/search")
                }}
                className="flex items-center gap-3 w-full h-11 px-4 rounded-xl bg-gold/5 dark:bg-cream/5 border border-gold/20 dark:border-cream/20 text-sm text-green/60 dark:text-cream/60 text-left transition-all hover:bg-gold/10 dark:hover:bg-cream/10"
              >
                <Search className="w-4 h-4 shrink-0" />
                <span>Cari buku, artikel...</span>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto px-4 py-2" aria-label="Navigasi mobile">
              <ul className="space-y-1">
                {mainNav.map((group) => {
                  const hasChildren = group.children && group.children.length > 0
                  const isItemActive = group.href ? isActive(group.href) : false

                  if (!hasChildren) {
                    return (
                      <li key={group.href}>
                        <Link
                          href={group.href || "#"}
                          onClick={onClose}
                          className={`flex items-center justify-between min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isItemActive
                              ? "bg-gold text-white font-semibold"
                              : "text-green-dark dark:text-cream hover:bg-gold/10 dark:hover:bg-cream/10"
                          }`}
                        >
                          <span>{group.label}</span>
                          {!isItemActive && (
                            <ArrowRight className="w-4 h-4 text-green/40 dark:text-cream/40" />
                          )}
                        </Link>
                      </li>
                    )
                  }

                  return (
                    <MobileMegaItem
                      key={group.label}
                      label={group.label}
                      items={group.children || []}
                      onClose={onClose}
                      isActive={isItemActive}
                    />
                  )
                })}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <div className="shrink-0 px-4 pb-6 pt-4 border-t border-gold/20 dark:border-gold/10 space-y-3">
              <Link
                href="/penulis"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full min-h-[48px] px-5 bg-emerald-600 hover:bg-gold text-white hover:text-green-dark text-sm font-semibold rounded-xl transition-all duration-300"
              >
                Daftar Program
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kontak"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full min-h-[48px] px-5 border border-gold/30 dark:border-gold/20 text-gold text-sm font-medium rounded-xl hover:bg-gold/10 dark:hover:bg-cream/10 transition-all duration-300"
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

function MobileMegaItem({ label, items, onClose, isActive }: {
  label: string
  items: MegaMenuItem[]
  onClose: () => void
  isActive: boolean
}) {
  return (
    <div>
      <div
        className={`flex items-center justify-between min-h-[48px] px-4 rounded-xl text-sm font-medium ${
          isActive ? "bg-gold text-white" : "text-green-dark dark:text-cream"
        }`}
      >
        <span>{label}</span>
        <ChevronDown className="w-4 h-4 text-green/40 dark:text-cream/40" />
      </div>
      <div className="ml-4 mt-1 mb-3 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-3 min-h-[44px] px-4 rounded-xl text-sm text-green/70 dark:text-cream/70 hover:bg-gold/10 dark:hover:bg-cream/10 hover:text-green-dark dark:hover:text-cream transition-all duration-200"
          >
            <div className="w-6 h-6 rounded-lg bg-gold/10 dark:bg-cream/10 flex items-center justify-center shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-medium">{item.label}</span>
              <p className="text-[11px] text-green/50 dark:text-cream/50 line-clamp-1">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
