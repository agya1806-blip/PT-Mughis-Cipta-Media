"use client"

import { useState, useEffect, useCallback } from "react"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/ThemeProvider"
import NavLogo from "./NavLogo"
import NavItem from "./NavItem"
import NavCTA from "./NavCTA"
import NavSearch from "./NavSearch"
import MobileDrawer from "./MobileDrawer"

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang-kami" },
  { label: "Layanan", href: "/layanan-penerbitan" },
  { label: "Katalog", href: "/katalog" },
  { label: "Penulis", href: "/penulis" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const handleClose = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const textColor = scrolled
    ? "text-green-dark hover:text-gold"
    : "text-white/80 hover:text-white"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 dark:bg-green-dark/90 backdrop-blur-xl border-b border-gold/20 dark:border-gold/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <NavLogo scrolled={scrolled} />
          </div>

          <nav
            className="hidden md:flex items-center justify-center gap-8"
            aria-label="Navigasi utama"
          >
            {navLinks.map((link) => (
              <NavItem key={link.href} href={link.href} className={textColor}>
                {link.label}
              </NavItem>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <NavSearch scrolled={scrolled} />
            <button
              onClick={toggle}
              className={`p-2 rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                scrolled
                  ? "text-green/60 dark:text-gold/70 hover:bg-gold/10 dark:hover:bg-cream/10 hover:text-green dark:hover:text-cream"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Ganti tema"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <NavCTA />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              className={`p-2 rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                scrolled
                  ? "text-green/60 dark:text-gold/70 hover:bg-gold/10 dark:hover:bg-cream/10"
                  : "text-white/70 hover:bg-white/10"
              }`}
              aria-label="Ganti tema"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setOpen(true)}
              className={`p-2 rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                scrolled
                  ? "text-green dark:text-gold hover:bg-gold/10 dark:hover:bg-cream/10"
                  : "text-white/80 hover:bg-white/10"
              }`}
              aria-label="Buka menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer open={open} onClose={handleClose} links={navLinks} />
    </header>
  )
}
