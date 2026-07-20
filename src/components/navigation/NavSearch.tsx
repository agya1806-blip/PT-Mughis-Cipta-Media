"use client"

import { Search } from "lucide-react"

interface Props {
  scrolled: boolean
}

export default function NavSearch({ scrolled }: Props) {
  return (
    <button
      aria-label="Cari buku atau artikel"
      className={`p-2 rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        scrolled
          ? "text-green/60 dark:text-gold/70 hover:bg-gold/10 dark:hover:bg-cream/10 hover:text-green dark:hover:text-cream"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Search className="w-4 h-4" />
    </button>
  )
}
