"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight } from "lucide-react"

interface NavLink {
  label: string
  href: string
}

interface Props {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function MobileDrawer({ open, onClose, links }: Props) {
  const pathname = usePathname()
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    onClose()
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-green/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.nav
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-cream dark:bg-green-dark shadow-2xl border-l border-gold/20 dark:border-gold/10"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigasi menu"
          >
            <div className="flex items-center justify-between p-5 border-b border-gold/20 dark:border-gold/10">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-green/60 dark:text-cream/70">
                Menu
              </span>
              <button
                onClick={onClose}
                aria-label="Tutup menu"
                className="p-2 rounded-xl text-green/60 dark:text-cream/70 hover:bg-cream dark:hover:bg-green-dark/50 hover:text-green-dark dark:hover:text-cream transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              {links.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                return (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gold text-white font-semibold"
                          : "text-green-dark dark:text-cream hover:bg-gold/20 hover:text-green-dark dark:hover:text-green-dark"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="absolute bottom-0 inset-x-0 p-5 border-t border-gold/20 dark:border-gold/10 bg-cream dark:bg-green-dark">
              <Link
                href="/kontak"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-green hover:bg-green-dark text-gold text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green/25"
              >
                Hubungi Kami
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
