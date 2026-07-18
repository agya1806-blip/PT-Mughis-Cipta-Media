"use client"

import { categories } from "./blog-data"

export default function CategoryFilter() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            category === "Semua"
              ? "bg-gold text-white shadow-sm"
              : "bg-white dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50 hover:border-gold/30 hover:text-zinc-900 dark:text-white"
          }`}
          disabled
        >
          {category}
        </button>
      ))}
    </div>
  )
}
