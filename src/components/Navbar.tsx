"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react"
import { useTheme } from "./ThemeProvider"

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Katalog", href: "/katalog" },
  { label: "Layanan", href: "/layanan-penerbitan" },
  { label: "Tentang", href: "/tentang-kami" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className={`font-semibold text-sm tracking-wide transition-colors ${
            scrolled ? "text-zinc-900 dark:text-white" : "text-white"
          }`}>
            MAKTABAH AL-MUGHIS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                scrolled
                  ? "text-zinc-600 dark:text-zinc-400"
                  : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                : "hover:bg-white/10 text-white/80"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dark text-white text-sm font-medium rounded-full transition-all hover:shadow-lg hover:shadow-gold/25"
          >
            Mulai <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                : "hover:bg-white/10 text-white/80"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setOpen(true)}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                : "hover:bg-white/10 text-white/80"
            }`}
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-zinc-900 shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-semibold text-sm tracking-wide text-zinc-900 dark:text-white">
                  MENU
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-gold font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <Link
                  href="/katalog"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gold hover:bg-gold-dark text-white font-medium rounded-xl transition-all"
                >
                  Mulai <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
