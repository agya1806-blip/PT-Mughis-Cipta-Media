"use client"

import Link from "next/link"

interface Props {
  scrolled: boolean
}

export default function NavLogo({ scrolled }: Props) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
      <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-sm transition-shadow duration-300 group-hover:shadow-gold">
        <span className="text-white font-bold text-sm tracking-tight">M</span>
      </div>
      <span
        className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
          scrolled ? "text-zinc-900 dark:text-white" : "text-white"
        }`}
      >
        MAKTABAH AL-MUGHIS
      </span>
    </Link>
  )
}
