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
          ? "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Search className="w-4 h-4" />
    </button>
  )
}
