"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Menu, Search } from "lucide-react"
import NavLogo from "./NavLogo"
import NavItem from "./NavItem"
import NavCTA from "./NavCTA"
import SearchModal from "./SearchModal"
import MobileDrawer from "./MobileDrawer"
import { mainNav } from "@/config/navigation"

const btnClass = "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
const btnScrolled = "text-green-dark/80 hover:bg-gold/10 hover:text-green"
const btnTransparent = "text-white/80 hover:bg-white/10 hover:text-white"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleCloseMobile = useCallback(() => setMobileOpen(false), [])

  const navItemClass = scrolled
    ? "text-green-dark hover:text-green"
    : "text-white/90 hover:text-white"

  const megaItemClass = scrolled
    ? "text-green-dark hover:text-green"
    : "text-white/90 hover:text-white"

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-2xl border-b border-gold/20 shadow-lg shadow-green/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <NavLogo scrolled={scrolled} />
            </div>

            <nav className="hidden md:flex items-center justify-center gap-7" aria-label="Navigasi utama">
              {mainNav.map((group) =>
                group.href ? (
                  <NavItem key={group.href} href={group.href} className={navItemClass}>
                    {group.label}
                  </NavItem>
                ) : (
                  <NavItem
                    key={group.label}
                    className={megaItemClass}
                    label={group.label}
                    megaItems={group.children || []}
                  >
                    {group.label}
                  </NavItem>
                )
              )}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className={`${btnClass} ${scrolled ? btnScrolled : btnTransparent}`}
                aria-label="Cari"
              >
                <Search className="w-4 h-4" />
              </button>
              <NavCTA />
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className={`${btnClass} ${scrolled ? btnScrolled : btnTransparent}`}
                aria-label="Cari"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className={`${btnClass} ${scrolled ? "text-green hover:bg-gold/10" : "text-white/80 hover:bg-white/10"}`}
                aria-label="Buka menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer open={mobileOpen} onClose={handleCloseMobile} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
