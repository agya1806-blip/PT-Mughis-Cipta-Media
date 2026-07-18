"use client"

import { Search } from "lucide-react"

export default function SearchBar() {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-zinc-400" />
      </div>
      <input
        type="text"
        placeholder="Cari artikel..."
        className="w-full h-12 pl-11 pr-4 bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all duration-200"
        disabled
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </div>
    </div>
  )
}
